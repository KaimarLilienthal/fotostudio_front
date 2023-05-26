<template>
    <div class="container">
        <div class="row mb-3">
            <div class="col">
                <h1>Minu stuudiod</h1>
            </div>

        </div>
        <div class="row mb-3">
            <div class="col">
                <button @click="navigateToStudioGeneralView" type="button" class="btn btn-dark">Lisa stuudiod</button>
            </div>

        </div>
        <div class="row">
            <div class="col">

                <table class="table table-dark table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Stuudio</th>
                        <th scope="col">Aadress</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="studio in studios" :key="studio.studioId">
                        <th>{{ studio.studioName }}</th>
                        <td>{{ studio.address }}</td>
                        <td>
                            <div class="img-wrapper">
                                <StudioImage :image-data="studio.imageData"/>
                            </div>
                        </td>
                        <td>{{studio.studioId}}
                            <font-awesome-icon @click="navigateToChangeStudioGeneralView(studio.studioId)" class="hoverable-link" :icon="['fas', 'pen-to-square']"/>
                        </td>
                        <td>
                            <font-awesome-icon @click="sendStudioDeleteRequest(studio.studioId)" class="hoverable-link" :icon="['fas', 'trash']" />
                        </td>


                    </tr>


                    </tbody>
                </table>


            </div>

        </div>

    </div>

</template>

<script>
import router from "@/router";
import StudioImage from "@/components/StudioImage.vue";

export default {
    name: "UserStudiosView",
    components: {StudioImage},


    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            studios: [
                {
                    studioId: 0,
                    studioName: '',
                    address: '',
                    imageData: ''
                }
            ]


        }
    },
    methods: {
        getStudios: function () {
            this.$http.get("/studio/user-studios", {
                    params: {
                        userId: this.userId
                    }
                }
            ).then(response => {
                this.studios = response.data


            }).catch(error => {
                router.push({name: 'errorRoute'})

            })
        },
        navigateToStudioGeneralView(){
            router.push({name: 'studioGeneralRoute', query: {studioId: 0}})
        },
        navigateToChangeStudioGeneralView(studioId){
            router.push({name: 'studioGeneralRoute', query: {studioId: studioId}})
        },

        sendStudioDeleteRequest: function (studioId) {
            this.$http.delete("/studio", {
                params: {
                    studioId: studioId
                }
            })
                .then(response => {
                    alert('Stuudio kustutatud!')
                    window.location.reload();
                })
                .catch(error => {
                    const errorResponseBody = error.response.data
                })
        },

    },
    beforeMount() {
        this.getStudios()
    }

}
</script>