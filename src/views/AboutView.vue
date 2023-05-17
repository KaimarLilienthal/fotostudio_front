<template>
  <div class="about">
      <button @click="login" type="submit">Test123</button>
  </div>
    <button type="button" class="btn btn-primary">Primary</button>

</template>

<script>

export default {
    name: 'AboutView',
    methods: {
        login: function () {
            this.$http.get("/login", {
                    params: {
                        username: 'kaimar',
                        password: '123'
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

