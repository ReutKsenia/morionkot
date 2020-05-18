const config = require('../../server/config/config.json')

import Axios from 'axios'
//import router from '../router/index'

export default {
  ord: { status: false },

  add(order, cart) {
    Axios.post(`http://localhost:${config.port}/addOrder`, {Order: order, Cart: cart})
        .then(() => {
          this.ord.status = true
          //if (redirect) router.push(redirect)
        })
  },
}