//const config = require('../../server/config/config.json')

import auth from './authService'
//import authUser from './userService'
import api from './api'

//import Axios from 'axios'

export default {

  saveAdmin(admin, context) {
    return api().post('save-admin', admin, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  getAllCouriers(context) {
    return api().get('all-couriers', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  }

//   add(order, cart, context) {
//    return Axios.post(`http://localhost:${config.port}/addOrder`, {Order: order, Cart: cart, User: authUser.getUserId(context)})
//   },

//   fetchOrdersUnexecuted(context) {
//     return api().get('orders-unexecuted', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
//   },

//   fetchOrdersExecuted(context) {
//     return api().get('orders-executed', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
//   },

//   changeStatusOrder(order, context) {
//     return api().post('change-status-order', order, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
//   },

//   deleteOrder(order, context) {
//     return api().post('delete-order', order, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
//   },

//   getProductsFromCart(order) {
//     return api().post('product-from-cart', order)
//   }
}