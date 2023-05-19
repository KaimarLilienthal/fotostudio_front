<template>
    <h1>Stuudio</h1>
    <button @click="postAtmLocation" type="submit">Saada</button>
</template>

<script>
export default {
    name: "StudioGeneralView",
    data() {
        return {
            studioName:'',

            userId: sessionStorage.getItem('userId'),
            studio: {
                ownerUserId: 3,
                studioName: 'Photostuudio',
                website: 'www.pärisasi.com',
                imageData: '',
                districtId: 3,
                address: 'Toominga pst.666',
                longtitude: 0,
                latitude: 0
            }



        }
    },
    methods: {
        postAtmLocation() {
            this.$http.post('/studios/general', this.studio
            ).then(response => {
                // this.successMessage = 'Pangaautomaadi asukoht "' + this.atmLocation.locationName + '" lisatud :)'
                // this.resetAllFields();
            }).catch(error => {
                // this.errorResponse = error.response.data
                alert('post not sucessfull')
            })
        },
    }
}
</script>

