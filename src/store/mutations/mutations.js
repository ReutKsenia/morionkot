

export default {
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products.products;
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
    }
}