import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import MyStudiosView from "@/views/MyStudiosView.vue";
import StudiosView from "@/views/StudiosView.vue";

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
    path: '/my-studio',
    name: 'myStudioRoute',
    component: MyStudiosView
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
