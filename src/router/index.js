import Vue from 'vue'
import VueRouter from 'vue-router'

import Catalog from '../components/catalog/catalog'
import mainPage from '../components/main-page/main-page'
import item from '../components/product/product'
import auth from '../components/authentication/auth'
import adminOrders from '../components/admin-panel/admin-orders'
import cart from '../components/cart/cart'
import order from '../components/order/order'
import orderOk from '../components/order/order-ok'
import productCategory from '../components/admin-panel/product-category'
import Settings from '../components/admin-panel/settings'
import adminProducts from '../components/admin-panel/admin-products'
import addProduct from '../components/admin-panel/add-product'
import * as Auth from '../services/authService'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'mainPage',
      component: mainPage
  },
  {
      path: '/catalog',
      name: 'catalog',
      component: Catalog
  },
  {
      path: '/product',
      name: 'item',
      component: item
  },
  {
      path: '/auth',
      name: 'auth',
      component: auth
  },
  {
    path: '/admin-orders',
    name: 'adminOrders',
    component: adminOrders,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/admin-products',
    name: 'adminProducts',
    component: adminProducts,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/add-product',
    name: 'addProduct',
    component: addProduct,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/product-category',
    name: 'productCategory',
    component: productCategory,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart,
  },
  {
    path: '/order',
    name: 'order',
    component: order
  },
  {
    path: '/order-ok',
    name: 'orderOk',
    component: orderOk
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (Auth.default.admin.authenticated) {
      next()
    } else {
      router.push('/auth')
    }
  } else {
    next()
  }
})
export default router
