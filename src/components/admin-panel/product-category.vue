<template>
  <div class="product-category">
    <v-container>
      <h1>Категории товаров</h1>
            <v-text-field
          v-model="newCategory"
          label="Введите название категории"
          filled
          color="deep-purple"
        ></v-text-field>
            <v-btn style="color:white" color="deep-purple" :disabled="!newCategory" @click="addnewCategory">
              Добавить новую категорию
            </v-btn>
        <v-layout>
          <v-flex v-for="category in PRODUCT_CATEGORY" :key="category._id" style="margin: 2%">
            <h3>{{category.category_name}}</h3>
            <v-btn icon @click="deleteCategory(category)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import productService from '../../services/productsService'

export default {
  name: "product-category",
  props: {},
  data() {
    return {
      newCategory: ''
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "PRODUCT_CATEGORY", "PRODUCTS_FROM_CATEGORY"])
  },
  methods: {
    ...mapActions([
      "GET_CATEGORY_FROM_DB",
      "GET_PRODUCTS_FROM_CATEGORY_FROM_DB"
    ]),

    addnewCategory(){
      productService.newCategory(this.newCategory).then(() => {
        this.GET_CATEGORY_FROM_DB();
         this.newCategory = '';
      })
    },

    deleteCategory(category) {
      productService.deleteCategory(category).then(() => {
        this.GET_CATEGORY_FROM_DB();
      })
    }
  },
  mounted() {
    this.GET_CATEGORY_FROM_DB();
  }
};
</script>

<style>
</style>