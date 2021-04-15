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
      currentOrder: {},
      admin: false,
      adminInformation: {},
      manager: false,
      managerInformation: {},
      allManagers: [],
      courier: false,
      courierInformation: {},
      user: false,
      userInformation: {},
      sum: Number,
      productsCategory: [],
      comments: [],
      answers: [],
      productsFromCategory: [],
      ordersUnexecutedForManager: [],
      ordersExecutedForManager: [],
      ordersUnexecutedForCourier: [],
      ordersUnexecutedForUser: [],
      ordersExecutedForUser: [],
      allCouriers: []
  },
  mutations,
  actions,
  getters,
})
