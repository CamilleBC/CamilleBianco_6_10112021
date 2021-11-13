import Vue from 'vue'
import VueRouter from 'vue-router'
import Wall from '../views/Wall.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Profil from '../views/Profil.vue'
import Send from '../views/Send.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/wall',
    name: 'Wall',
    component: Wall
  },
  {
    path : '/signup',
    name : 'Signup',
    component : SignUp 
  },
  {
    path : '/login',
    name : 'Login',
    component : Login 
  },
  {
    path : '/profil',
    name : 'Profil',
    component : Profil 
  },
  {
    path : '/send',
    name : 'Send',
    component : Send 
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
