<template>
  <div class="product-category">
    <h1>Product category</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "product-category",
  props: {},
  data() {
    return {};
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

<style>
</style>