<template>
    <StudioPreviewModal ref="studioPreviewModalRef"/>
    <div class="home">
        <div class="container">
            <div class="row mb-5">
                <div class="col">
                    <h1>Tallinna Fotostuudiod</h1>
                </div>
            </div>
        </div>

    </div>
    <div class="container">
        <div class="row">
            <div class="col col-2">
                <label for="basic-url" class="form-label">Vali linnaosa</label>
                <DistrictDropdown ref="districtDropdownRef" @event-emit-selected-district-id="setSelectedDistrictId"/>
            </div>
            <div class="col">
                <div class="container">
                    <div class="row mt-4 mb-3" v-for="studio in studios" :key="studio.studioId">
                        <div class="col">
                            <h2 @click="activateModal(studio.studioId)">{{ studio.studioName }}</h2>

                        </div>
                        <div class="col img-wrapper">
                            <StudioImage :image-data="studio.imageData"/>
                        </div>
                        <div class="col">
                            <button @click="navigateToUserStudioBooking" type="button" class="btn btn-dark">broneeri</button>
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
        navigateToUserStudioBooking(studioId){
            router.push({name:'studioBookingRoute', query:{studioId:studioId}})
        },
    },
    beforeMount() {
        this.getAllActiveStudios()
    }
}
</script>