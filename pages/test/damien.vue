<template>
  <button-select-local-file :fileSelected="null">

  </button-select-local-file>
<!--  <BouldersPicture
    :boulder-id="0"
    :competition="{ id: 0, name: 'Competition Damien' }"
    :round="{ id: 0, boulderIds: [0, 1, 2, 3, 4] }"
  />-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BouldersPicture from '~/components/BouldersSettingsComponent/BouldersPicture.vue'
import ButtonSelectLocalFile from '~/components/Button/ButtonSelectLocalFile.vue'

@Component({ components: { BouldersPicture, ButtonSelectLocalFile} })
export default class damien extends Vue {}
</script>

<style scoped></style>
