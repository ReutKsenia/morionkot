

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
    ADMIN(state){
        return state.admin;
    },
    MANAGER(state){
        return state.manager;
    },
    COURIER(state){
        return state.courier;
    },
    USER(state){
        return state.user;
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
    ALL_COURIERS(state){
        return state.allCouriers;
    }
}