<template>
    <div class="admin-products">
        <v-container>
            <h1>Список товаров</h1>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" to="/add-product" style="margin: 1%">
                        <v-icon x-large>add</v-icon>
                    </v-btn>
                </template>
            <span>Добавить новый товар</span>
            </v-tooltip>
            <div class="products_list">
            <v-card 
            class="products_list_item"
            v-for="product in PRODUCTS"
            :key="product._id"
            style="
              flex-basis: 25%;
              padding: 16px;
              margin-bottom: 16px;
              box-shadow: 0 0 8px 0 #e0e0e0;
            ">
                <v-img contain="true"
                :src=" require('../../../server/static/images/' + product.image[0])"
                height="200px"
                width="300px"/>
                <v-card-title style="display:block;">{{product.name}}</v-card-title>
                <v-card-subtitle style="display:block;">{{product.price[0]}} BUN</v-card-subtitle>
                <v-card-actions>
              <v-spacer></v-spacer>
              <router-link tag="div" :to="{name: 'changeProduct'}">
              <v-btn icon
              @click.native ="changeItem(product)">
                <v-icon>edit</v-icon>
              </v-btn>
              </router-link>
              <v-btn icon
              @click="deleteItem(product)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
            </v-card>
            </div>
        </v-container>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import productsService from '../../services/productsService'

export default {
    name: 'admin-products',
    props: {},
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS',
            'ITEM'
        ]),
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_DB',
            'GET_ITEM'
        ]),
        deleteItem(data) {
            this.GET_ITEM(data);
            productsService.deleteProduct(this.ITEM[0], this).then(() => {
                this.GET_PRODUCTS_FROM_DB();
            }
            );  
        },
        changeItem(data) {
            console.log('111');
            this.GET_ITEM(data);
        }
    },
    mounted () {
      this.GET_PRODUCTS_FROM_DB()
    }
}
</script>

<style lang="scss">
.products_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
.products_list_item {
    margin-bottom: 5%;
}
</style>