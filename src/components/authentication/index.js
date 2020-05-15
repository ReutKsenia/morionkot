import Axios from 'axios'
import router from '../../router/index'

const api = require('../../services/api')

export default {
  admin: { authenticated: false },

  authenticate (context, credentials, redirect) {
    Axios.post(`${api.default}/auth`, credentials)
        .then(({data}) => {
          context.$cookie.set('token', data.token, '1D')
          context.$cookie.set('admin_id', data.admin._id, '1D')
          context.validLogin = true
          this.admin.authenticated = true

          if (redirect) router.push(redirect)
        }).catch(({response: {data}}) => {
          context.snackbar = true
          context.message = data.message
        })
  },

  checkAuthentication () {
    const token = document.cookie
    this.user.authenticated = !!token
  },

  getAuthenticationHeader (context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}