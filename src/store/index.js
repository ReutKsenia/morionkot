import Vue from 'vue'
import Vuex from 'vuex'

import commonActions from './actions/actions'
import dbRequests from './actions/db-requests'
import mutations from "./mutations/mutations"
import getters from "./getters/getters"

const actions = {...commonActions, ...dbRequests}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      products: [],
      cart: [],
      item: [],
      admin: false,
      sum: Number
  },
  mutations,
  actions,
  getters,
})
