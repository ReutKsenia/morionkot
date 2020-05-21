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
                            <v-btn icon v-on="on" @click="addField">
                                <v-icon x-large>add</v-icon>
                            </v-btn>
                        </template>
                        <span>Добавить поля для цены и веса</span>
                    </v-tooltip>
                    <v-row v-for="i in countField"
                    :key="i">
                        <v-col>
                            <v-row>
                                <h3 class="product_headers">Вес: </h3>
                                <v-text-field
                                v-model="newProduct.weight[i-1]"
                                filled
                                color="deep-purple"></v-text-field>
                            </v-row>    
                        </v-col>
                        <v-col>
                            <v-row>
                                <h3 class="product_headers">Цена: </h3>
                                <v-text-field
                                v-model.number="newProduct.price[i-1]"
                                filled
                                color="deep-purple"></v-text-field>
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
                    filled
                    color="deep-purple"
                    style="min-height: 5%"
                    ></v-select>
                    
                </v-form>
                <v-container grid-list-xl>
                    <image-product v-model="avatar">
                        <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                            <span>Click to add avatar</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                            <img :src="avatar.imageURL" alt="avatar">
                        </v-avatar>
                        </div>
                    </image-product>
                    <v-slide-x-transition>
                        <div v-if="avatar && saved == false">
                        <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
                        </div>
                    </v-slide-x-transition>
                </v-container>
                <v-btn @click="saveProduct()">Сохранить новый товар</v-btn>
        </v-container>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import imageProduct from './image-product'
import productsService from '../../services/productsService'

export default {
    name: 'add-product',
    components: {
        imageProduct: imageProduct,
    },
    props: {},
    data() {
        return {
            newProduct: {
                name: '',
                price: [],
                weight: [],
                description: '',
                image: [],
                category: ''
            },
            rules: {
                required: [v => !!v || 'Это поле является обязательным к заполнению'],
            },
            countField: 1,
            categoryName: [],

            avatar: null,
            saving: false,
            saved: false,
            headers: {
        'Content-Type': 'multipart/form-data'
      }
        }
    },
    watch:{
    avatar: {
      handler: function() {
        this.saved = false
      },
      deep: true
    }
  },
    computed: {
        ...mapGetters([
            'PRODUCT_CATEGORY'
        ]),
    },
    methods: {
        ...mapActions([
            'GET_CATEGORY_FROM_DB',
        ]),
        addField: function () {
        this.countField += 1;
        },
        deleteField(i) {
            this.newProduct.price.splice(i, 1);
            this.newProduct.weight.splice(i, 1);
            this.countField -= 1;
        },
        getCategory(){
            for(let i=0; i < this.PRODUCT_CATEGORY.length; i++){
                this.categoryName.push(this.PRODUCT_CATEGORY[i].category_name)
            }
        },

            uploadImage() {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
    },
    savedAvatar() {
      this.saving = false
      this.saved = true
      let formData = this.avatar.formData;
      productsService.uploadImage(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({data}) => {
                this.newProduct.image.push(data.name);
            });
    },

    saveProduct() {
        productsService.addProduct(this.newProduct);
    }

    },
    mounted () {
      this.GET_CATEGORY_FROM_DB();
    }
}
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