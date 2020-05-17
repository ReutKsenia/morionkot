<template>
<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
        <v-flex xs6>
            <v-carousel>
                <v-carousel-item
                v-for="images in ITEM[0].image"
                :key="images.index"
                :src=" require('../../assets/images/' + images)"
                reverse-transition="fade-transition"
                transition="fade-transition"
                contain="true"/>
            </v-carousel>
        </v-flex>
        <v-flex style="text-align:left; padding: 1%">
            <h1>{{ITEM[0].name}}</h1>
                <h2>Цена: {{ITEM[0].price[getKeyByValue(ITEM[0].weight, selectedWeight)]}} руб</h2>
                <v-select
                :items="ITEM[0].weight"
                v-model="selectedWeight"
                label="Выберете вес"
                color="#d1ab7f"
                dense
                outlined
                autocomplete
                ></v-select>
                <h3>Описание</h3>
                <p>{{ITEM[0].description}}</p>
                <v-btn
                color="#d1ab7f"
                @click="addToCart">Добавить в карзину</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'product',
    components: {
    },
    props: {},
    data() {
        return {
            selectedWeight: {},
            cartItem: {
                type: Object
            }
        }
    },
    computed: {
        ...mapGetters([
            'ITEM',
            'CART'
        ])
    },
    methods: {
        ...mapActions([
            'ADD_TO_CART'
        ]),
        getKeyByValue(object, value) {
        var k = Object.keys(object).find(key => object[key] === value);
        console.log(k);
        return k;
        },
        addToCart() {
            this.cartItem = this.ITEM[0];
            for(let i=0; i <= this.CART.length; i++){
                console.log('c');
                if(this.CART.length == 0) {
                    this.$set(this.cartItem,  'quantity', 1);
                    this.$set(this.cartItem,  'selectedPrice', this.ITEM[0].price[this.getKeyByValue(this.ITEM[0].weight, this.selectedWeight)]);
                    this.$set(this.cartItem,  'selectedWeight', this.selectedWeight);
                    this.ADD_TO_CART(this.cartItem);
                    return;
                }
                else if(this.CART[i]== this.ITEM[0]){
                    this.CART[i].quantity = this.CART[i].quantity + 1;
                    return;
                }
                else if(i == this.CART.length){
                    this.$set(this.cartItem,  'quantity', 1);
                    this.$set(this.cartItem,  'selectedPrice', this.ITEM[0].price[this.getKeyByValue(this.ITEM[0].weight, this.selectedWeight)]);
                    this.$set(this.cartItem,  'selectedWeight', this.selectedWeight);
                    this.ADD_TO_CART(this.cartItem);
                    return;
                }
            }
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
</style>