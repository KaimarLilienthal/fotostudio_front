<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col">
                <h1>Tallinna Fotostuudiod</h1>
            </div>
        </div>
        <div @keydown.enter="sign" class="row mb-5 justify-content-center">
            <div class="col col-3">

                <form @submit.prevent="sign">
                    <div class="mb-3">
                        <label for="exampleInputUserName" class="form-label">Kasutajanimi</label>
                        <input v-model="newUser.username" type="username" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail" class="form-label">E-mail</label>
                        <input v-model="newUser.email" type="email" class="form-control" id="exampleInputEmail">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Salasõna</label>
                        <input v-model="newUser.password" type="password" class="form-control"
                               id="exampleInputPassword1">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword2" class="form-label">Salasõna uuesti </label>
                        <input v-model="password1" type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="mb-3 form-check">
                        <input v-model="terms" type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">
                            Nõustun <a @click="conditions" href="#">kasutajatingimustega</a>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-dark">Registreeru</button>
                </form>
            </div>
        </div>
    </div>
    <SuccessModal :message="successMessage" ref="successModalRef" @event-success="handleSuccessMessage"/>
    <DangerModal :message="errorResponse.message" ref="dangerModalRef" @event-danger="handleDangerMessage"/>
    <SuccessAfterModal :message="successMessage" ref="successAfterModalRef" @event-after-success="pushAfterRegistration"/>
</template>

<script>
import router from "@/router";
import DangerModal from "@/components/modal/alertmodals/DangerModal.vue";
import SuccessModal from "@/components/modal/alertmodals/SuccessModal.vue";
import SuccessAfterModal from "@/components/modal/alertmodals/SuccessAfterModal.vue";

export default {
    name: "RegisterView",
    components: {SuccessModal, DangerModal, SuccessAfterModal},
    data() {
        return {

            terms: false,
            password1: '',
            newUser: {
                username: '',
                password: '',
                email: '',
            },
            errorResponse: {
                message: '',
                errorCode: 0
            },
            successMessage: ''


        }
    },
    methods: {
        resetAllFields: function () {
            this.password1 = ''
            this.newUser.email = ''
            this.newUser.password = ''
            this.newUser.username = ''
            this.terms = false
        }, sign() {
            if (this.newUser.email == '' || this.newUser.username == '' || this.newUser.password == '' || this.password1 == '') {
                this.successMessage = 'Palun täida kõik väljad!'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            } else if (this.newUser.password != this.password1) {
                this.newUser.password = ''; // Clear the password field
                this.password1 = ''; // Clear the password confirmation field
                this.successMessage = 'Paroolid ei ühti!'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            } else if (this.terms == false) {
                this.successMessage = 'Nõustu kasutajatingimustega!'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            } else {

                this.$http.post("/user", this.newUser
                ).then(response => {
                    this.successMessage = 'Kasutaja registreeritud, logi sisse'
                    this.$refs.successAfterModalRef.$refs.modalTemplateRef.openModal();
                }).catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 444) {
                        this.message = this.errorResponse.message
                        this.$refs.dangerModalRef.$refs.modalTemplateRef.openModal()
                        this.handleDangerMessage()
                    } else {
                        router.push({name: 'errorRoute'})
                    }
                })

            }
        },
        conditions() {
            this.successMessage = 'Kasuta sõbralikult'
            this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
        },
        handleSuccessMessage() {

        },
        handleDangerMessage() {
            this.resetAllFields();
        },
        pushAfterRegistration(){
            router.push({name: 'loginRoute'})
        }


    }
}
</script>

