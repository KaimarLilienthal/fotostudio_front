import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import "@/assets/my-style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, fas, faR } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Add the imported icons to the library
library.add(faUserSecret, fas, faR, far)

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

// import { createApp } from 'vue'
// import VueGoogleMaps from '@fawmi/vue-google-maps'
//
// const app = createApp(App);
// app.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyDD7N6ngc8Hgb0IFkfd3vzyy8Vd0rSUE7g',
//     },
// }).mount('#app')

