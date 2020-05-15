import ProductsService from '../../services/productsService'
//import Authentication from '../../services/authService'

export default {
    GET_PRODUCTS_FROM_DB({commit}){
        return ProductsService.fetchProducts()
        .then((products) => {
            commit('SET_PRODUCTS_TO_STATE', products.data);
            return products;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
}