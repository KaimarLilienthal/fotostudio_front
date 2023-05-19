<template>
    <img v-if="imageData === ''" src="../assets/default-photo-studio.jpg" class="img-thumbnail"/>
    <img v-else :src="imageData" class="img-thumbnail">
</template>
<script>
export default {
    name: 'StudioImage',
    props: {
        imageData: String
    }
}
</script>