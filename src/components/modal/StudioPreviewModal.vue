<template>

    <Modal ref="modalRef" close-button-name="Sulge">
        <template #header>
            Stuudio lisateenused
        </template>
        <template #body>
            <div  class="container">
                <div v-for="extra in studioInfo.extras" :key="extra.id" class="row">
                    <div class="col">
                        {{ extra.extraName }}
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