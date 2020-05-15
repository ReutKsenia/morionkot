
export default {
    ADD_TO_CART({commit}, product) {
        commit('SET_CART', product)
    },
    GET_ITEM({commit}, item){
        commit('SET_ITEM', item)
    },
    GET_ADMIN({commit}, admin){
        commit('SET_ADMIN', admin)
    },
}