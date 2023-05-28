<template>
    <div class="container">
        <div class="row mb-5 justify-content-center">
            <div class="col col-2">
                <button @click="navigateToGeneralView" type="button" class="btn btn-dark">Üldised sätted</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToSettingsView" type="button" class="btn btn-dark">Teenused</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToReservationView" type="button" class="btn btn-dark">Broneeringud</button>
            </div>
        </div>
        <div class="container">
            <div class="row mb-5">
                <div class="col">
                    <h1>{{ studioName }}</h1>
                </div>
            </div>
        </div>
        <div class="row mb-12 justify-content-center">
            <h4>Vali kuupäeva algus ja lõpp</h4>
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Algus</span>
                    <input v-model="startDate" type="date" class="form-control" aria-describedby="basic-addon1">
                </div>
            </div>
        </div>
        <div class="row mb-5 justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Lõpp</span>
                    <input v-model="endDate" type="date" class="form-control" aria-describedby="basic-addon1">
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-12 justify-content-center">
        <h4>Vali kellaaja algus ja lõpp</h4>

        <div class="col col-2">
            <label for="time">Sisesta täistunnid</label>
            <div id="app" class="input-group mb-3">

                <span class="input-group-text" id="basic-addon1">Algus</span>
                <input v-model="startHour" type="time" id="start" class="form-control" aria-describedby="basic-addon1" >
            </div>
        </div>
    </div>
    <div class="row mb-5 justify-content-center">
        <div class="col col-2">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Lõpp</span>
                <input v-model="endHour" type="time" id="stop" class="form-control" aria-describedby="basic-addon1" >

            </div>
            <div class="col mb-12">
                <button @click="show" type="button" class="btn btn-dark">Lisa ajad</button>
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
                            <th scope="col">Kuupäev alates</th>
                            <th scope="col">Kuupäev kuni</th>
                            <th scope="col">Kellaaeg</th>
                            <th scope="col">kustuta</th>

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

    name: "StudioGeneralAvailabilityView",
    components: {},

    data() {
        return {
            startDate: 0,
            endDate: 0,
            startHour: 0,
            endHour: 0,
            studioId: Number(useRoute().query.studioId),
            studioName: String(useRoute().query.studioName),
        }
    },
    watch: {
        startHour(newValue) {
            this.startHour = this.formatHour(newValue);
        },
        endHour(newValue) {
            this.endHour = this.formatHour(newValue);
        }
    },

    methods: {
        formatHour(hour) {
            return hour ? `${hour.split(':')[0]}:00` : '';
        },

        navigateToSettingsView() {
            router.push({name: 'settingsRoute', query: {studioId: this.studioId, studioName: this.studioName}})
        },
        navigateToGeneralView() {
            router.push({name: 'studioGeneralRoute', query: {studioId: this.studioId}})
        },
        navigateToReservationView() {
            router.push({name: 'reservationRoute', query: {studioId: this.studioId, studioName: this.studioName}})
        },
        show() {
            alert(this.startDate)
            alert(this.endDate)
            alert(this.startHour)
            alert(this.endHour)

        }

    }


}



</script>

