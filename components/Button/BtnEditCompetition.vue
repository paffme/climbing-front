<template>
  <b-button
    type="is-info"
    icon-right="tools"
    tag="router-link"
    :to="`/competitions/edit/${competitionId}`"
  >
    Editer cette compétition
  </b-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BtnEditCompetition extends Vue {
  @Prop(Number) competitionId!: number
}
</script>

<style scoped></style>
