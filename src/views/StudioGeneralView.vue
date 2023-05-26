<template>
    <div class="container">
    <div class="row mb-5 justify-content-center">
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


    <div class="container text-center">

        <div class="row justify-content-center">
            <div class="col col-4">
                <div class="input-group mb-3">
                    <input v-model="studio.studioName" type="text" class="form-control"
                           placeholder="Sisesta stuudio nimi" aria-describedby="basic-addon1">
                </div>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row">
            <div class="col mb-1">
                <div class="img-wrapper1">
                    <StudioImage :image-data="studio.imageData"/>
                </div>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row">
            <div class="col mb-3">
                <ImageInput ref="imageInputRef" @event-emit-base64="emitBase64"/>
            </div>
        </div>

    </div>
    <div class="container text-center">

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
    <div class="container text-center">

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
                           aria-describedby="basic-addon1">
                </div>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row justify-content-center">
            <div class="col col-3">
                <label for="basic-url" class="form-label">Vali linnaosa</label>

                <DistrictDropdown ref="districtDropdownRef" @event-emit-selected-district-id="setSelectedDistrictId"/>
            </div>
            <div class="col col-3 justify-content-center">
                <label for="basic-url" class="form-label">Latitude</label>
                <div class="input-group mb-3">

                    <input v-model="studio.latitude" type="text" class="form-control" placeholder="00.000000"
                           aria-describedby="basic-addon1">
                </div>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <button v-if="isEdit" @click="putChangeStudioData" type="button" class="btn btn-dark">Muuda
                            andmed
                        </button>
                        <button v-else @click="postNewStudio" type="button" class="btn btn-dark">Lisa
                            stuudio
                        </button>
                    </div>
                </div>

            </div>
        </div>

    </div>


</template>

<script>
import StudioImage from "@/components/StudioImage.vue";
import DistrictDropdown from "@/components/DistrictDropdown.vue";
import router from "@/router";
import {useRoute} from "vue-router";
import ImageInput from "@/components/ImageInput.vue";

export default {
    name: "StudioGeneralView",
    components: {DistrictDropdown, StudioImage, ImageInput},
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
            }


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
                alert('Stuudio lisamine õnnestus')
                router.push({name: 'userStudiosRoute'})


            }).catch(error => {
                this.errorResponse = error.response.data
                if (this.errorResponse.errorCode === 555) {
                    this.message = this.errorResponse.message
                    alert(this.errorResponse.message)
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
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
                alert('Stuudio muutmine õnnestus')
                router.push({name: 'userStudiosRoute'})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },


        setSelectedDistrictField() {
            this.$refs.districtDropdownRef.setSelectedDistrictId(this.studio.districtId)
        },
        navigateToSettingsView(){
            router.push({name:'settingsRoute',query:{studioId: this.studioId}})
        },
        navigateToAvailabilityView(){
            router.push({name:'availabilityRoute',query:{studioId: this.studioId}})
        },
        navigateToReservationView(){
            router.push({name:'reservationRoute',query:{studioId: this.studioId}})
        },

    },
    mounted() {
        this.isEdit = this.studioId !== 0;
        if (this.isEdit) {
            this.getStudioData();
        }
    }
}
</script>
