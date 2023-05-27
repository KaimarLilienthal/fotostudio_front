<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col">
                <h1>Tallinna Fotostuudiod</h1>
            </div>
        </div>
        <div @keydown.enter="sign" class="row mb-5 justify-content-center">
            <div class="col col-3">

                <form @submit.prevent="sign">
                    <div class="mb-3">
                        <label for="exampleInputUserName" class="form-label">Kasutajanimi</label>
                        <input v-model="newUser.username" type="username" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail" class="form-label">E-mail</label>
                        <input v-model="newUser.email" type="email" class="form-control" id="exampleInputEmail">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Salasõna</label>
                        <input v-model="newUser.password" type="password" class="form-control"
                               id="exampleInputPassword1">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword2" class="form-label">Salasõna uuesti </label>
                        <input v-model="password1" type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="mb-3 form-check">
                        <input v-model="terms" type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">
                            Nõustun <a @click="conditions" href="#">kasutajatingimustega</a>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-dark">Registreeru</button>
                </form>
            </div>
        </div>
    </div>
    <SuccessModal :message="successMessage" ref="successModalRef" @event-success="handleSuccessMessage"/>
    <DangerModal :message="errorResponse.message" ref="dangerModalRef" @event-danger="handleDangerMessage"/>
</template>

<script>
import router from "@/router";
import DangerModal from "@/components/modal/alertmodals/DangerModal.vue";
import SuccessModal from "@/components/modal/alertmodals/SuccessModal.vue";

export default {
    name: "RegisterView",
    components: {SuccessModal, DangerModal},
    data() {
        return {

            terms: false,
            password1: '',
            newUser: {
                username: '',
                password: '',
                email: '',
            },
            errorResponse: {
                message: '',
                errorCode: 0
            },
            successMessage: ''


        }
    },
    methods: {
        resetAllFields: function () {
            this.password1 = ''
            this.newUser.email = ''
            this.newUser.password = ''
            this.newUser.username = ''
            this.terms = false
        }, sign() {
            if (this.newUser.email == '' || this.newUser.username == '' || this.newUser.password == '' || this.password1 == '') {
                this.successMessage = 'Palun täida kõik väljad!'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            } else if (this.newUser.password != this.password1) {
                this.newUser.password = ''; // Clear the password field
                this.password1 = ''; // Clear the password confirmation field
                this.successMessage = 'Paroolid ei ühti!'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            } else if (this.terms == false) {
                this.successMessage = 'Nõustu kasutajatingimustega!'
                this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
            } else {

                this.$http.post("/user", this.newUser
                ).then(response => {
                    this.successMessage = 'Kasutaja registreeritud, logi sisse'
                    this.$refs.successModalRef.$refs.modalTemplateRef.openModal()
                    router.push({name: 'loginRoute'})
                }).catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 444) {
                        this.message = this.errorResponse.message
                        this.$refs.dangerModalRef.$refs.modalTemplateRef.openModal()
                        this.handleDangerMessage()
                    } else {
                        router.push({name: 'errorRoute'})
                    }
                })

            }
        },
        conditions() {
            alert('Kasutustingimused\n' +
                'Kõikidelt veebilehel eksponeeritud praktikutelt ootame teemakohaseid artikleid, kui nad neid soovivad kirjutada. Kindlasti annab see juurde nähtavust ja kredibiilsust, kuid terapeut.ee võtab endale õiguse artikleid redigeerida ning mitte avaldada artikleid, millel on otseselt kommertslik sisu.\n' +
                '\n' +
                'Artiklite puhul, millega kutsutakse üles osalema teemakohastel seminaridel, töötubades või muudel kursustel, on vajalik erikokkulepe.\n' +
                '\n' +
                'Terapeut.ee veebilehel saavad end eksponeerida vaid omal alal diplomeeritud praktikud. Terapeut.ee ei sätesta konkreetseid piiranguid diplomitele (st terapeut.ee ei ütle, et miinimum väljaõpe kestab konkreetne arv aastaid), vaid vaatab igat juhtumit eraldi. Diplomid ning väljaõppe pikkus kuvatakse praktiku profiilil. NB! Terapeut.ee veebilehega liitudes annab soovi avaldanud praktik terapeut.ee meeskonnale loa kontrollida oma diplomi õigsust ning vajadusel kontakteeruda institutsiooniga, kes diplomi väljastas. Terapeut.ee jätab endale õiguse praktiku sooviavaldust liitumiseks mitte rahuldada.\n' +
                '\n' +
                'Terapeut.ee veebikeskkonnas eksponeeritud tekst ja pildi-  ning videomaterjal peab olema sobilik igas vanuses inimestele. St vältida tuleks kohatut alastust, roppusi, alandamist, teiste praktikate maha tegemist jms. Sobimatu materjal ei leia kajastust veebilehel.\n' +
                '\n' +
                'Terapeut.ee veebikeskkonnaga liitumisel kuulub tasumisele ühekordne liitumistasu summas 30€ ning muud tasud vastavalt valitud paketile.\n' +
                '\n' +
                'Terapeut.ee jätab endale õiguse pakettide hindasid muuta. Hinnamuudatusi ei tehta tagasivaatavalt.\n' +
                '\n' +
                'Liituja poolt saadetud uued ning täiendavad andmed (pildimaterjal, videomaterjal, artiklid, kliendi tagasiside jms) vaadatakse üle ning sobivuse korral laetakse üles hiljemalt 5 tööpäeva jooksul.\n' +
                '\n' +
                'Kui terapeut.ee meeskonnale saabub mõne kliendi poolt konkreetse praktiku suhtes kaebekiri, on veebilehel eksponeeritud praktikul kohustus 2 nädala jooksul kirjutada terapeut.ee meeskonnale konkreetse juhtumi suhtes seletav kiri. Selle eesmärk on leida sõbralik lahendus mõlemale osapoolele säilitades seejuures veebilehe terapeut.ee head mainet. Terapeut.ee meeskonnal on õigus olulistel asjaoludel profiili eksponeerimine ühepoolselt lõpetada.\n' +
                '\n' +
                'Terapeut.ee veebilehel on õigus oma keskkonda reklaamida erinevas meedias, et tõsta lehe külastatavust ning tõstatada olulisi teemasid.\n' +
                '\n' +
                'Terapeut.ee veebileht on pidevas täienemises ja iga praktik saab selleks anda oma panuse. Kui praktiseerid mingit meetodit, mida terapeut.ee lehel pole kuvatud, ootame rõõmsalt Sinu informatsiooni, et keskkonda täiendada.\n' +
                '\n' +
                'Kui praktik soovib veebilehel eksponeerida kliendi nõusolekul tema tagasisidet, siis see on äärmiselt oodatud. Terapeut.ee jätab aga endale õiguse üle kontrollida kliendi nõusolekut vältimaks konfidentsiaalsusriski teket.\n' +
                '\n' +
                'Iga veebilehel eksponeeritud praktik saab enda nähtavust tõsta “Nädala terapeudi” rubriigi abil. “Nädala terapeut” rubriik on tasuline ning üks eksponeerimise periood kestab 2 nädalat. Sealsete profiilide eksponeerimisel rakendatakse klassikalist järjekorra printsiipi. Terapeut.ee meeskond annab soovijale teada vabadest aegadest kalendris.\n' +
                '\n' +
                'Veebilehega terapeut.ee liitunu teeb kõik endast olulise, et hoida terapeut.ee keskkonna head mainet.\n' +
                '\n' +
                'Terapeut.ee jätab endale õiguse muuta praktiku profiil teatud perioodiks passiivseks (mitte nähtavaks), kui selgub, et praktik on eksinud siin väljatoodud kasutajatingimuste vastu.')
        },
        handleSuccessMessage() {

        },
        handleDangerMessage() {
            this.resetAllFields();
        }


    }
}
</script>

