import api from './api'

export default {
    auth (credentials) {
      return api().post('auth', credentials)
    }
  }