<head>
<link ref="stylesheet" href="src/assets/my-style.css">
</head>

<template>

  <nav>
    <router-link to="/">Pealeht</router-link> |
      <router-link to="/studios">Stuudio ruumid</router-link> |
      <router-link to="/user-studios">Minu stuudiod</router-link> |
      <router-link to="/login">Stuudio logi sisse</router-link>
  </nav>

  <router-view/>
</template>

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
<script>


</script>