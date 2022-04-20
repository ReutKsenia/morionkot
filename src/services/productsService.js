import api from './api'

import auth from './authService'

export default {
  fetchProducts () {
    return api().get('products')
  },

  deleteProduct (product, context) {
    return api().post('delete-product', product, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  fetchCategory () {
    return api().get('category')
  },

  uploadImage(formData, config) {
    return api().post('image-product', formData, config);
  },

  addProduct(product, context) {
    return api().post('add-product', product, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  deleteImage(name, _id, context) {
    return api().post('delete-image', {imageName: name, id: _id}, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  changeProduct(changeProduct) {
    return api().post('change-product', changeProduct);
  }, 

  fetchProductsFromCategory(categoryName) {
    return api().post('product-from-category', {categoryName: categoryName});
  },

  newCategory(categoryName, context){
    return api().post('new-category', {categoryName: categoryName}, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },

  deleteCategory(category, context){
    return api().post('delete-category', category, { headers: { 'Authorization': auth.getAuthenticationHeader(context) }});
  },
}