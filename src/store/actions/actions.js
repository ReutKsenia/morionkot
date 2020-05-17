
export default {
    ADD_TO_CART({commit}, cartItem) {
        commit('SET_CART', cartItem)
    },
    DELETE_FROM_CART({commit}, index) {
        commit('REMOVE_FROM_CART', index)
    },
    GET_ITEM({commit}, item){
        commit('SET_ITEM', item)
    },
    GET_ADMIN({commit}, admin){
        commit('SET_ADMIN', admin)
    },
    INCREMENT_CART_ITEM({commit}, index) {
        commit('INCREMENT', index)
      },
      DECREMENT_CART_ITEM({commit}, index) {
        commit('DECREMENT', index)
      },
}