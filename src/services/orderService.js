const config = require('../../server/config/config.json')

import authUser from './userService.js'
import api from './api.js'
import auth from './authService.js'

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

  fetchOrdersUnexecutedForCourier(context) {
    return api().get('orders-unexecuted-for-courier', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  },

  fetchOrdersUnexecutedForUser(context) {
    return api().get('orders-unexecuted-for-user', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  },

  fetchOrdersExecutedForUser(context) {
    return api().get('orders-executed-for-user', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  },

  changeStatusOrder(order, context) {
    return api().post('change-status-order', order, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  deleteOrderForManager(order, context) {
    return api().post('delete-order-for-manager', order, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  deleteOrderForCourier(order, context) {
    return api().post('delete-order-for-courier', order, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  getProductsFromCart(order) {
    return api().post('product-from-cart', order)
  },

  receivedOrder(context, order) {
    return api().post('received-order', order, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  }
}