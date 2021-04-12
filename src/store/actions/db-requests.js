import ProductsService from '../../services/productsService'
import CommentsService from '../../services/commentsService'
import OrdersService from '../../services/orderService'
import EmployeeService from '../../services/employeeService'

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
    GET_ORDERS_UNEXECUTED_FOR_MANAGER_FROM_DB({commit}, context){
        return OrdersService.fetchOrdersUnexecutedForManager(context)
        .then((ordersUnexecutedForManager) => {
            console.log(ordersUnexecutedForManager)
            commit('SET_ORDERS_UNEXECUTED_FOR_MANAGER_TO_STATE', ordersUnexecutedForManager.data);
            return ordersUnexecutedForManager;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_ORDERS_EXECUTED_FOR_MANAGER_FROM_DB({commit}, context){
        return OrdersService.fetchOrdersExecutedForManager(context)
        .then((ordersExecutedForManager) => {
            console.log(ordersExecutedForManager)
            commit('SET_ORDERS_EXECUTED_FOR_MANAGER_TO_STATE', ordersExecutedForManager.data);
            return ordersExecutedForManager;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_ALL_COURIERS_FROM_DB({commit}, context){
        return EmployeeService.getAllCouriers(context)
        .then((allCouriers) => {
            commit('SET_ALL_COURIERS_TO_STATE', allCouriers.data);
            return allCouriers;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
}