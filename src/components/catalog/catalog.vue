<template>
  <v-container>
    <div class="catalog">
      <v-select
        :items="categoryName"
        label="Категория"
        color="#7876d8"
        dense
        outlined
        style="width: 50%; margin-top: 3%; margin-bottom: 2%;"
        v-model="category"
        @click="getCategory"
        @change="getProductsFromCategory"
      ></v-select>
      <div class="catalog_list" v-if="!category">
        <template>
          <v-card
            v-for="product in PRODUCTS"
            :key="product._id"
            style="
              flex-basis: 25%;
              padding: 16px;
              margin-bottom: 16px;
              box-shadow: 0 0 8px 0 #e0e0e0;
            "
          >
            <v-img
              contain="true"
              :src="
                require('../../../server/static/images/' + product.image[0])
              "
              height="200px"
              width="300px"
            />
            <v-card-title style="display: block">{{
              product.name
            }}</v-card-title>
            <v-card-subtitle style="display: block"
              >от {{ product.price[0] }} BUN</v-card-subtitle
            >
            <v-card-actions style="display: block">
              <v-btn color="#d1ab7f" dark @click="getItem(product)"
                >Выбрать вариант</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </div>
      <div class="catalog_list" v-else>
                <template>
          <v-card
            v-for="product in PRODUCTS_FROM_CATEGORY"
            :key="product._id"
            style="
              flex-basis: 25%;
              padding: 16px;
              margin-bottom: 16px;
              box-shadow: 0 0 8px 0 #e0e0e0;
            "
          >
            <v-img
              contain="true"
              :src="
                require('../../../server/static/images/' + product.image[0])
              "
              height="200px"
              width="300px"
            />
            <v-card-title style="display: block">{{
              product.name
            }}</v-card-title>
            <v-card-subtitle style="display: block"
              >от {{ product.price[0] }} BUN</v-card-subtitle
            >
            <v-card-actions style="display: block">
              <v-btn color="#d1ab7f" dark @click="getItem(product)"
                >Выбрать вариант</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </div>
    </div>
  </v-container>
</template>

<script>
//import CatalogItem from "./catalog-item";
import { mapActions, mapGetters } from "vuex";
import router from "../../router/index.js";

export default {
  name: "catalog",
  components: {
  },
  props: {},
  data() {
    return {
      categoryName: [],
      category: "",
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "PRODUCT_CATEGORY", "PRODUCTS_FROM_CATEGORY"]),
  },
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_DB",
      "GET_ITEM",
      "GET_CATEGORY_FROM_DB",
      "GET_PRODUCTS_FROM_CATEGORY_FROM_DB",
    ]),
    getItem(data) {
      console.log(data);
      this.GET_ITEM(data).then(() => {
        router.push("/product");
      });
    },

    getCategory() {
      for (let i = 0; i < this.PRODUCT_CATEGORY.length; i++) {
        this.categoryName.push(this.PRODUCT_CATEGORY[i].category_name);
      }
    },

    getProductsFromCategory() {
      this.GET_PRODUCTS_FROM_CATEGORY_FROM_DB(this.category);
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_DB();
    this.GET_CATEGORY_FROM_DB();
  },
};
</script>

<style lang="scss">
.catalog {
  &_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
.list_item {
  margin-bottom: 5%;
}
</style>