<template>
    <div class="container col-6">
        <div class="row mb-5">
            <div class="col">
                <h2>Broneeringu kinnitus</h2>
            </div>
        </div>
        <div class="col">
            <h4>Valitud stuudio ja aeg</h4>
        </div>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <p class="card-text; text-bg-dark">{{ studioName }}</p>
                <p class="card-text">{{booking.bookingDate}}</p>
                <p class="card-text; text-bg-dark">Kellaajad</p>
                <p v-for="hour in booking.hours" class="card-text">{{ hour.startHour }}:00-{{ hour.startHour + 1 }}:00</p>
                <p class="card-text; text-bg-dark">Lisateenused</p>
                <p v-for="extra in booking.extraBookings" class="card-text">{{ extra.extraName }}   €{{ extra.extraPrice }}</p>
                <p class="card-text">Tunnihind: €{{booking.houPrice}}</p>
                <p class="card-text">Hind kokku: €{{ booking.totalPrice }}</p>
            </div>
        </div>
        <div class="row">
            <div class="mt-5">
                <h2>Broneeringu andmed</h2>
            </div>
        </div>
        <div class="row mt-3 justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">

                    <input v-model="customer.customerName" type="text" class="form-control" placeholder="Ees-ja perekonnanimi" aria-label="Username"
                           aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">

                    <input v-model="customer.customerPhone" type="text" class="form-control" placeholder="Telefon" aria-label="Username"
                           aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">

                    <input v-model="customer.customerEmail" type="text" class="form-control" placeholder="E-mail" aria-label="Username"
                           aria-describedby="basic-addon1">
                </div>
                <div class="mt-5">

                    <input v-model="terms" type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">
                        Nõustun <a @click="" href="#">kasutajatingimustega</a>
                    </label>
                </div>
                <div class="mt-3">
                    <button @click="navigateToUserBookingView" type="submit" class="btn btn-dark">Tagasi</button>
                    <button @click="postCustomerInfo" type="submit" class="btn btn-dark">Broneeri</button>

                </div>
            </div>
        </div>
    </div>
    <SuccessModal :message="successMessage" ref="successModalRef" @event-success="handleSuccessMessage"/>
    <DangerModal :message="errorMessage" ref="dangerModalRef" @event-danger=""/>
</template>

<script>
import DistrictDropdown from "@/components/DistrictDropdown.vue";
import StudioImage from "@/components/StudioImage.vue";
import router from "@/router";
import {useRoute} from "vue-router";
import SuccessPaymentModal from "@/components/modal/alertmodals/SuccessPaymentModal.vue";
import SuccessModal from "@/components/modal/alertmodals/SuccessModal.vue";
import DangerModal from "@/components/modal/alertmodals/DangerModal.vue";


export default {
    name: "UserStudioPaymentView",
    components: {DangerModal, SuccessModal, SuccessPaymentModal, DistrictDropdown, StudioImage},


    data() {
        return {
            errorMessage: '',
            terms: false,
            successMessage: '',
            studioId: Number(useRoute().query.studioId),
            studioName: useRoute().query.studioName,
            bookingId: Number(useRoute().query.bookingId),
            booking: {
                bookingDate: '',
                houPrice: 0,
                totalPrice: 0,
                hours: [
                    {
                        startHour: 0
                    }
                ],
                extraBookings: [
                    {
                        extraName: '',
                        extraPrice: 0
                    }
                ]
            },
            customer: {
                customerName: '',
                customerPhone: '',
                customerEmail: ''
            }

        }
    },
    methods: {
        getBookingInformation: function () {
            this.$http.get("/booking/payment", {
                    params: {
                        bookingId: this.bookingId
                    }
                }
            ).then(response => {
                this.booking = response.data

            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        navigateToUserBookingView() {
            router.push({name: 'bookingRoute'})
        },

        postCustomerInfo: function () {
            if (this.customer.customerName === '' || this.customer.customerPhone === ''|| this.customer.customerEmail === ''){
                this.errorMessage = 'Nime, telefoni ja e-maili täitmine on kohustuslikud!'
                this.$refs.dangerModalRef.$refs.modalTemplateRef.openModal()
            } else if(this.terms === false) {
                this.errorMessage = 'Nõustu tingimustega'
                this.$refs.dangerModalRef.$refs.modalTemplateRef.openModal()
            } else {
            this.$http.post("/customer", this.customer, {
                    params: {
                        bookingId: this.bookingId
                    }
                }
            ).then(response => {
                this.successMessage = 'Teie broneering on registreeritud!'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()

            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
            }
        },
        handleSuccessMessage(){
            router.push({name: 'studiosRoute'})
        }
    },
    beforeMount() {
        this.getBookingInformation()
    }


}
</script>

