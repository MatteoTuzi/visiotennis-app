import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import PlayersView from '@/views/players/PlayersView.vue'
import Login from './views/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/players',
    name: 'Players',
    component: PlayersView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
