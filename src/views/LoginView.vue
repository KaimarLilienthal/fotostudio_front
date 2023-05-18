<template>


    <div class="container">
        <div class="row mb-5">
            <div class="col">
                <h1>Tallinna Fotostuudiod</h1>
            </div>
        </div>
        <div class="row mb-5 justify-content-center">
            <div class="col col-3">

                <div class="mb-3">
                    <label for="username" class="form-label">Kasutajanimi</label>
                    <input v-model="username" class="form-control" id="username" aria-describedby="emailHelp">

                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Parool</label>
                    <input v-model="password" type="password" class="form-control" id="password">
                    <div id="emailHelp" class="form-text">Kasuta kindlasti tähti ja numbreid</div>
                </div>
                <button @click="login" type="submit" class="btn btn-primary">Logi sisse</button>


            </div>
        </div>

    </div>


  <!--  <div class="about">-->
  <!--      <button @click="login" type="submit">Test123</button>-->
  <!--  </div>-->
  <!--    <button type="button" class="btn btn-primary">Primary</button>-->

</template>

<script>

import router from "@/router";

export default {
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: '',
            loginResponse: {
                userId: 0,
                roleName: ''
            }
        }
    },
    methods: {
        login: function () {
            this.$http.get("/login", {
                    params: {
                        username: this.username,
                        password: this.password
                    }
                }
            ).then(response => {
                this.loginResponse = response.data
                if (this.loginResponse.roleName === "studio") {
                    router.push({name:'userStudiosRoute'})

                }

            }).catch(error => {
                const errorResponseBody = error.response.data
            })
        },
    }
}

</script>

