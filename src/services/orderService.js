const config = require('../../server/config/config.json')
import api from './api'

import Axios from 'axios'

export default {
  ord: { status: false },

  add(order, cart) {
    Axios.post(`http://localhost:${config.port}/addOrder`, {Order: order, Cart: cart})
        .then(() => {
          this.ord.status = true
        })
  },

  fetchOrders() {
    return api().get('orders')
  },

  deleteOrder(order) {
    return api().post('delete-order', order);
  },

  getProductsFromCart(order) {
    return api().post('product-from-cart', order)
  }
}