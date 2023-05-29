<template>

    <Modal ref="modalRef" close-button-name="Sulge">
        <template #header>
            Stuudio andmed
        </template>
        <template #body>

            <div class="container">
                <div class="row">
                    <div class="col">
                        Stuudio lisad
                    </div>
                    <div class="col">
                        pilt
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                        Valgustus
                    </div>
                    <div class="col">

                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                        SoftBox
                    </div>
                    <div class="col">

                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                        Taustad
                    </div>
                    <div class="col">

                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                        Kangad
                    </div>
                    <div class="col">

                    </div>
                </div>
            </div>

        </template>

    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: 'StudioPreviewModal',
    components: {Modal},
    data: function () {
        return {
            studioInfo:{
                studioName: '',
                website: '',
                imageData: '',
                address: '',
                longtitude: 0,
                latitude: 0,
                extras:[
                    {
                        studioId: 0,
                        extraId: 0,
                        extraName: '',
                        extraPrice: 0
                    }
                ]
            }
        }
    },
    methods: {
        getStudioInfo: function (studioId) {
            this.$http.get("/studio/user-studio", {
                    params: {
                        studioId: studioId,
                    }
                }
            ).then(response => {
                this.studioInfo = response.data
                this.getExtras(studioId)
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })

        },

        getExtras: function (studioId) {
            this.$http.get("/extra/studio-extras", {
                    params: {
                        studioId: studioId,
                    }
                }
            ).then(response => {
                this.studioInfo.extras = response.data
                this.$refs.modalRef.openModal()
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },

        closePreviewModal: function () {
            this.$refs.modalRef.closeModal()
        },

    }
}
</script>