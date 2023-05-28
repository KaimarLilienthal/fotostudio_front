<template>
    <select v-model="selectedExtraId" @change="emitSelectedExtraId" class="form-select"
            aria-label="Default select example">
        <option selected disabled value="0">--Vali teenus--</option>
        <option v-for="extra in extras" :key="extra.id" :value="extra.id">{{ extra.name }}</option>
    </select>
</template>

<script>
export default {
    name: "ExtraDropdown",
    data() {
        return {
            selectedExtraId: '0',
            extras: [
                {
                    id: 0,
                    name: ''
                }
            ]
        }
    },
    methods: {
        emitSelectedExtraId(){
            this.$emit('event-emit-selected-extra-id', Number(this.selectedExtraId))
        },


        getExtras() {
            this.$http.get("/extra/all")
                .then(response => {
                    this.extras = response.data
                })
                .catch(() => router.push({name: 'errorRoute'}))
        },
        setSelectedDistrictId(districtId){
            this.selectedExtraId = districtId;
        }
    },
    beforeMount() {
        this.getExtras()
    }
}
</script>

