<template>
<v-card>
    <v-img contain="true"
    :src=" require('../../../server/static/images/' + product_data.image[0])"
    height="200px"
    width="300px"/>
    <v-card-title style="display:block;">{{product_data.name}}</v-card-title>
    <v-card-subtitle style="display:block;">от {{product_data.price[0]}} BUN</v-card-subtitle>
    <v-card-actions style="display:block;">
        <v-btn 
        color="#d1ab7f"
        to="/product"
        dark
        @click="getItem">Выбрать вариант</v-btn>
    </v-card-actions>
</v-card>
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