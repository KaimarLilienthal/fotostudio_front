<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col">
                <h1>Tallinna Fotostuudiod</h1>
            </div>
        </div>
        <div @keydown.enter="emailCheck" class="row mb-5 justify-content-center">
            <div class="col col-3">

                <div class="mb-3">
                    <label for="e-mail" class="form-label">Sisesta oma e-mail aadress</label>
                    <input v-model="email" class="form-control" id="email" aria-describedby="emailHelp">

                </div>

                <button @click="emailCheck" type="submit" class="btn btn-dark">Saada uus parool</button>


            </div>
        </div>

    </div>
    <SuccessModal :message="successMessage" ref="successModalRef" @event-success="reset"/>

</template>

<script>
import router from "@/router";

import SuccessModal from "@/components/modal/alertmodals/SuccessModal.vue";

export default {
    name: "ResetView",
    components: {SuccessModal},
    data() {
        return {
            email: '',
            successMessage: '',


        }
    },
    methods: {
        reset() {
            if (this.successMessage == "E-maili ei leitud, palun registreeru.") {
                router.push({name: 'registerRoute'})
            } else {

                router.push({name: 'loginRoute'})
            }
        },
        emailCheck: function () {
            this.$http.get("/register", {
                    params: {
                        email: this.email
                    }
                }
            ).then(response => {
                this.successMessage = response.data
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        }
    }
}
</script>

