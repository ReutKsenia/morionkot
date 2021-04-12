const config = require('../../server/config/config.json')

import auth from './authService'
import authUser from './userService'
import api from './api'

import Axios from 'axios'

export default {

  add(order, cart, context) {
   return Axios.post(`http://localhost:${config.port}/addOrder`, {Order: order, Cart: cart, User: authUser.getUserId(context)})
  },

  fetchOrdersUnexecutedForManager(context) {
    return api().get('orders-unexecuted-for-manager', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  },

  fetchOrdersExecutedForManager(context) {
    return api().get('orders-executed-for-manager', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  },

  changeStatusOrder(order, context) {
    return api().post('change-status-order', order, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  deleteOrder(order, context) {
    return api().post('delete-order', order, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  getProductsFromCart(order) {
    return api().post('product-from-cart', order)
  }
}