<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col">
                <h1>Tallinna Fotostuudiod</h1>
            </div>
        </div>
        <div @keydown.enter="reset" class="row mb-5 justify-content-center">
            <div class="col col-3">

                <div class="mb-3">
                    <label for="e-mail" class="form-label">Sisesta oma e-mail aadress</label>
                    <input v-model="email" class="form-control" id="email" aria-describedby="emailHelp">

                </div>

                <button @click="reset" type="submit" class="btn btn-primary">Saada uus parool</button>





            </div>
        </div>

    </div>
</template>

<script>
import router from "@/router";

export default {
    name: "ResetView",
    data() {
        return {
            email: ''
        }
    },
    methods: {
        reset() {
            alert('Uus parool saadeti aadressile      ' + this.email)
            router.push({name: 'loginRoute'})
        }
    }
}
</script>

