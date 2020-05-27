import ProductsService from '../../services/productsService'
import CommentsService from '../../services/commentsService'
import OrdersService from '../../services/orderService'

export default {
    GET_PRODUCTS_FROM_DB({commit}){
        return ProductsService.fetchProducts()
        .then((products) => {
            console.log(products)
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
    GET_PRODUCTS_FROM_CATEGORY_FROM_DB({commit}, categoryName){
        return ProductsService.fetchProductsFromCategory(categoryName)
        .then((products) => {
            console.log(products.data)
            commit('SET_PRODUCTS_FROM_CATEGORY_TO_STATE', products.data);
            return products;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_COMMENTS_FROM_DB({commit}){
        return CommentsService.fetchComments()
        .then((comments) => {
            commit('SET_COMMENTS_TO_STATE', comments.data);
            return comments;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_ORDERS_FROM_DB({commit}){
        return OrdersService.fetchOrders()
        .then((orders) => {
            console.log(orders)
            commit('SET_ORDERS_TO_STATE', orders.data);
            return orders;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
}