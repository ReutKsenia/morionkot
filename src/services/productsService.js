import api from './api'

export default {
  fetchProducts () {
    return api().get('products')
  },

  deleteProduct (product) {
    return api().post('delete-product', product);
  },

  fetchCategory () {
    return api().get('category')
  },

  uploadImage(formData, config) {
    return api().post('image-product', formData, config);
  },

  addProduct(product) {
    return api().post('add-product', product);
  },

  deleteImage(name, _id) {
    return api().post('delete-image', {imageName: name, id: _id});
  },

  changeProduct(changeProduct) {
    return api().post('change-product', changeProduct);
  }, 

  fetchProductsFromCategory(categoryName) {
    return api().post('product-from-category', {categoryName: categoryName});
  },

  newCategory(categoryName){
    return api().post('new-category', {categoryName: categoryName});
  },

  deleteCategory(category){
    return api().post('delete-category', category);
  },
}