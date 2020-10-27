import Vue from 'vue'
import VueRouter from 'vue-router'

import User from '@/components/User.vue'
import Administrator from '@/components/Administrator.vue'
import Monitor from '@/components/Monitor.vue'
import Connexion from '@/components/Connexion.vue'
import Profil from '@/components/Profil.vue'
import Subscribe from '@/components/Subscribe'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/profil',
    name: 'Profils',
    component: Profil
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe
  },
  {
    path: '/admin',
    name: 'Administrator',
    component: Administrator
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: Monitor
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
