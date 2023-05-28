<template>
        <div class="row mb-12 justify-content-center">
            <h4>Vali kuupäeva algus ja lõpp</h4>
        <div class="col col-2">

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Algus</span>
                <input type="date" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
        </div>
        </div>
        <div class="row mb-5 justify-content-center">
            <div class="col col-2">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Lõpp</span>
                    <input type="date" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                </div>
            </div>
        </div>
    <div class="row mb-12 justify-content-center">
        <h4>Vali kellaaja algus ja lõpp</h4>
        <div class="col col-2">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Algus</span>
                <input type="time" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
        </div>
    </div>
    <div class="row mb-5 justify-content-center">
        <div class="col col-2">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Lõpp</span>
                <input type="time" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="col mb-12">
                   <button @click="" type="button" class="btn btn-dark">Lisa ajad</button>
            </div>


        </div>
    </div>
    <div class="container">
        <div class="row">
            <table class=" table table-dark table-hover">
                <thead>
                <tr>
                    <div class="row justify-content-center ">
                        <div class="col col-4">
                            <th scope="col">Kuupäev alates</th>
                            <th scope="col">Kuupäev kuni</th>
                            <th scope="col">Kellaaeg </th>
                            <th scope="col">Kustuta</th>
                        </div>
                    </div>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
import {useRoute} from "vue-router";
import data from "bootstrap/js/src/dom/data";
import router from "@/router";

export default {
    name: "StudioGeneralAvailabilityView",
    components:'',

    data(){
        return{
            studioId: Number(useRoute().query.studioId),
        }
    },






}

</script>

<style scoped>

</style>