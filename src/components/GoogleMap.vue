<template>
    <div>
        <div id="map"></div>
    </div>
</template>

<script>
export default {
    name: "GoogleMap",
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {
            // Get latitude and longitude from your data or API response
            const latitude = 37.7749;
            const longitude = -122.4194;

            // Create a map instance
            const map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: latitude, lng: longitude },
                zoom: 12
            });

            // Add a marker to the map
            const marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map
            });
        }
    }
};
</script>

<style>
#map {
    width: 100%;
    height: 400px;
}
</style>
