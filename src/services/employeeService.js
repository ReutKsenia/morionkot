//const config = require('../../server/config/config.json')

import auth from './authService'
import api from './api'

//import Axios from 'axios'

export default {

  saveAdmin(admin, context) {
    return api().post('save-admin', admin, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  getAdminInformation(context) {
    return api().get('get-admin-information', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  saveManager(manager, context) {
    return api().post('save-manager', manager, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  getManagerInformation(context) {
    return api().get('get-manager-information', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  saveCourier(courier, context) {
    return api().post('save-courier', courier, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  getCourierInformation(context) {
    return api().get('get-courier-information', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  getAllCouriers(context) {
    return api().get('all-couriers', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  },

  getAllManagers(context) {
    return api().get('all-managers', { headers: { 'Authorization': auth.getAuthenticationHeader(context) }})
  },

  changeCourier(order, courier, context) {
    return api().post('change-courier', {order: order, courier: courier}, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  deleteManager(manager, context) {
    return api().post('delete-manager', manager, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  deleteCourier(courier, context) {
    return api().post('delete-courier', courier, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },
}