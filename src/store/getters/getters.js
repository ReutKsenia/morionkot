

export default {
    PRODUCTS(state){
        return state.products;
    },
    CART(state){
        return state.cart;
    },
    ITEM(state){
        return state.item;
    },
    CURRENT_ORDER(state){
        return state.currentOrder;
    },
    ADMIN(state){
        return state.admin;
    },
    ADMIN_INFORMATION(state){
        return state.adminInformation;
    },
    MANAGER(state){
        return state.manager;
    },
    MANAGER_INFORMATION(state){
        return state.managerInformation;
    },
    COURIER(state){
        return state.courier;
    },
    COURIER_INFORMATION(state){
        return state.courierInformation;
    },
    USER(state){
        return state.user;
    },
    USER_INFORMATION(state){
        return state.userInformation;
    },
    SUM(state){
        return state.sum;
    },
    PRODUCT_CATEGORY(state){
        return state.productsCategory;
    },
    COMMENTS(state){
        return state.comments;
    },
    PRODUCTS_FROM_CATEGORY(state){
        return state.productsFromCategory;
    },
    ORDERS_UNEXECUTED_FOR_MANAGER(state){
        return state.ordersUnexecutedForManager;
    },
    ORDERS_EXECUTED_FOR_MANAGER(state){
        return state.ordersExecutedForManager;
    },
    ORDERS_UNEXECUTED_FOR_COURIER(state){
        return state.ordersUnexecutedForCourier;
    },
    ORDERS_EXECUTED_FOR_USER(state){
        return state.ordersExecutedForUser;
    },
    ORDERS_UNEXECUTED_FOR_USER(state){
        return state.ordersUnexecutedForUser;
    },
    ALL_COURIERS(state){
        return state.allCouriers;
    },
    ALL_MANAGERS(state){
        return state.allManagers;
    },
}