import { createRouter, createWebHistory } from 'vue-router'
import Checklist from '../views/default/Checklist.vue'
import About from '../views/default/About.vue'
import Tipps from '../views/default/Tipps.vue'
import Teilen from '../views/default/Teilen.vue'
import Geteilt from '../views/default/Geteilt.vue'
import Account from '../views/default/Account.vue'
import ServiceList from '../views/default/ServiceList.vue'
import Login from '../views/login/Login.vue'
import Registrierung from '../views/login/Register.vue'


const routes = [
  {
    path: '/',
    name: 'Checklist',
    component: Checklist
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/tipps',
    name: 'Tipps',
    component: Tipps
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dienstleister',
    name: 'ServiceList',
    component: ServiceList
  },
  {
    path: '/registrierung',
    name: 'Registrierung',
    component: Registrierung
  },
  {
    path: '/teilen',
    name: 'Teilen',
    component: Teilen
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/geteilt/:code',
    name: 'Geteilt',
    component: Geteilt,
    params: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
