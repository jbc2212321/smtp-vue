import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import AdminHome from "../views/AdminHome";
import UserManagement from "../components/UserManagement";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/AdminHome',
    name: 'AdminHome',
    component: AdminHome,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '/admin/UserManagement',
        component: UserManagement,
        meta: {
          requireAuth: true,
        },
      },
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.isLogin) {
      next()
    } else {
      next({ path: '/' })
    }
  } else {
    next()
  }
})
export default router
