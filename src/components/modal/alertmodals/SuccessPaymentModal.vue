<template>
    <ModalTemplate ref="modalTemplateRef">
        <template #body>
            {{message}}
        </template>

        <template #footer>
            <button @click="executeOk" type="button" class="btn btn-dark">OK</button>
        </template>
    </ModalTemplate>
</template>

<script>
import ModalTemplate from "@/components/modal/alertmodals/ModalTemplate.vue";

export default {
    name: "SuccessPaymentModal",
    components: {ModalTemplate}
}
</script>

<style scoped>

</style>