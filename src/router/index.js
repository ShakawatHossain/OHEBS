import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Dash from '../views/Dash.vue'
import PasswordRecovery from '../views/PasswordRecovery.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') 
    component: About
  },
  {
    path: '/dash',
    name: 'Dash',
    component: Dash
  },
  {
    path: '/password_recovery',
    name: 'PasswordRecovery',
    component: PasswordRecovery
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
