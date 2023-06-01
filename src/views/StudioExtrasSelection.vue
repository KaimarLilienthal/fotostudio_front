<template>
    <h2>Teenuste info</h2>
    <div class="row" v-for="studioExtra in studioExtras" :key="studioExtra.extraId">

        <div class="col d-flex justify-content-center">

        <div class="col-3">
            <div>{{ studioExtra.extraName }} - €{{ studioExtra.extraPrice }}</div>
        </div>
        <div class="col-3">
            <input v-model="studioExtra.isSelected" type="checkbox">
        </div>
        </div>
    </div>
</template>
<script>

import router from "@/router";

export default {
    name: 'StudioExtrasSelection',
    props: {
        studioId: Number
    },
    data() {
        return {
            studioExtras: [
                {
                    extraId: 0,
                    extraName: '',
                    extraPrice: 0,
                    isSelected: false
                }
            ]
        }
    },

    methods: {
        getStudioExtrasFromBackend: function () {
            this.$http.get("/extra/studio-extras", {
                    params: {
                        studioId: this.studioId
                    }
                }
            ).then(response => {
                this.studioExtras = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },

        getStudioExtras() {
            return this.studioExtras
        },


    },
    beforeMount() {
        this.getStudioExtrasFromBackend()
    }
}
</script>