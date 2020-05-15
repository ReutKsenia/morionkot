<template>
<v-card>
    <v-img contain="true"
    :src=" require('../../assets/images/' + product_data.image[0])"
    height="200px"
    width="300px"/>
    <v-card-title style="display:block;">{{product_data.name}}</v-card-title>
    <v-card-subtitle style="display:block;">{{product_data.price[0]}} BUN</v-card-subtitle>
    <v-card-actions style="display:block;">
        <v-btn 
        color="#d1ab7f"
        to="/product"
        style="color:white;
        text-transform:none;
        "
        @click="getItem">Выбрать вариант</v-btn>
    </v-card-actions>
</v-card>
    <!-- <div class="catalog-item">
        <img class="catalog-item_img" :src=" require('../../assets/images/' + product_data.image[0])" alt="img"/>
        <p class="catalog-item_name">{{product_data.name}}</p>
        <p class="catalog-item_price">Price: {{product_data.price}}</p>
        <button class="catalog-item_add_to_cart_btn btn" 
        @click="addToCart">Add to cart</button>
        <router-link :to="{name: 'item'}">
            <button @click="getItem">Выбрать вариант</button>
            
        </router-link>
    </div> -->
</template>

<script>
export default {
    name: 'catalog-item',
    props: {
        product_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    computed: {},
    methods: {
    //    addToCart() {
    //         this.$emit('addToCart',this.product_data)
    //     },
        getItem() {
            this.$emit('getItem',this.product_data)
        }
    }
}
</script>

<style lang="scss">
.catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &_img {
        width: 100px;
    }
}
</style>