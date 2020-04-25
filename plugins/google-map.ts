import Vue from 'vue'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDGOAsrKtH_LGnLYh0PkGlCMiy4H5TZyss',
    libraries: 'places'
  }
})
