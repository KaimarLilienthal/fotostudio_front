import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import MyStudiosView from "@/views/UserStudiosView.vue";
import StudiosView from "@/views/StudiosView.vue";
import UserStudiosView from "@/views/UserStudiosView.vue";

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
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
