

export default {
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products.products;
    },
    SET_CATEGORY_TO_STATE: (state, productsCategory) => {
        state.productsCategory = productsCategory.productsCategory;
    },
    SET_CART: (state,  cartItem) => {
        state.cart.push(cartItem);
    },
    SET_ITEM: (state, item) => {
        if(state.item.length){
            state.item.splice(0);
            state.item.push(item);
        }
        else{
            state.item.push(item);
        }
    },
    SET_ADMIN: (state, admin) => {
        state.admin = admin;
    },
    SET_MANAGER: (state, manager) => {
        state.manager = manager;
    },
    SET_COURIER: (state, courier) => {
        state.courier = courier;
    },
    SET_USER: (state, user) => {
        state.user = user;
    },
    REMOVE_FROM_CART: (state, index) => {
        state.cart.splice(index, 1)
    },
    INCREMENT: (state, index) => {
        state.cart[index].quantity++
    },
    DECREMENT: (state, index) => {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity--
        }
    },
    SET_SUM: (state, sum) => {
        state.sum = sum;
    },
    SET_COMMENTS_TO_STATE: (state, comments) => {
        state.comments = comments.comments;
    },
    SET_PRODUCTS_FROM_CATEGORY_TO_STATE: (state, products) => {
        state.productsFromCategory = products.products
    },
    SET_ORDERS_UNEXECUTED_FOR_MANAGER_TO_STATE: (state, ordersUnexecutedForManager) => {
        state.ordersUnexecutedForManager = ordersUnexecutedForManager.orders
    },
    SET_ORDERS_EXECUTED_FOR_MANAGER_TO_STATE: (state, ordersExecutedForManager) => {
        state.ordersExecutedForManager = ordersExecutedForManager.orders
    },
    SET_ALL_COURIERS_TO_STATE: (state, allCouriers) => {
        state.allCouriers = allCouriers.couriers
    }
}