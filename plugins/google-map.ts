import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCYI4Fwja8HZVbqP-Te_sf0FR4I4PeF7mY',
    libraries: 'places'
  }
})
