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

import router from "@/router";
import ModalTemplate from "@/components/modal/alertmodals/ModalTemplate.vue";

export default {
    name: 'SuccessModal',
    components: {ModalTemplate},
    props: {
        message: String
    },
    methods: {
        executeOk() {
            this.$refs.modalTemplateRef.closeModal()
            this.$emit('event-success')
        },
    }
}
</script>