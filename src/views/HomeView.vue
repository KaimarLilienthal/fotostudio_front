<template>

  <div class="home row mb-xxl-5 justify-content-center ">
      <div class=" custom-card">
              <div class="col">
                  <h1>Tallinna Fotostuudiod</h1>
              </div>
          </div>
      <div class="home row mb-xxl-5 justify-content-center ">
          <div class="row mt-5 ">
              <div class="col">
                  <h2 @click="toStudioRooms" >Fotostuudiod rentimiseks</h2>
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
            router.push({name: 'studiosRoute'})
        }
    }
}


</script>
