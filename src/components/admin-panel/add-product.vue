<template>
  <div class="add-product">
    <v-container>
      <h1 class="new_product">Новый товар</h1>
      <v-form>
        <h3 class="product_headers">Название товара</h3>
        <v-text-field
          v-model="newProduct.name"
          :rules="rules.required"
          label="Введите название"
          filled
          color="deep-purple"
          style="min-height: 5%"
        ></v-text-field>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="addField" style="margin-bottom: 2%">
              <v-icon x-large>add</v-icon>
            </v-btn>
          </template>
          <span>Добавить поля для цены и веса</span>
        </v-tooltip>
        <v-row v-for="i in countField" :key="i">
          <v-col>
            <v-row>
              <h3 class="product_headers">Вес (g):</h3>
              <v-text-field v-model="newProduct.weight[i-1]" filled color="deep-purple" :rules="rules.required"></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <h3 class="product_headers">Цена:</h3>
              <v-text-field v-model.number="newProduct.price[i-1]" filled color="deep-purple" :rules="rules.required"></v-text-field>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="deleteField(i-1)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <span>Удалить поля</span>
              </v-tooltip>
            </v-row>
          </v-col>
        </v-row>
        <h3 class="product_headers">Описание товара</h3>
        <v-textarea
          v-model="newProduct.description"
          label="Добавьте описание"
          :rules="rules.required"
          filled
          color="deep-purple"
          style="min-height: 5%"
        ></v-textarea>
        <h3 class="product_headers">Категория товара</h3>
        <v-select
          v-model="newProduct.category"
          :items="categoryName"
          @click="getCategory()"
          label="Выберите категорию"
          :rules="rules.required"
          filled
          color="deep-purple"
          style="min-height: 5%"
        ></v-select>
      </v-form>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="addImage">
            <v-icon x-large>add</v-icon>
          </v-btn>
        </template>
        <span>Добавить поля для картинки</span>
      </v-tooltip>
      <v-row wrap>
        <v-col v-for="i in countImage" :key="i">
          <v-container grid-list-xl>
            <image-product v-model="avatar[i-1]">
              <div slot="activator">
                <v-card
                  height="100px"
                  width="200px"
                  v-ripple
                  v-if="!avatar[i-1]"
                  class="grey lighten-3 mb-3"
                >
                  <span>Нажмите, чтобы добавить картинку</span>
                </v-card>
                <v-card height="100px" v-ripple v-else class="mb-3">
                  <img height="100px" :src="avatar[i-1].imageURL" alt="avatar" />
                </v-card>
              </div>
            </image-product>
          </v-container>
        </v-col>
      </v-row>
      <v-slide-x-transition>
        <div>
          <v-btn class="primary" @click="uploadImage" :loading="saving">Сохранить картинки</v-btn>
        </div>
      </v-slide-x-transition>

      <v-dialog v-model="dialog" max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn
          style="margin: 2%; background-color: #524b98; color: white;"
          @click="saveProduct()"
          v-on="on"
          :disabled="isAddButtonDisabled"
        >Сохранить новый товар</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Новый товар успешно сохранен!</v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-purple darken-1" text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import imageProduct from "./image-product";
import productsService from "../../services/productsService";

export default {
  name: "add-product",
  components: {
    imageProduct: imageProduct
  },
  props: {},
  data() {
    return {
      newProduct: {
        name: "",
        price: [],
        weight: [],
        description: "",
        image: [],
        category: ""
      },
      rules: {
        required: [v => !!v || "Это поле является обязательным к заполнению"]
      },
      countField: 1,
      countImage: 1,
      categoryName: [],

      avatar: [],
      saving: false,
      saved: false,
      dialog: false,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
  },
  watch: {
    avatar: {
      handler: function() {
        this.saved = false;
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["PRODUCT_CATEGORY"]),

    isAddButtonDisabled() {
      if (!this.newProduct.name) return true;
      else if (!this.newProduct.price) return true;
      else if (!this.newProduct.weight) return true;
      else if (!this.newProduct.description) return true;
      else if (!this.newProduct.image) return true;
      else if (!this.newProduct.category) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions(["GET_CATEGORY_FROM_DB"]),
    addField: function() {
      this.countField += 1;
    },
    addImage: function() {
      this.countImage += 1;
    },
    deleteField(i) {
      this.newProduct.price.splice(i, 1);
      this.newProduct.weight.splice(i, 1);
      this.countField -= 1;
    },
    getCategory() {
      for (let i = 0; i < this.PRODUCT_CATEGORY.length; i++) {
        this.categoryName.push(this.PRODUCT_CATEGORY[i].category_name);
      }
    },

    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
      for (let i = 0; i < this.avatar.length; i++) {
        let formData = this.avatar[i].formData;
        productsService
          .uploadImage(formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(({ data }) => {
            this.newProduct.image.push(data.name);
          });
      }
    },

    saveProduct() {
      productsService.addProduct(this.newProduct, this).then(() => {
        this.newProduct.name = '';
        this.newProduct.price = [];
        this.newProduct.weight = [];
        this.newProduct.description = '';
        this.newProduct.image = [];
        this.newProduct.category = '';
        this.newProduct.countField = 1;
        this.newProduct.countImage = 1;
        this.avatar = [];
      })
    }
  },
  mounted() {
    this.GET_CATEGORY_FROM_DB();
  }
};
</script>

<style lang="scss">
.new_product {
  margin: 4%;
}
.product_headers {
  text-align: start;
  margin: 1%;
}
</style>