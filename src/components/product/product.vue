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
                @click="addToCart(data)">Добавить в карзину</v-btn>
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
            selectedPrice: {},
            data: {
                _id: String,
                name: String,
                images: Array,
                description: String,
                price: Number,
                weight: String
            }
        }
    },
    computed: {
        ...mapGetters([
            'ITEM'
        ])
    },
    methods: {
        ...mapActions([
            'ADD_TO_CART'
        ]),
        getKeyByValue(object, value) {
        var k = Object.keys(object).find(key => object[key] === value);
        this.selectedPrice = this.ITEM[0].price[k];
        this.data._id = this.ITEM[0]._id;
        this.data.name = this.ITEM[0].name;
        this.data.images = this.ITEM[0].image;
        this.data.description = this.ITEM[0].description;
        this.data.price = this.selectedPrice;
        this.data.weight = this.selectedWeight;
        return k;
        },
        addToCart(data) {
            this.ADD_TO_CART(data);
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
// .carousel-container {
//     display: flex;
//     width: 500px;
//     height: 500px;
//     carousel {
//         width: 100%;
//     }
// }
</style>