<template>
  <div class="home">
      <div class="container">
          <div class="row mb-5">
              <div class="col">
                  <h1>Tallinna Fotostuudiod</h1>
              </div>
          </div>
          <div class="row">
              <div class="col">
                  <h3 @click="toStudioRooms" >Fotostuudiod rentimiseks</h3>

              </div>
          </div>
      </div>

  </div>
</template>

<script>
// @ is an alias to /src

import router from "@/router";

export default {
  name: 'HomeView',
    methods: {
        toStudioRooms(){
            alert('töötab')
            router.push({name: 'userStudiosRoute'})
        }
    }
}


</script>
