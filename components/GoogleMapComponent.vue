<template>
  <div class="card">
    <GmapMap
      :center="{ lat: maps.lat, lng: maps.lng }"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 100%; height: 100vh;"
    >
      <GmapMarker
        :position="{ lat: maps.lat, lng: maps.lng }"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APICompetition, Competition } from '~/definitions'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component
export default class GoogleMapComponent extends Vue {
  @Prop(Object) competition!: APICompetition

  maps = {
    lat: 10,
    lng: 12
  }

  async created() {
    try {
      await this.getLatLng(this.competition)
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async getLatLng(competition: Competition) {
    try {
      const response: any = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${competition.address}+${competition.city}+${competition.postalCode}&key=AIzaSyCYI4Fwja8HZVbqP-Te_sf0FR4I4PeF7mY`
      )
      const data = await response.json()
      this.maps.lat = data.results[0].geometry?.location?.lat
      this.maps.lng = data.results[0].geometry?.location?.lng
    } catch (err) {
      console.log('getLatLng ERROR', err)
    }
  }
}
</script>

<style scoped></style>
