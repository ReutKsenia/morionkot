<template>
  <v-container>
    <div class="catalog">
      <v-select
        :items="categoryName"
        label="Категория"
        color="#7876d8"
        dense
        outlined
        style="width: 50%;"
        v-model="category"
        @click="getCategory"
        @change="getProductsFromCategory"
      ></v-select>
      <div class="catalog_list" v-if="!category">
        <catalog-item
          class="list_item"
          v-for="product in PRODUCTS"
          :key="product._id"
          :product_data="product"
          @getItem="getItem"
        />
      </div>
      <div class="catalog_list" v-else>
        <catalog-item
          class="list_item"
          v-for="product in PRODUCTS_FROM_CATEGORY"
          :key="product._id"
          :product_data="product"
          @getItem="getItem"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import CatalogItem from "./catalog-item";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "catalog",
  components: {
    CatalogItem
  },
  props: {},
  data() {
    return {
      categoryName: [],
      category: ""
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "PRODUCT_CATEGORY", "PRODUCTS_FROM_CATEGORY"])
  },
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_DB",
      "GET_ITEM",
      "GET_CATEGORY_FROM_DB",
      "GET_PRODUCTS_FROM_CATEGORY_FROM_DB"
    ]),
    getItem(data) {
      this.GET_ITEM(data);
    },

    getCategory() {
      for (let i = 0; i < this.PRODUCT_CATEGORY.length; i++) {
        this.categoryName.push(this.PRODUCT_CATEGORY[i].category_name);
      }
    },

    getProductsFromCategory() {
        this.GET_PRODUCTS_FROM_CATEGORY_FROM_DB(this.category);
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_DB();
    this.GET_CATEGORY_FROM_DB();
  }
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