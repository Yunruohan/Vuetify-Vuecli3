import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/channel'
    },
    {
      path: '/channel',
      name: 'channel',
      component: () => import('./views/channel.vue')
    }
  ]
})
