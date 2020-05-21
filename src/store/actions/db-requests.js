import ProductsService from '../../services/productsService'

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
    GET_CATEGORY_FROM_DB({commit}){
        return ProductsService.fetchCategory()
        .then((productsCategory) => {
            commit('SET_CATEGORY_TO_STATE', productsCategory.data);
            return productsCategory;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
}