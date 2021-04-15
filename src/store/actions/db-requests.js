import ProductsService from '../../services/productsService'
import CommentsService from '../../services/commentsService'
import OrdersService from '../../services/orderService'
import EmployeeService from '../../services/employeeService'
import UserService from '../../services/userService'

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
    GET_ANSWERS_FROM_DB({commit}){
        return CommentsService.fetchAnswers()
        .then((answers) => {
            commit('SET_ANSWERS_TO_STATE', answers.data);
            return answers;
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
    GET_ORDERS_UNEXECUTED_FOR_COURIER_FROM_DB({commit}, context){
        return OrdersService.fetchOrdersUnexecutedForCourier(context)
        .then((ordersUnexecutedForCourier) => {
            console.log(ordersUnexecutedForCourier)
            commit('SET_ORDERS_UNEXECUTED_FOR_COURIER_TO_STATE', ordersUnexecutedForCourier.data);
            return ordersUnexecutedForCourier;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_ORDERS_EXECUTED_FOR_USER_FROM_DB({commit}, context){
        return OrdersService.fetchOrdersExecutedForUser(context)
        .then((ordersExecutedForUser) => {
            console.log(ordersExecutedForUser)
            commit('SET_ORDERS_EXECUTED_FOR_USER_TO_STATE', ordersExecutedForUser.data);
            return ordersExecutedForUser;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_ORDERS_UNEXECUTED_FOR_USER_FROM_DB({commit}, context){
        return OrdersService.fetchOrdersUnexecutedForUser(context)
        .then((ordersUnexecutedForUser) => {
            console.log(ordersUnexecutedForUser)
            commit('SET_ORDERS_UNEXECUTED_FOR_USER_TO_STATE', ordersUnexecutedForUser.data);
            return ordersUnexecutedForUser;
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
    GET_ALL_MANAGERS_FROM_DB({commit}, context){
        return EmployeeService.getAllManagers(context)
        .then((allManagers) => {
            commit('SET_ALL_MANAGERS_TO_STATE', allManagers.data);
            return allManagers;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_ADMIN_INFORMATION_FROM_DB({commit}, context){
        return EmployeeService.getAdminInformation(context)
        .then((adminInformation) => {
            commit('SET_ADMIN_INFORMATION_TO_STATE', adminInformation.data);
            return adminInformation;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_MANAGER_INFORMATION_FROM_DB({commit}, context){
        return EmployeeService.getManagerInformation(context)
        .then((managerInformation) => {
            commit('SET_MANAGER_INFORMATION_TO_STATE', managerInformation.data);
            return managerInformation;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_COURIER_INFORMATION_FROM_DB({commit}, context){
        return EmployeeService.getCourierInformation(context)
        .then((courierInformation) => {
            commit('SET_COURIER_INFORMATION_TO_STATE', courierInformation.data);
            return courierInformation;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
    GET_USER_INFORMATION_FROM_DB({commit}, context){
        return UserService.getUser(context)
        .then((userInformation) => {
            commit('SET_USER_INFORMATION_TO_STATE', userInformation.data);
            return userInformation;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },
}