<template>
<v-container>
    <div class="catalog">
        <v-row>
            <v-col cols="6" sm="6">
        <v-select
          :items="items"
          label="Сортировка по цене"
          color="#d1ab7f"
          dense
          outlined
        ></v-select>
            </v-col>
            <v-col>
        <v-select
          :items="items"
          label="Категория"
          color="#d1ab7f"
          dense
          outlined
        ></v-select>
            </v-col>
        </v-row>
        <div class="catalog_list">
            <catalog-item 
                class="list_item"
                v-for="product in PRODUCTS"
                :key="product._id"
                :product_data="product"
                @addToCart="addToCart"
                @getItem="getItem"/>
        </div>
    </div>
</v-container> 
</template>

<script>
import CatalogItem from './catalog-item'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'catalog',
    components: {
        CatalogItem
    },
    props: {},
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            'PRODUCTS'
        ]),
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_DB',
            'ADD_TO_CART',
            'GET_ITEM'
        ]),
        addToCart(data) {
            this.ADD_TO_CART(data)
        },
        getItem(data) {
            this.GET_ITEM(data)
        }
    },
    mounted () {
      this.GET_PRODUCTS_FROM_DB()
    }
}
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