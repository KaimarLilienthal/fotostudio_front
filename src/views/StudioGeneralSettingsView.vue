<template>
    <div class="container">
        <div class="row mb-5 justify-content-center">
            <div class="col col-2">
                <button @click="navigateToGeneralView" type="button" class="btn btn-dark">Üldised sätted</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToSettingsView" type="button" class="btn btn-dark">Teenused</button>
            </div>
            <div class="col col-2">
                <button @click="navigateToReservationView" type="button" class="btn btn-dark">Broneeringud</button>
            </div>
        </div>
    </div>
    <div class="home">
        <div class="container">
            <div class="row mb-5">
                <div class="col">
                    <h1>Photoroom</h1>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row mb-5 justify-content-center">
            <div class="col col-2">
                <h5>Tunni hind</h5>
            </div>
            <div class="col col-2">
                <h5>40€</h5>
            </div>
            <div class="col col-3">
                <button @click="navigateToSettingsView" type="button" class="btn btn-dark">Salvesta</button>
            </div>
        </div>
    </div>
    <div class="container justify-content-center">
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
            <div class="col col-2">
                <h5>Hind</h5>
            </div>
            <div class="col col-3">
                <button @click="navigateToSettingsView" type="button" class="btn btn-dark">Lisa teenuste hulka</button>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <table class=" table table-dark table-hover">
                <thead>
                <tr>
                    <div class="row mb-5 justify-content-center ">
                        <div class="col col-4">
                            <th scope="col">Lisatud teenused</th>
                            <th scope="col">Hind</th>
                            <th scope="col">Kustuta</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </div>
                    </div>
                </tr>
                </thead>
            </table>
        </div>
    </div>

</template>

<script>
import {useRoute} from "vue-router";
import StudioImage from "@/components/StudioImage.vue";

export default {
    name: "StudioGeneralSettingsView",
    components: {StudioImage},
    data(){
        return{
            studioId: Number(useRoute().query.studioId),
        }
    }
}
</script>

<style scoped>

</style>


