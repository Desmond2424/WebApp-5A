import Vue from 'vue'
import VueRouter from 'vue-router'

import User from '@/components/User.vue'
import Administrator from '@/components/Administrator.vue'
import Monitor from '@/components/Monitor.vue'
import Connexion from '@/components/Connexion.vue'
import Profil from '@/components/Profil.vue'
import Subscribe from '@/components/Subscribe'
import Home from '@/components/Home'
import Planning from '@/components/Planning'
import Chevaux from '@/components/Chevaux'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta:{Sidebar:false},
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/profil',
    name: 'Profils',
    component: Profil
  },
  {
    path: '/subscribe',
    meta:{Sidebar:false},
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
    path: '/users',
    name: 'Users',
    component: User
  },
  {
    path: '/planning',
    name: 'Planning',
    component: Planning
  },
  {
    path: '/chevaux',
    name: 'Chevaux',
    component: Chevaux
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
