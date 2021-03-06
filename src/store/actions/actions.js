
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
    GET_CURRENT_ORDER({commit}, currentOrder){
        commit('SET_CURRENT_ORDER', currentOrder)
    },
    GET_ADMIN({commit}, admin){
        commit('SET_ADMIN', admin)
    },
    GET_MANAGER({commit}, manager){
        commit('SET_MANAGER', manager)
    },
    GET_COURIER({commit}, courier){
        commit('SET_COURIER', courier)
    },
    GET_USER({commit}, user){
        commit('SET_USER', user)
    },
    INCREMENT_CART_ITEM({commit}, index) {
        commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({commit}, index) {
        commit('DECREMENT', index)
    },
    ADD_SUM({commit}, sum) {
        commit('SET_SUM', sum)
    }
}