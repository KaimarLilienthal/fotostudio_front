<template>
    <div class="container">
        <div class="row mb-5 justify-content-center">
            <div class="col col-2">
                <button @click="navigateToGeneralView" type="button" class="btn btn-dark">Üldised sätted</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToAvailabilityView" type="button" class="btn btn-dark">Saadavus</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToReservation" type="button" class="btn btn-dark">Broneeringud</button>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row mb-5">
            <div class="col">
                <h1>{{ studioName }}</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row mb-5 justify-content-center">
            <div class="col col-2">
                <h5>Tunni hind</h5>
            </div>
            <div class="col col-2">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">€</span>
                    <input v-model="studioPrice.hourPrice" type="text" class="form-control" placeholder="" aria-label=""
                           aria-describedby="basic-addon1">
                </div>
            </div>
            <div class="col col-3">
                <button @click="patchStudioHourPrice" type="button" class="btn btn-dark">Salvesta</button>
            </div>
        </div>
    </div>
    <div class="container justify-content-center">
        <div class="row justify-content-center ">
            <div class="col col-2">
                <ExtraDropdown ref="extraDropdownRef" @event-emit-selected-extra-id="setSelectedExtraId"/>
            </div>
            <div class="col col-2">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Hind</span>
                    <input v-model="extraPrice" type="text" class="form-control" placeholder="0€" aria-label=""
                           aria-describedby="basic-addon1">
                </div>
            </div>
            <div class="col col-3">
                <button @click="setStudioExtra" type="button" class="btn btn-dark">Lisa teenuste hulka</button>
            </div>
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col col-5">

            <table class="table table-dark table-hover">
                <thead>
                <tr>
                    <th scope="col">Lisa teenused</th>
                    <th scope="col">Hind</th>
                    <th scope="col">Prügikast</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="studio in studios" :key="studio.studioId">
                    <th>{{}}</th>
                    <td>{{}}</td>
                    <th>
                        <font-awesome-icon @click="deleteStudioExtra" class="hoverable-link" :icon="['fas', 'trash']"/>
                    </th>
                </tr>
                </tbody>
            </table>


        </div>
    </div>

</template>

<script>
import {useRoute} from "vue-router";
import router from "@/router";
import ExtraDropdown from "@/components/ExtraDropdown.vue";

export default {
    name: "StudioGeneralSettingsView",
    components: {ExtraDropdown},
    data() {
        return {
            studioPrice: {
                hourPrice: 0
            },
            studioExtra: {
                studioId: 0,
                extraId: 0,
                price: 0
            },
            extraPrice: 0,
            studioName: 'Stuudio nimi',
            studioId: Number(useRoute().query.studioId),

        }
    },
    methods: {
        navigateToReservation() {
            router.push({name: 'reservationRoute', query: {studioId: this.studioId}})
        },
        navigateToGeneralView() {
            router.push({name: 'studioGeneralRoute', query: {studioId: this.studioId}})
        },
        navigateToAvailabilityView() {
            router.push({name: 'availabilityRoute', query: {studioId: this.studioId}})
        },
        setSelectedExtraId(extraId) {
            this.studioExtra.extraId = extraId
        },
        setStudioExtra() {
            this.studioExtra.studioId = this.studioId
            this.studioExtra.price = Number(this.extraPrice)
            this.addStudioExtraWithPrice();

        },
        getStudioHourPrice: function () {
            this.$http.get("/studio/price", {
                    params: {
                        studioId: this.studioId
                    }
                }
            ).then(response => {
                this.studioPrice = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        patchStudioHourPrice: function () {
            this.studioPrice.hourPrice = Number(this.studioPrice.hourPrice)

            this.$http.patch("/studio/price", this.studioPrice, {
                    params: {
                        studioId: this.studioId
                    }
                }
            ).then(response => {
                alert('Stuudio tunni hind muudetud')

            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },

        deleteStudioExtra: function () {
            this.$http.delete("/extra/studio-extra", {
                    params: {
                        studioId: this.studioId,
                        extraId: this.extraId
                    }
                }
            ).then(response => {
                const responseBody = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        addStudioExtraWithPrice: function () {
            this.$http.post("/extra/studio-extra", this.studioExtra
            ).then(response => {
                alert('Lisateenus lisatud')
                this.extraPrice = 0
                this.$refs.extraDropdownRef.setSelectedDistrictId('0')
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },


    },
    beforeMount() {
        this.getStudioHourPrice();
    }
}
</script>




