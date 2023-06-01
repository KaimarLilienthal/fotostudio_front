<template>

    <div class="container col-6">
        <div class="row mb-5">
            <div class="col">
                <h1>{{ studioName }}</h1>
            </div>
        </div>
        <div class="row mb-5">
            <div class="col">
                <h3>Broneeri</h3>
            </div>
        </div>
        <div class="row mb-5 col-12">
            <div class="col col-7">
                <StudioExtrasSelection ref="studioExtrasSelectionRef" :studio-id="studioId"/>
            </div>

            <div class="col col-3">
                <div><h3> Kuupäeva valik</h3></div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Algus</span>
                    <input v-model="bookingRequest.date" @change="startDateChange" type="date" id="startDateInput"
                           class="form-control"
                           aria-describedby="basic-addon1">
                </div>

            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col col-4">
                <StudioTimesSelection ref="studioTimesSelectionRef" :studio-id="studioId" :selected-date="bookingRequest.date"
                                      @event-emit-times-are-available="setTimesAreAvailable"/>


            </div>
        </div>
        <div class="col mt-5">
        <button @click="navigateToStudiosView" type="button" class="btn btn-dark">Tagasi</button> <button v-if="timesAreAvailable" @click="postBookingRequest" type="button" class="btn btn-dark">Broneeri</button>
        </div>

    </div>


</template>

<script>
import router from "@/router";
import {useRoute} from "vue-router";
import StudioExtrasSelection from "@/views/StudioExtrasSelection.vue";
import StudioTimesSelection from "@/views/StudioTimesSelection.vue";


export default {
    name: "UserStudioBookingView",
    components: {StudioTimesSelection, StudioExtrasSelection},

    data() {
        return {

            timesAreAvailable: false,
            studioName: String(useRoute().query.studioName),
            studioId: Number(useRoute().query.studioId),
            studioExtras: [
                {
                    extraId: 0,
                    extraName: '',
                    extraPrice: 0,
                    isSelected: false
                }
            ],
            bookingRequest: {

                date: '',
                studioExtras: [
                    {
                        extraId: 0,
                        extraName: '',
                        extraPrice: 0,
                        isSelected: false
                    }
                ],
                selectedTimes: [
                    {
                        startHour: 0,
                        isSelected: false
                    }
                ]

            }
        }
    },

    methods: {
        startDateChange() {
            this.$refs.studioTimesSelectionRef.getStudioTimesFromBackend()
        },
        navigateToUserStudioPaymentView(bookingId) {
            router.push({name: 'paymentRoute', query: {studioId: this.studioId, studioName: this.studioName, bookingId: bookingId}})
        },
        navigateToStudiosView(studioId) {
            router.push({name: 'studiosRoute', query: {studioId: studioId}})
        },

        postBookingRequest: function () {
            this.bookingRequest.studioExtras = this.$refs.studioExtrasSelectionRef.getStudioExtras()
            this.bookingRequest.selectedTimes = this.$refs.studioTimesSelectionRef.getStudioTimes()
            this.$http.post("/booking/studio-booking", this.bookingRequest, {
                    params: {
                        studioId: this.studioId
                    }
                }
            ).then(response => {
                let bookingId = response.data
                this.navigateToUserStudioPaymentView(bookingId)
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },

        setDateAsToday() {
            this.bookingRequest.date = new Date().toISOString().slice(0, 10);
        },

        setTimesAreAvailable(timesAreAvailable) {
            this.timesAreAvailable = timesAreAvailable
        }

    },
    beforeMount() {
        this.setDateAsToday()
    }
}
</script>

