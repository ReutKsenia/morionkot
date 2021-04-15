

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
    SET_CURRENT_ORDER: (state,  currentOrder) => {
        state.currentOrder = currentOrder;
    },
    SET_ADMIN: (state, admin) => {
        state.admin = admin;
    },
    SET_ADMIN_INFORMATION_TO_STATE: (state, adminInformation) => {
        state.adminInformation = adminInformation;
    },
    SET_MANAGER: (state, manager) => {
        state.manager = manager;
    },
    SET_MANAGER_INFORMATION_TO_STATE: (state, managerInformation) => {
        state.managerInformation = managerInformation;
    },
    SET_COURIER: (state, courier) => {
        state.courier = courier;
    },
    SET_COURIER_INFORMATION_TO_STATE: (state, courierInformation) => {
        state.courierInformation = courierInformation;
    },
    SET_USER: (state, user) => {
        state.user = user;
    },
    SET_USER_INFORMATION_TO_STATE: (state, userInformation) => {
        state.userInformation = userInformation;
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
    SET_ANSWERS_TO_STATE: (state, answers) => {
        state.answers = answers.answers;
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
    SET_ORDERS_UNEXECUTED_FOR_COURIER_TO_STATE: (state, ordersUnexecutedForCourier) => {
        state.ordersUnexecutedForCourier = ordersUnexecutedForCourier.orders
    },
    SET_ORDERS_EXECUTED_FOR_USER_TO_STATE: (state, ordersExecutedForUser) => {
        state.ordersExecutedForUser = ordersExecutedForUser.orders
    },
    SET_ORDERS_UNEXECUTED_FOR_USER_TO_STATE: (state, ordersUnexecutedForUser) => {
        state.ordersUnexecutedForUser = ordersUnexecutedForUser.orders
    },
    SET_ALL_COURIERS_TO_STATE: (state, allCouriers) => {
        state.allCouriers = allCouriers.couriers
    },
    SET_ALL_MANAGERS_TO_STATE: (state, allManagers) => {
        state.allManagers = allManagers.managers
    }
}