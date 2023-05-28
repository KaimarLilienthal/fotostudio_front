<template>
        <div class="container">
            <div class="row mb-5">
                <div class="col mb-1">
                    <h1>Photoroom</h1>
                </div>
            </div>
        </div>
    <div class="container">
        <div class="row">
            <div class="col mb-5">
                <h4>Minu broneeringud</h4>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <table class=" table table-dark table-hover">
                <thead>
                <tr>
                    <div class="row mb-5 justify-content-center ">
                        <div class="col col-4">
                            <th scope="col">Kuupäev</th>
                            <th scope="col">Klient</th>
                            <th scope="col">e-mail</th>
                            <th scope="col">Telefon</th>
                            <th scope="col">Tühista</th>
                            <th scope="col"></th>
                        </div>
                    </div>
                </tr>
                <tr>
                    <div class="row mb-5 justify-content-center ">
                        <div class="col col-4">
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </div>
                    </div>
                </tr>
                <tr>
                    <div class="row mb-5 justify-content-center ">
                        <div class="col col-4">
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </div>
                    </div>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>

import {useRoute} from "vue-router";
import router from "@/router";

export default {
    name: "StudioGeneralReservationView",
    components: '',
    data(){
        return{
            studioId: Number(useRoute().query.studioId),
        }
    },



}
</script>

<style scoped>

</style>