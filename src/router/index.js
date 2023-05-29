import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import UserStudiosView from "@/views/UserStudiosView.vue";
import StudiosView from "@/views/StudiosView.vue";
import ErrorView from "@/views/ErrorView.vue";
import StudioGeneralView from "@/views/StudioGeneralView.vue";
import ResetView from "@/views/ResetView.vue";
import RegisterView from "@/views/RegisterView.vue";
import StudioGeneralSettingsView from "@/views/StudioGeneralSettingsView.vue";
import StudioGeneralAvailabilityView from "@/views/StudioGeneralAvailabilityView.vue";
import StudioGeneralReservationView from "@/views/StudioGeneralReservationView.vue";
import UserStudioBooking from "@/views/UserStudioBooking.vue";

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
  },
  {
    path: '/login/reset',
    name: 'resetRoute',
    component: ResetView
  },
  {
    path: '/login/register',
    name: 'registerRoute',
    component: RegisterView
  },
  {
    path: '/studio/general-settings',
    name:'settingsRoute',
    component: StudioGeneralSettingsView
  },
  {
    path: '/studio/general-availability',
    name:'availabilityRoute',
    component: StudioGeneralAvailabilityView
  },
  {
    path: '/studio/general-reservation',
    name:'reservationRoute',
    component: StudioGeneralReservationView
  },
  {
  path: '/studio/studio-booking',
    name:'bookingRoute',
    component: UserStudioBookingView
},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
