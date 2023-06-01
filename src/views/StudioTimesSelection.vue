<template>
    <h1>{{ headerTitle }}</h1>
    <div class="row" v-for="studioTime in studioTimes" :key="studioTime.startHour">
        <div class="col">
            <div>{{ studioTime.startHour }}:00-{{ studioTime.startHour + 1 }}:00</div>
        </div>
        <div class="col">
            <input v-model="studioTime.isSelected" type="checkbox">
        </div>
    </div>
</template>
<script>
import router from "@/router";

export default {
    name: 'StudioTimesSelection',
    props: {
        studioId: Number,
        selectedDate: String
    },
    data() {
        return {
            headerTitle: '',
            timesAreAvailable : false,
            studioTimes: [
                {
                    startHour: 0,
                    isSelected: false
                }
            ]
        }
    },

    methods: {
        getStudioTimesFromBackend: function () {
            this.$http.get("/booking/availability/studio-times", {
                    params: {
                        studioId: this.studioId,
                        selectedDate: this.selectedDate
                    }
                }
            ).then(response => {
                this.studioTimes = response.data
                this.timesAreAvailable = this.studioTimes.length > 0
                this.$emit('event-emit-times-are-available', this.timesAreAvailable)
                if (this.timesAreAvailable){
                    this.headerTitle = 'Saadaval tunnid:'
                } else {
                    this.headerTitle = 'Selleks kuupäevaks pole saadaval ühtegi vaba aega!'
                }
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },

        getStudioTimes() {
            return this.studioTimes
        },


        getTimesAreAvailable() {
            return this.timesAreAvailable;
        },



    },
    beforeMount() {
        this.getStudioTimesFromBackend()
    }
}
</script>