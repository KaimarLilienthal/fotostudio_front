<template>

        <div class="container">
            <div class="row mb-5">
                <div class="col">
                    <h1>Stuudio nimi</h1>
                </div>
            </div>
        </div>
    <div class="container">
        <div class="row mb-5">
            <div class="col">
                <h3>Broneeri</h3>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row row-cols-4">
            <div class="col"><h5>Lisateenused</h5></div>
            <div class="col"><h5>Hind</h5></div>
            <div class="col"><h5></h5></div>
            <div class="col"><h5></h5></div>

        </div>
        </div>
    <div class="container">
        <div class="row row-cols-4">
            <div class="col">Valgustus</div>
            <div class="col">5</div>
            <div class="col"><div class="mb-3 form-check">
                <input v-model="terms" type="checkbox" class="form-check-input" id="exampleCheck1">
            </div></div>
            <div class="col col-2"><div class="input-group mb-3">
                <input v-model="startDate" type="date" class="form-control" aria-describedby="basic-addon1">
            </div></div>
        </div>
    </div>
    <div class="container">
        <div class="row row-cols-4">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
        </div>
    </div>
    <div class="container">
        <div class="row row-cols-4">
            <div class="col"></div><div class="col col-3">

            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>

        </div>
    </div>
    </div>
</template>

<script>
import router from "@/router";
import {useRoute} from "vue-router";
import StudioImage from "@/components/StudioImage.vue";
import DistrictDropdown from "@/components/DistrictDropdown.vue";

export default {
    name: "UserStudioBookingView",
    components: {DistrictDropdown, StudioImage},

    data(){
        return{
        }
    }
}
</script>

<style scoped>

</style>

