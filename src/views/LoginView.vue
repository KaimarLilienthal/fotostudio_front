<template>


    <div class="container">
        <div class="row mb-5">
            <div class="col">
                <h1>Tallinna Fotostuudiod</h1>
            </div>
        </div>
        <div @keydown.enter="login" class="row mb-5 justify-content-center">
            <div class="col col-3">

                <div class="mb-3">
                    <label for="username" class="form-label">Kasutajanimi</label>
                    <input v-model="username" class="form-control" id="username" aria-describedby="emailHelp">

                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Parool</label>
                    <input v-model="password" type="password" class="form-control" id="password">
                    <div id="emailHelp" class="form-text">Kasuta kindlasti tähti ja numbreid</div>
                </div>
                <button @click="login" type="submit" class="btn btn-dark">Logi sisse</button>
                <div class="card-body mt-1">
                    <a href="login/reset" class="card-link">Parool Ununes</a>
                    <a href="login/register" class="card-link m-3">Registreeru</a>
                </div>


            </div>
        </div>

    </div>
    <SuccessModal :message="successMessage" ref="successModalRef" @event-success="handleSuccessMessage"/>
    <DangerModal :message="errorResponse.message" ref="dangerModalRef" @event-danger="handleDangerMessage"/>

</template>

<script>

import router from "@/router";
import DangerModal from "@/components/modal/alertmodals/DangerModal.vue";
import SuccessModal from "@/components/modal/alertmodals/SuccessModal.vue";

export default {
    name: 'LoginView',
    components: {SuccessModal, DangerModal},
    data() {
        return {
            successMessage: '',
            message: '',
            username: '',
            password: '',
            loginResponse: {
                userId: 0,
                roleName: ''
            },
            errorResponse: {
                message: '',
                errorCode: 0
            }
        }
    },
    methods: {
        login() {
            this.message = ''
            if (this.username === '' || this.password === '') {
                this.successMessage = 'Kõik väljad tuleb täita!'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            } else {
                this.sendLoginRequest();
            }

        },
        sendLoginRequest: function () {
            this.$http.get("/login", {
                    params: {
                        username: this.username,
                        password: this.password
                    }
                }
            ).then(response => {
                this.loginResponse = response.data
                sessionStorage.setItem('userId', this.loginResponse.userId)
                sessionStorage.setItem('roleName', this.loginResponse.roleName)
                this.$emit('event-update-nav-menu')

                if (this.loginResponse.roleName === "studio") {
                    router.push({name: 'userStudiosRoute'})
                } else {
                    // todo: vaja suunata adminni teele
                    router.push({name: 'userStudiosRoute'})
                }


            }).catch(error => {
                this.errorResponse = error.response.data
                if (this.errorResponse.errorCode === 111) {
                    this.message = this.errorResponse.message
                    this.$refs.dangerModalRef.$refs.modalTemplateRef.openModal()
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
        },
        handleSuccessMessage() {

        },
        handleDangerMessage() {
            this.username = ''
            this.password = ''
        }
    }
}

</script>

