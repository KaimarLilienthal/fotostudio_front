<template>
    <div v-if="studioId !== 0" class="container col-6">
        <div class="row mb-1 justify-content-center">
            <div class="col col-2">
                <button @click="navigateToSettingsView" type="button" class="btn btn-dark">Teenused</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToAvailabilityView" type="button" class="btn btn-dark">Saadavus</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToReservationView" type="button" class="btn btn-dark">Broneeringud</button>
            </div>
        </div>
    </div>

<div @keydown.enter="postNewStudio" >
    <div  class="container col-6">
        <div class="row mb-1 justify-content-center">
            <div class="col col-4">
                <div class="input-group mb-3">
                    <input v-model="studio.studioName" type="text" class="form-control"
                           placeholder="Sisesta stuudio nimi" aria-describedby="basic-addon1">
                </div>
            </div>
        </div>
    </div>
    <div class="container text-center col-6">
        <div class="row">
            <div class="col mb-5">
                <div class="img-wrapper1">
                    <StudioImage :image-data="studio.imageData"/>
                </div>
            </div>
            <div class="row">
                <div class="col col-12 justify-content-center">
                    <ImageInput ref="imageInputRef" @event-emit-base64="emitBase64"/>
                </div>
            </div>
        </div>
    </div>
    <div class="container text-center col-6">
        <div class="row justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span v-if="isEdit" class="input-group-text" id="basic-addon3">Url</span>
                    <span v-else class="input-group-text" id="basic-addon3">Lisa Url</span>
                    <input v-if="isEdit" v-model="studio.website" type="text" class="form-control" readonly>
                    <input v-else v-model="studio.website" type="text" class="form-control"
                           placeholder="https://minustuudio.com" id="basic-url" aria-describedby="basic-addon3">
                </div>
            </div>
        </div>
    </div>
    <div  class="container text-center col-6">
        <div class="row justify-content-center">
            <div class="col col-3">
                <label for="basic-url" class="form-label">Aadress</label>
                <div class="input-group mb-3">
                    <input v-model="studio.address" type="text" class="form-control"
                           placeholder="Sisesta stuudio aadress" aria-describedby="basic-addon1">
                </div>
            </div>
            <div class="col col-3">
                <label for="basic-url" class="form-label">Longtitude</label>
                <div class="input-group mb-3">
                    <input v-model="studio.longtitude" type="text" class="form-control" placeholder="00.000000"
                           aria-describedby="basic-addon1" :onkeypress="isNumeric" readonly>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col col-3">
                    <label for="basic-url" class="form-label">Vali linnaosa</label>
                    <DistrictDropdown ref="districtDropdownRef"
                                      @event-emit-selected-district-id="setSelectedDistrictId"/>
                </div>
                <div class="col col-3 justify-content-center">
                    <label for="basic-url" class="form-label">Latitude</label>
                    <div class="input-group mb-3">
                        <input v-model="studio.latitude" type="text" class="form-control" placeholder="00.000000"
                               aria-describedby="basic-addon1" :onkeypress="isNumeric" readonly >
                    </div>
                </div>
                <div class="row">
                    <div class="col mt-4" >
                        <button   @click="navigateBack" type="button" class="btn btn-dark">Tagasi
                        </button>

                        <button v-if="isEdit" @click="putChangeStudioData" type="button" class="btn btn-dark" style="margin-left: 10px" >Muuda
                            andmed
                        </button>
                        <button v-else @click="postNewStudio" type="button" class="btn btn-dark" style="margin-left: 10px" >Lisa
                            stuudio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


    <SuccessModal :message="successMessage" ref="successModalRef" @event-success="handleSuccessMessage"/>
    <DangerModal :message="errorResponse.message" ref="dangerModalRef" @event-danger=""/>
</template>

<script>
import StudioImage from "@/components/StudioImage.vue";
import DistrictDropdown from "@/components/DistrictDropdown.vue";
import {useRoute} from "vue-router";
import router from "@/router";
import ImageInput from "@/components/ImageInput.vue";
import SuccessModal from "@/components/modal/alertmodals/SuccessModal.vue";
import DangerModal from "@/components/modal/alertmodals/DangerModal.vue";

export default {
    name: "StudioGeneralView",
    components: {SuccessModal, DistrictDropdown, StudioImage, ImageInput, DangerModal},
    data() {
        return {
            isEdit: false,
            studioId: Number(useRoute().query.studioId),
            successMessage: '',
            selectedDistrictId: 0,
            userId: sessionStorage.getItem('userId'),
            studio: {
                ownerUserId: sessionStorage.getItem('userId'),
                studioName: '',
                website: '',
                imageData: '',
                districtId: 0,
                address: '',
                longtitude: 0,
                latitude: 0
            },
            errorResponse: {
                message: '',
                errorCode: 0
            },


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
        emitBase64(imageData) {

            this.$emit('event-emit-base64', imageData)
            this.studio.imageData = imageData

        },
        setImageData64(imageData) {
        },
        setSelectedDistrictId(districtId) {
            this.selectedDistrictId = ''
            this.selectedDistrictId = districtId
            this.studio.districtId = this.selectedDistrictId
        },


        postNewStudio() {
            this.$http.post('/studio', this.studio
            ).then(response => {
                this.successMessage = 'Uue Stuudio lisamine õnnestus'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()

            }).catch(error => {
                this.errorResponse = error.response.data
                if (this.errorResponse.errorCode === 555) {
                    this.message = this.errorResponse.message
                    this.$refs.dangerModalRef.$refs.modalTemplateRef.openModal()
                } else if (this.studio.studioName === '' || this.studio.website === '' || this.studio.address === '' || this.studio.districtId === 0) {
                    this.errorResponse.message = 'Stuudio nimi, Url, aadress ja linnaosa valiku täitmine on kohustuslikud!!!'
                    this.$refs.dangerModalRef.$refs.modalTemplateRef.openModal()
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
        },
        handleSuccessMessage() {
            router.push({name: 'userStudiosRoute'})
        },


        getStudioData: function () {
            this.$http.get("/studio/user-studio", {
                    params: {
                        studioId: this.studioId,
                    }
                }
            ).then(response => {
                this.studio = response.data
                this.setSelectedDistrictField()
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })

        },
        putChangeStudioData: function () {
            this.$http.put("/studio", this.studio, {
                    params: {
                        studioId: this.studioId
                    }
                }
            ).then(response => {
                this.successMessage = 'Stuudio andmete muutmine õnnestus'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },


        setSelectedDistrictField() {
            this.$refs.districtDropdownRef.setSelectedDistrictId(this.studio.districtId)
        },
        navigateToSettingsView() {
            router.push({name: 'settingsRoute', query: {studioId: this.studioId, studioName: this.studio.studioName}})
        },
        navigateToAvailabilityView() {
            router.push({
                name: 'availabilityRoute',
                query: {studioId: this.studioId, studioName: this.studio.studioName}
            })
        },
        navigateToReservationView() {
            router.push({
                name: 'reservationRoute',
                query: {studioId: this.studioId, studioName: this.studio.studioName}
            })
        },
        navigateBack(){
            router.push({name: 'userStudiosRoute'})

        }

    },
    mounted() {
        this.isEdit = this.studioId !== 0;
        if (this.isEdit) {
            this.getStudioData();
        }
    }
}
</script>
