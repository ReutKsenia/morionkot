import Vue from 'vue'
import VueRouter from 'vue-router'

import Catalog from '../components/catalog/catalog'
import mainPage from '../components/main-page/main-page'
import item from '../components/product/product'
import auth from '../components/authentication/auth'
import adminPanel from '../components/admin-panel/admin'
import cart from '../components/cart/cart'
import * as Auth from '../components/authentication/index'

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
    path: '/admin-panel',
    name: 'adminPanel',
    component: adminPanel,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart,
    props: true
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
