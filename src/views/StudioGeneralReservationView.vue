<template>
    <div class="container">
        <div class="row">
            <div class="col">
                Column
            </div>
            <div class="col">
                Column
            </div>
            <div class="col">
                Column
            </div>
        </div>
    </div>

</template>

<script>
import StudioImage from "@/components/StudioImage.vue";
import {useRoute} from "vue-router";

export default {
    name: "StudioGeneralReservationView",
    components: '',
    data(){
        return{
            studioId: Number(useRoute().query.studioId),
        }
    }
}
</script>

<style scoped>

</style>