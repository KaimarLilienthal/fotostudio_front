<template>
    <select v-model="selectedDistrictId" @change="emitSelectedDistrictId" class="form-select"
            aria-label="Default select example">
        <option selected value="0">--Kõik linnaosad--</option>
        <option v-for="district in districts" :key="district.districtId" :value="district.districtId">{{ district.districtName }}</option>
    </select>
</template>

<script>
export default {
    name: "DistrictDropdown",
    data() {
        return {
            selectedDistrictId: '0',
            districts: [
                {
                    districtId: 0,
                    districtName: ''
                }
            ]
        }
    },
    methods: {
        emitSelectedDistrictId(){
            this.$emit('event-emit-selected-district-id', Number(this.selectedDistrictId))
        },


        getDistricts() {
            this.$http.get("/districts")
                .then(response => {
                    this.districts = response.data
                })
                .catch(() => router.push({name: 'errorRoute'}))
        },
        setSelectedDistrictId(districtId){
            this.selectedDistrictId = districtId;
        }
    },
    beforeMount() {
        this.getDistricts()
    }
}
</script>

