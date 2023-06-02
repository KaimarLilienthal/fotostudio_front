<template>
    <div class="container col-6">
        <div class="row mb-1 justify-content-center">
            <div class="col col-2">
                <button @click="navigateToGeneralView" type="button" class="btn btn-dark">Üldised sätted</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToAvailabilityView" type="button" class="btn btn-dark">Saadavus</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToSettingsView" type="button" class="btn btn-dark">Teenused</button>
            </div>
        </div>
    </div>
        <div class="container col-6">
            <div class="row mb-1">
                <div class="col">
                    <h1>{{studioName}}</h1>
                </div>
            </div>
        </div>
    <div class="container col-6">
        <div class="col col-12">
            <table class=" table table-dark table-hover">
                <thead>
                <tr>
                    <div class="row mb-1 justify-content-center ">
                        <div class="col col-4">
                            <th scope="col">Kuupäev</th>
                            <th scope="col">Kellaaeg</th>
                            <th scope="col">Klient</th>
                            <th scope="col">e-mail</th>
                            <th scope="col">Telefon</th>
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
            reservations: {
              bookingDate: '',
                bookingTime: '',
              customer: '',
              email: '',
              phone: '',
            },
            studioId: Number(useRoute().query.studioId),
            studioName: String(useRoute().query.studioName),
        }
    },

    methods:{
        navigateToGeneralView(){
            router.push({name:'studioGeneralRoute',query:{studioId: this.studioId}})
        },
        navigateToAvailabilityView(){
            router.push({name:'availabilityRoute',query:{studioId: this.studioId, studioName: this.studioName}})
        },
        navigateToSettingsView(){
            router.push({name:'settingsRoute',query:{studioId: this.studioId, studioName: this.studioName}})
        },


    }


}
</script>

<style scoped>

</style>