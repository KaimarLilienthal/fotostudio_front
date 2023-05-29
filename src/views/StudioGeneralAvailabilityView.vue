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
                    <input v-model="startDate" type="date" class="form-control"
                           aria-describedby="basic-addon1">
                </div>
            </div>
        </div>
        <div class="row mb-5 justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Lõpp</span>
                    <input v-model="endDate" type="date" class="form-control"
                           aria-describedby="basic-addon1">
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
                <input v-model="startHour" type="time" id="start" class="form-control"
                       aria-describedby="basic-addon1">
            </div>
        </div>
    </div>
    <div class="row mb-5 justify-content-center">
        <div class="col col-2">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Lõpp</span>
                <input v-model="endHour" type="time" id="stop" class="form-control"
                       aria-describedby="basic-addon1">

            </div>
            <div class="col mb-12">
                <button @click="show" type="button" class="btn btn-dark">Lisa ajad</button>
            </div>


        </div>
    </div>
    <div class="row">
        <div class="col">
            <table class=" table table-dark table-hover">
                <thead>
                <tr>

                            <th scope="col">Kuupäev alates</th>
                            <th scope="col">Kuupäev kuni</th>
                            <th scope="col">Kellaaeg alates</th>
                            <th scope="col">Kellaaeg kuni</th>
                            <th scope="col">kustuta</th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="availability in availabilities" :key="studioId">
                    <th>{{ availability.startDate }}</th>
                    <td>{{ availability.endDate }}</td>
                    <td>{{ availability.startHour }}</td>
                    <td>{{ availability.endHour }}</td>
                    <td>
                        <font-awesome-icon  class="hoverable-link" :icon="['fas', 'trash']" />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <SuccessModal :message="successMessage" ref="successModalRef" @event-success="handleSuccessMessage"/>
<!--      <DangerModal :message={"errorResponse.message" ref="dangerModalRef" @event-danger="handleDangerMessage"/>-->
</template>

<script>
import {useRoute} from "vue-router";

import router from "@/router";
import DangerModal from "@/components/modal/alertmodals/DangerModal.vue";
import SuccessModal from "@/components/modal/alertmodals/SuccessModal.vue";
import StudioImage from "@/components/StudioImage.vue";


export default {

    name: "StudioGeneralAvailabilityView",
    components: {StudioImage, SuccessModal, DangerModal},

    data() {
        return {
            startDate: "",
            endDate: "",
            startHour: "",
            endHour: "",
            successMessage: '',
            studioId: Number(useRoute().query.studioId),
            studioName: String(useRoute().query.studioName),
            availabilities: {

                startDate: "",
                endDate: "",
                startHour: "",
                endHour: ""

            }
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
            if (this.startDate == '' || this.endDate == '' || this.startHour == '' || this.endHour == '') {
                this.successMessage = 'Palun täida kõik väljad!'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            } else {
                this.availabilities.startDate = this.startDate
                this.availabilities.endDate = this.endDate
                this.availabilities.startHour = this.startHour
                this.availabilities.endHour = this.endHour
                this.$http.post("/booking/availability", this.availabilities, {
                        params: {
                            studioId: this.studioId
                        }
                    }
                ).then(response => {
                    this.successMessage = 'Lahtioleku aeg lisatud!'
                    this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
                }).catch(error => {
                    router.push({name: 'errorRoute'})
                })

            }

        },
        getStudioAvailabilities: function () {
            this.$http.get("/booking/availability", {
                    params: {
                        studioId: this.studioId,
                    }
                }
            ).then(response => {
                this.availabilities = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },


        handleSuccessMessage() {
        },
        handleDangerMessage(){

        }

    },
    beforeMount() {
        this.getStudioAvailabilities();
    }


}


</script>

