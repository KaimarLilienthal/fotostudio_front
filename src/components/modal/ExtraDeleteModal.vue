<template>
    <Modal ref="modalRef" close-button-name="Ei">
        <template #body>
            Kas soovid lisateenuse kustutada kustutada?
        </template>
        <template #footer>
            <button @click="executeExtraDelete" type="button" class="btn btn-primary">Jah</button>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: 'ExtraDeleteModal',
    components: {Modal},
    methods: {
        executeExtraDelete() {
            this.$refs.modalRef.closeModal()
            this.$emit('event-delete-extra')

        },
    }
}
</script>

<style scoped>

</style>