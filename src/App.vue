<head>
<link ref="stylesheet" href="src/assets/my-style.css">
</head>

<template>

  <nav>
    <router-link to="/">Pealeht</router-link> |
      <router-link to="/studios">Stuudio ruumid</router-link> |
      <router-link v-if="userId === null" to="/login">Stuudio logi sisse</router-link>



      <template v-if="userId > 1">
          <router-link to="/user-studios">Minu stuudiod</router-link>
          |


          <router-link to="#" @click="handleLogout">Logi välja</router-link>
      </template>
      <template v-if ="userId == 1">
          <router-link to="#" @click="handleLogout">Logi välja</router-link>
      </template>





  </nav>
    <LogoutModal ref="logoutModalRef" @event-update-nav-menu="updateNavMenu"/>
    <router-view @event-update-nav-menu="updateNavMenu"/>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import LogoutModal from "@/components/modal/LogoutModal.vue";
export default {
    components: {LogoutModal,Modal},
    data() {
        return {

            userId: sessionStorage.getItem('userId'),
            roleName: sessionStorage.getItem('roleName')
        }
    },
    methods: {
        updateNavMenu() {
            this.userId = sessionStorage.getItem('userId')
            this.roleName = sessionStorage.getItem('roleName')
        },
        handleLogout() {
            this.$refs.logoutModalRef.$refs.modalRef.openModal()
        },
    }
}
</script>

<style>
#app {
  font-family: Optima, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

nav {
  padding: 50px;
}

nav a {
  font-weight: bold;
  color: #fff;
    font-size: large;
}

nav a.router-link-exact-active {
  color: #ffc107;
}

</style>
