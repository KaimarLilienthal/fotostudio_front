<template>
    <Modal ref="modalRef" close-button-name="Ei" class="btn btn-dark">
        <template #body>
            Kas soovid lahtiolekuaja kustutada?
        </template>
        <template #footer>
            <button @click="executeAvailabilityDelete" type="button" class="btn btn-dark">Jah</button>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: 'AvailabilityDeleteModal',
    components: {Modal},
    methods: {
        executeAvailabilityDelete() {
            this.$refs.modalRef.closeModal()
            this.$emit('event-delete-availability')

        },
    }
}
</script>

<style scoped>

</style>