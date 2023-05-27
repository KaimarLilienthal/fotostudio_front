<template>
    <Modal ref="modalRef" close-button-name="Ei">
        <template #header>
            Kustuta stuudio
        </template>
        <template #body>
            Kas soovid stuudio kustutada?
        </template>

        <template #footer>
            <button @click="executeLogout" type="button" class="btn btn-primary">Jah</button>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: 'DeleteModal',
    components: {Modal},
    methods: {
        executeLogout() {
            this.$refs.modalRef.closeModal()
            this.$emit('event-update-studio-status')
            router.push({name: 'userStudiosRoute'})
        },
    }
}
</script>