import api from './api'

export default {
  fetchProducts () {
    return api().get('products')
  }
}