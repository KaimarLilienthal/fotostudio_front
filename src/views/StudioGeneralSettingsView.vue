<template>
        <div class="container text-center">
            <div class="row mb-5">
                <div class="col">
                    <h1>Photoroom</h1>
                </div>
            </div>
        </div>
    <div class="container">
        <div class="row justify-content-center mt-5" >
            <div class="col col-2">
                <h5>Tunni hind</h5>
            </div>
            <div class="col col-1">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">€</span>
                    <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
                </div>
            </div>
            <div class="col col-3">
                <button @click="navigateToSettingsView" type="button" class="btn btn-dark">Salvesta</button>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-center ">
            <div class="col col-2">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Vali teenused
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Valgustus</a></li>
                        <li><a class="dropdown-item" href="#">Välgud</a></li>
                        <li><a class="dropdown-item" href="#">Softbox</a></li>
                        <li><a class="dropdown-item" href="#">Reflektorid</a></li>
                        <li><a class="dropdown-item" href="#">Taustad</a></li>
                        <li><a class="dropdown-item" href="#">Värvilised kiled</a></li>
                    </ul>
                </div>
            </div>
            <div class="col col-1">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">€</span>
                    <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
                </div>
            </div>
            <div class="col col-3">
                <button @click="navigateToSettingsView" type="button" class="btn btn-dark">Lisa teenuste hulka</button>
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
                    <th><font-awesome-icon @click="sendStudioDeleteRequest(studio.studioId)" class="hoverable-link" :icon="['fas', 'trash']" /></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="studio in studios" :key="studio.studioId">
                    <th>{{}}</th>
                    <td>{{}}</td>
                    <td>{{}}</td>
                    <td>{{studio.studioId}}</td>

                </tr>
                </tbody>
            </table>


        </div>
    </div>

</template>

<script>
import {useRoute} from "vue-router";
import StudioImage from "@/components/StudioImage.vue";
import router from "@/router";

export default {
    name: "StudioGeneralSettingsView",
    components: {StudioImage},
    data(){
        return{
            studioId: Number(useRoute().query.studioId),
        }
    },
}
</script>

<style scoped>

</style>


