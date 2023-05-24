<template>
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
                            <h2 @click="activateModal">{{ studio.studioName }}</h2>
                        </div>
                        <div class="col img-wrapper">
                            <StudioImage :image-data="studio.imageData"/>
                        </div>
                        <div class="col">
                            <button @click="" type="button" class="btn btn-primary">broneeri</button>
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

export default {
    name: "StudiosView",
    components: {StudioImage, DistrictDropdown},
    data() {
        return {

            selectedDistrictId: 0,
            studios: [
                {
                    studioName: '',
                    imageData: ''
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
        activateModal() {
            alert('Modal hakkas tööle')

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
        }
    },
    beforeMount() {
        this.getAllActiveStudios()
    }
}
</script>