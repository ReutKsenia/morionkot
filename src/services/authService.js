import Axios from 'axios'
import router from '../router/index'
const config = require('../../server/config/config.json')

export default {
  admin: { authenticated: false },
  manager: { authenticated: false },
  courier: { authenticated: false },

  authenticate (context, credentials, redirect) {
   return Axios.post(`http://localhost:${config.port}/auth`, credentials)
        .then(({data}) => {
          context.$cookie.set('token', data.token, '1D')
          context.validLogin = true;
          if(data.role == 'admin') {
            this.admin.authenticated = true;
          }
          if(data.role == 'manager') {
            this.manager.authenticated = true;
          }
          if(data.role == 'courier') {
            this.courier.authenticated = true;
          }
          if (redirect) router.push(redirect)
        }).catch(({response: {data}}) => {
          context.snackbar = true
          context.message = data.message
        })
        
  },

  signup (context, credentials, redirect) {
    Axios.post(`http://localhost:${config.port}/registration`, credentials)
        .then(({data}) => {
          context.$cookie.set('token', data.token, '1D')
          context.validSignUp = true
          if(data.role == 'admin') {
            this.admin.authenticated = true;
          }
          if(data.role == 'manager') {
            this.manager.authenticated = true;
          }
          if(data.role == 'courier') {
            this.courier.authenticated = true;
          }
          if (redirect) router.push(redirect)
        }).catch(({response: {data}}) => {
          context.snackbar = true
          context.message = data.message
        })
  },

  exit(context) {
    this.admin.authenticated = false;
    this.manager.authenticated = false;
    this.courier.authenticated = false;
    context.$cookie.delete('token');
  },

  checkAuthentication () {
    const token = document.cookie
    this.admin.authenticated = !!token
  },

  getAuthenticationHeader (context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}