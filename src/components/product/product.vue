<template>
<v-container grid-list-md >
    <div class="d-flex flex-row mb-6" style="margin-top: 2%">
        <v-flex xs6>
            <v-carousel>
                <v-carousel-item
                v-for="images in ITEM[0].image"
                :key="images.index"
                :src=" require('../../../server/static/images/' + images)"
                reverse-transition="fade-transition"
                transition="fade-transition"
                contain="true"/>
            </v-carousel>
        </v-flex>
        <v-flex style="text-align:left; padding: 1%">
            <h1>{{ITEM[0].name}}</h1>
                <h2 class="price">Цена: {{ITEM[0].price[getKeyByValue(ITEM[0].weight, selectedWeight)]}} руб</h2>
                <v-select
                :items="ITEM[0].weight"
                v-model="selectedWeight"
                label="Выберете вес (в граммах)"
                color="#d1ab7f"
                dense
                outlined
                autocomplete
                ></v-select>
                <h3>Описание</h3>
                <p>{{ITEM[0].description}}</p>
                <v-btn
                style="color: white"
                color="#d1ab7f"
                @click="addToCart"
                :disabled="!selectedWeight">Добавить в карзину</v-btn>
        </v-flex>
    </div>
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
            selectedWeight: null,
            cartItem: {
                type: Object
            },
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
                    this.selectedWeight = null;
                    this.ADD_TO_CART(this.cartItem);
                    return;
                }
                else if(this.CART[i]== this.ITEM[0]){
                    this.CART[i].quantity = this.CART[i].quantity + 1;
                    this.selectedWeight = null;
                    return;
                }
                else if(i == this.CART.length){
                    this.$set(this.cartItem,  'quantity', 1);
                    this.$set(this.cartItem,  'selectedPrice', this.ITEM[0].price[this.getKeyByValue(this.ITEM[0].weight, this.selectedWeight)]);
                    this.$set(this.cartItem,  'selectedWeight', this.selectedWeight);
                    this.selectedWeight = null;
                    this.ADD_TO_CART(this.cartItem);
                    return;
                }
            }
        }
    },
    mounted() {
        this.selectedWeight = null;
    }
}
</script>

<style lang="scss">
.price {
    margin-bottom: 2%;
    margin-top: 2%;
}
</style>