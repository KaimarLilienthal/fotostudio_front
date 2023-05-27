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
                           aria-describedby="basic-addon1" :onkeypress="isNumeric">
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
                           aria-describedby="basic-addon1" :onkeypress="isNumeric">
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
                <tr v-for="extra in extras" :key="extra.studioId">
                    <th>{{ extra.extraName }}</th>
                    <td>{{ extra.extraPrice }}</td>
                    <th>
                        <font-awesome-icon @click="deleteStudioExtra(extra.studioId, extra.extraId)" class="hoverable-link" :icon="['fas', 'trash']"/>
                    </th>
                </tr>
                </tbody>
            </table>


        </div>
    </div>
    <SuccessModal :message="successMessage" ref="successModalRef" @event-success="handleSuccessMessage"/>
    <DangerModal :message="errorResponse.message" ref="dangerModalRef" @event-danger="handleDangerMessage"/>
</template>

<script>
import {useRoute} from "vue-router";
import router from "@/router";
import ExtraDropdown from "@/components/ExtraDropdown.vue";
import DangerModal from "@/components/modal/alertmodals/DangerModal.vue";
import SuccessModal from "@/components/modal/alertmodals/SuccessModal.vue";
import ExtraDeleteModal from "@/components/modal/ExtraDeleteModal.vue";


export default {
    name: "StudioGeneralSettingsView",
    components: {ExtraDeleteModal, SuccessModal, DangerModal, ExtraDropdown},
    data() {
        return {
            errorResponse: {
                message: '',
                errorCode: 0
            },

            successMessage: '',

            studioPrice: {
                hourPrice: 0
            },
            studioExtra: {
                studioId: 0,
                extraId: 0,
                price: 0
            },
            extraPrice: 0,
            studioName: String(useRoute().query.studioName),
            studioId: Number(useRoute().query.studioId),
            extras: [
                {
                    studioId: 0,
                    extraId: 0,
                    extraName: "",
                    extraPrice: 0
                }
            ],


        }
    },
    computed: {
        isNumeric() {
            return event => {
                const keyCode = event.which ? event.which : event.keyCode;
                const isValid = (keyCode >= 48 && keyCode <= 57) || keyCode === 46 || keyCode === 8;
                return isValid;
            };
        }
    },
    methods: {
        navigateToReservation() {
            router.push({name: 'reservationRoute', query: {studioId: this.studioId, studioName: this.studioName}})
        },
        navigateToGeneralView() {
            router.push({name: 'studioGeneralRoute', query: {studioId: this.studioId}})
        },
        navigateToAvailabilityView() {
            router.push({name: 'availabilityRoute', query: {studioId: this.studioId, studioName: this.studioName}})
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
                this.successMessage = 'Stuudio tunni hind muudetud'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },

        deleteStudioExtra: function (studioId, extraId) {
            this.$http.delete("/extra/studio-extra", {
                    params: {
                        studioId: studioId,
                        extraId: extraId
                    }
                }
            ).then(response => {
                this.successMessage = 'Lisateenus kustutatud'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        addStudioExtraWithPrice: function () {
            this.$http.post("/extra/studio-extra", this.studioExtra
            ).then(response => {
                this.successMessage = 'Lisateenus lisatud'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            }).catch(error => {
                this.errorResponse = error.response.data
                if (this.errorResponse.errorCode === 777) {
                    this.message = this.errorResponse.message
                    this.$refs.dangerModalRef.$refs.modalTemplateRef.openModal()
                } else {

                    router.push({name: 'errorRoute'})
                }
            })
        },
        handleSuccessMessage() {
            this.extraPrice = 0
            this.$refs.extraDropdownRef.setSelectedDistrictId('0')
            this.getAllSelectedStudioExtrasWithPrice()
        },
        handleDangerMessage() {
            this.extraPrice = 0
            this.$refs.extraDropdownRef.setSelectedDistrictId('0')
            this.getAllSelectedStudioExtrasWithPrice()
        },

        getAllSelectedStudioExtrasWithPrice: function () {
            this.$http.get("/extra/studio-extras", {
                    params: {
                        studioId: this.studioId,
                    }
                }
            ).then(response => {
                this.extras = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },


    },
    beforeMount() {
        this.getStudioHourPrice();
        this.getAllSelectedStudioExtrasWithPrice();
    }
}
</script>




