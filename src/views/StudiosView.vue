<template>
    <div class="home">
        <div class="container">
            <div class="row mb-5">
                <div class="col">
                    <h1>Tallinna Fotostuudiod</h1>
                </div>
            </div>
        </div>

    </div>
    <div class="container">
        <div class="row">
            <div class="col col-2">
                <label for="basic-url" class="form-label">Vali linnaosa</label>

                <DistrictDropdown ref="districtDropdownRef" @event-emit-selected-district-id="setSelectedDistrictId"/>
            </div>
            <div class="col">
                <div class="container">
                    <div class="row mb-3">
                        <div class="col">
                            <h2 @click="activateModal">Photoroom</h2>
                        </div>
                        <div class="col">
                            <button @click="" type="button" class="btn btn-primary">broneeri</button>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row mb-3">
                        <div class="col">
                            <h2>Stuudio35</h2>
                        </div>
                        <div class="col">
                            <button @click="" type="button" class="btn btn-primary">broneeri</button>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row mb-3">
                        <div class="col">
                            <h2>Tulbifoto</h2>
                        </div>

                        <div class="col">
                            <button @click="" type="button" class="btn btn-primary">broneeri</button>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row mb-3">
                        <div class="col">
                            <h2>Colibri</h2>
                        </div>
                        <div class="col">
                            <button @click="" type="button" class="btn btn-primary">broneeri</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import DistrictDropdown from "@/components/DistrictDropdown.vue";
import router from "@/router";

export default {
    name: "StudiosView",
    components: {DistrictDropdown},
    methods: {
        activateModal(){
            alert('Modal hakkas tööle')

        }
}
}
</script>