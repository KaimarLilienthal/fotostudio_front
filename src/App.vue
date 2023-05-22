<head>
<link ref="stylesheet" href="src/assets/my-style.css">
</head>

<template>

  <nav>
    <router-link to="/">Pealeht</router-link> |
      <router-link to="/studios">Stuudio ruumid</router-link> |
      <router-link v-if="userId === null" to="/login">Stuudio logi sisse</router-link>



      <template v-else>
          <router-link to="/user-studios">Minu stuudiod</router-link>
          |


          <router-link to="#" @click="handleLogout">Logi välja</router-link>
      </template>





  </nav>

    <router-view @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
import router from "@/router";

export default {
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
            sessionStorage.clear()
            router.push({name: 'homeRoute'})
            this.updateNavMenu()
        },
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #fff;
}

nav a.router-link-exact-active {
  color: #ffc107;
}

</style>
