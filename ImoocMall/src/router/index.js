import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import GoodsList from './../views/GoodsList'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'
import Resource from '@/views/Resource'
import Address from '@/views/Address'
import OrderConfirm from '@/views/orderConfirm'
import OrderSuccess from '@/views/OrderSuccess'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
    },
    {
      path:'/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path:'/orderSuccess',
      name:'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
