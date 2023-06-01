<template>

    <StudioPreviewModal ref="studioPreviewModalRef"/>
    <div class="col-12 custom-card justify-content-center">
        <div class="col col-12">
            <h1>Tallinna Fotostuudiod</h1>
        </div>
    </div>

    <div class="row justify-content-center;">
        <div class="row col-12 justify-content-center ">
            <div class="row mt-5 justify-content-center">
            </div>
                <div class="col col-5">
                    <div class="row col-3">
                    <label for="basic-url" class="form-label row-cols-4">Vali linnaosa</label>
                    <DistrictDropdown ref="districtDropdownRef" @event-emit-selected-district-id="setSelectedDistrictId"/>
                </div>
            <div class="col mb-5">
                <div class="container">
                    <div class="row mb-5" v-for="studio in studios" :key="studio.studioId">
                        <div class="col col-8">
                            <h4 @click="activateModal(studio.studioId)">{{ studio.studioName }}</h4>

                        </div>
                        <div class="col img-wrapper">
                            <StudioImage :image-data="studio.imageData"/>
                        </div>
                        <div class="col">
                            <button @click="navigateToUserStudioBooking(studio.studioId, studio.studioName)" type="button" class="btn btn-dark">broneeri</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

</template>

<script>
import DistrictDropdown from "@/components/DistrictDropdown.vue";
import router from "@/router";
import StudioImage from "@/components/StudioImage.vue";
import StudioPreviewModal from "@/components/modal/StudioPreviewModal.vue";

export default {
    name: "StudiosView",
    components: {StudioPreviewModal, StudioImage, DistrictDropdown},
    data() {
        return {

            selectedDistrictId: 0,
            studios: [
                {
                    studioName: '',
                    imageData: '',
                    studioId: 0,
                }
            ]
        }
    },
    methods: {
        setSelectedDistrictId(districtId) {
            this.selectedDistrictId = ''
            this.selectedDistrictId = districtId
            this.studios.districtId = this.selectedDistrictId

            this.getAllActiveStudios()
        },
        activateModal(studioId) {
            this.$refs.studioPreviewModalRef.getStudioInfo(studioId)

        },
        getAllActiveStudios: function () {
            this.$http.get("/studio/all-selected-studios", {
                    params: {
                        districtId: this.selectedDistrictId
                    }
                }
            ).then(response => {
                this.studios = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        navigateToUserStudioBooking: function (studioId, studioName) {
            router.push({name: 'bookingRoute', query: {studioId: studioId, studioName: studioName}})
        },
    },
    beforeMount() {
        this.getAllActiveStudios()
    }
}
</script>

<style scooped>
.custom-card{
    background-color: rgba(218, 165, 32, 0.8);
    color:black;
}
</style>