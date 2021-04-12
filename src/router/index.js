import Vue from 'vue'
import VueRouter from 'vue-router'

import Catalog from '../components/catalog/catalog'
import mainPage from '../components/main-page/main-page'
import item from '../components/product/product'
import auth from '../components/authentication/auth'
import userAuth from '../components/authentication/user-auth'
import adminOrders from '../components/admin-panel/admin-orders'
import adminArchive from '../components/admin-panel/admin-archive'
import cart from '../components/cart/cart'
import order from '../components/order/order'
import productCategory from '../components/admin-panel/product-category'
import adminProducts from '../components/admin-panel/admin-products'
import adminSettings from '../components/admin-panel/admin-settings'
import adminManagers from '../components/admin-panel/admin-managers'
import adminCouriers from '../components/admin-panel/admin-couriers'
import addProduct from '../components/admin-panel/add-product'
import changeProduct from '../components/admin-panel/change-product'
import comments from '../components/comments/comments'
import about from '../components/about/about'
import delivery from '../components/delivery/delivery'
import userAccount from '../components/user/personal-account'
import personalData from '../components/user/personal-data'
import managerOrders from '../components/manager-panel/manager-orders'
import managerArchive from '../components/manager-panel/manager-archive'
import managerComments from '../components/manager-panel/manager-comments'
import managerSettings from '../components/manager-panel/manager-settings'
import courierOrders from '../components/courier-panel/courier-orders'
import courierSettings from '../components/courier-panel/courier-settings'
import orderHistory from '../components/user/order-history'
import currentOrders from '../components/user/current-orders'
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
    path: '/user-auth',
    name: 'userAuth',
    component: userAuth
},
{
  path: '/personal-account',
  name: 'userAccount',
  component: userAccount
},
{
  path: '/personal-data',
  name: 'personalData',
  component: personalData
},
{
  path: '/order-history',
  name: 'orderHistory',
  component: orderHistory
},
{
  path: '/current-orders',
  name: 'currentOrders',
  component: currentOrders
},
  {
    path: '/comments',
    name: 'comments',
    component: comments
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
    path: '/admin-archive',
    name: 'adminArchive',
    component: adminArchive,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/admin-managers',
    name: 'adminManagers',
    component: adminManagers,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/admin-couriers',
    name: 'adminCouriers',
    component: adminCouriers,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/admin-settings',
    name: 'adminSettings',
    component: adminSettings,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/manager-orders',
    name: 'managerOrders',
    component: managerOrders,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/manager-archive',
    name: 'managerArchive',
    component: managerArchive,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/manager-comments',
    name: 'managerComments',
    component: managerComments,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/manager-settings',
    name: 'managerSettings',
    component: managerSettings,
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
    path: '/change-product',
    name: 'changeProduct',
    component: changeProduct,
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
    path: '/courier-orders',
    name: 'courierOrders',
    component: courierOrders,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/courier-settings',
    name: 'courierSettings',
    component: courierSettings,
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
    path: '/delivery',
    name: 'delivery',
    component: delivery
  },
  {
    path: '/about',
    name: 'about',
    component: about
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (Auth.default.admin.authenticated || Auth.default.manager.authenticated || Auth.default.courier.authenticated) {
      next()
    } else {
      router.push('/auth')
    }
  } else {
    next()
  }
})
export default router
