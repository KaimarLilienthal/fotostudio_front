import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import UserStudiosView from "@/views/UserStudiosView.vue";
import StudiosView from "@/views/StudiosView.vue";
import ErrorView from "@/views/ErrorView.vue";
import StudioGeneralView from "@/views/StudioGeneralView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/user-studios',
    name: 'userStudiosRoute',
    component: UserStudiosView
  },
  {
    path: '/studios',
    name: 'studiosRoute',
    component: StudiosView
  },
  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView
  },
  {
    path: '/studio/general',
    name: 'studioGeneralRoute',
    component: StudioGeneralView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
