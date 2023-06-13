<template>
    <Modal ref="modalRef" close-button-name="Ei" class="btn btn-dark">
        <template #header>
            Kustuta stuudio
        </template>
        <template #body>
            Kas soovid stuudio kustutada?
        </template>

        <template #footer>
            <button @click="executeLogout" type="button" class="btn btn-dark">Jah</button>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: 'StudioDeleteModal',
    components: {Modal},
    methods: {
        executeLogout() {
            this.$refs.modalRef.closeModal()
            this.$emit('event-update-studios-list')
            router.push({name: 'studiosRoute'})
        },
    }
}
</script>