<template>
    <div>
        <input type="file" @change="handleImage" accept="image/x-png,image/jpeg,image/gif">
    </div>
</template>

<script>
export default {
    name: 'ImageInput',
    data() {
        return {
            imageData: ''
        }
    },
    methods: {
        handleImage(event) {
            const selectedImage = event.target.files[0];
            this.emitBase64(selectedImage);
        },

        emitBase64(fileObject) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imageData = reader.result;
                this.$emit('event-emit-base64', this.imageData)
            };
            reader.onerror = function (error) {
                alert(error);
            }
            reader.readAsDataURL(fileObject);
        },

        // setImageData64(imageData) {
        //     this.imageData = imageData
        // },
    }
}
</script>