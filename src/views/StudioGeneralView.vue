<template>


    <div class="container text-center">

        <div class="row justify-content-center">
            <div class="col col-4">
                <div class="input-group mb-3">
                    <input v-model="studio.studioName" type="text" class="form-control" placeholder="Sisesta stuudio nimi" aria-describedby="basic-addon1">
                </div>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row">
            <div class="col">
                <div class="img-wrapper1">
                    <StudioImage :image-data="studio.imageData"/>
                </div>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-primary">Otsi pilt</button>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row justify-content-center">
            <div class="col col-6">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon3">Lisa Url</span>
                    <input v-model="studio.website" type="text" class="form-control" placeholder="https://minustuudio.com" id="basic-url" aria-describedby="basic-addon3">
                </div>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row">
            <div class="col">
                <label for="basic-url" class="form-label">Aadress</label>
                <div class="input-group mb-3">
                    <input v-model="studio.address" type="text" class="form-control" placeholder="Sisesta stuudio aadress" aria-describedby="basic-addon1">
                </div>            </div>
            <div class="col">
                <label for="basic-url" class="form-label">Longtitude</label>

                <div class="input-group mb-3">
                    <input v-model="studio.longtitude" type="text" class="form-control" placeholder="00.000000" aria-describedby="basic-addon1">
                </div>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row">
            <div class="col">
                <label for="basic-url" class="form-label">Vali linnaosa</label>

                <DistrictDropdown @event-emit-selected-district-id="setSelectedDistrictId"/>
            </div>
            <div class="col">
                <label for="basic-url" class="form-label">Latitude</label>
                <div class="input-group mb-3">

                    <input v-model="studio.latitude" type="text" class="form-control" placeholder="00.000000" aria-describedby="basic-addon1">
                </div>
            </div>
        </div>

    </div>
    <div class="container text-center">

        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <button @click="postAtmLocation" type="button" class="btn btn-primary">Lisa stuudio</button>
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

export default {
    name: "StudioGeneralView",
    components: {DistrictDropdown, StudioImage},
    data() {
        return {
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
        setSelectedDistrictId(districtId){
            this.selectedDistrictId = ''
            this.selectedDistrictId = districtId
            this.studio.districtId = this.selectedDistrictId
        },


        postAtmLocation() {
            this.$http.post('/studios/general', this.studio
            ).then(response => {
                alert('õnnestus')
            // todo: Kood ei jõua siia, kuidas kasutada debuggerit???
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
    }
}
</script>
