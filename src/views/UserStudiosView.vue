<template>
    <div class="container">
        <div class="row mb-3">
            <div class="col">
                <h1>Minu stuudiod</h1>
            </div>

        </div>
        <div class="row mb-3">
            <div class="col">
                <button type="button" class="btn btn-primary">Lisa stuudiod</button>
            </div>

        </div>
        <div class="row">
            <div class="col">

                <table class="table table-dark table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Stuudio</th>
                        <th scope="col">Aadress</th>
                        <th scope="col">Pilt</th>
                        <th scope="col">Nupp</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">Tulbi Fotostuudio</th>
                        <td>Tulbi 12</td>
                        <td><img src="" alt=""></td>
                        <td><font-awesome-icon :icon="['fas', 'pen-to-square']" /></td>
                    </tr>
                 
                    </tbody>
                </table>


            </div>

        </div>

    </div>

</template>

<script>
export default {
    name: "UserStudiosView",


    data() {
        return {

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
    methods:{
        getStudios: function () {
            this.$http.get("/user-studios", {
                    params: {
                        userId: this.someDataBlockVariable1
                    }
                }
            ).then(response => {
                const responseBody = response.data

            }).catch(error => {
                const errorResponseBody = error.response.data
            })
        },
    }

}
</script>