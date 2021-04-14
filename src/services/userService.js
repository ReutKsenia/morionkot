import Axios from 'axios'
import router from '../router/index'
import auth from './authService'
//import api from './api'
const config = require('../../server/config/config.json')

export default {
    user: { authenticated: false },

  authenticate (context, credentials, redirect) {
    Axios.post(`http://localhost:${config.port}/auth-user`, credentials)
    .then(({data}) => {
        context.$cookie.set('token', data.token, '1D')
        context.$cookie.set('user_id', data.user._id, '1D')
        context.validLogin = true;
        this.user.authenticated = true;
        console.log(this.user.authenticated);
        if (redirect) router.push(redirect)
      }).catch(({response: {data}}) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  signup (context, credentials, redirect) {
    Axios.post(`http://localhost:${config.port}/registration-user`, credentials)
        .then(({data}) => {
          context.$cookie.set('token', data.token, '1D')
          context.$cookie.set('user_id', data.user._id, '1D')
          context.validSignUp = true
          this.user.authenticated = true
          
          if (redirect) router.push(redirect)
        }).catch(({response: {data}}) => {
          context.snackbar = true
          context.message = data.message
        })
  },

  exit(context, redirect) {
    this.user.authenticated = false;
    context.$cookie.delete('token');
    context.$cookie.delete('user_id');
    router.push(redirect)
  },

  checkAuthentication (context) {
    const token = context.$cookie.get('user_id')
    
    if (token) return this.user.authenticated = true
    else return this.user.authenticated = false
  },

  getUserId (context) {
    if(context.$cookie.get('user_id')) return context.$cookie.get('user_id');
    else return null;
  },

  getUser(context){
    return Axios.post(`http://localhost:${config.port}/get-user-information`, { user_id: this.getUserId(context)}, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  },
  
  saveUser(context, user){
    return Axios.post(`http://localhost:${config.port}/save-user`, user, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  }
}