<template>
  <ul>
    <li>ID : {{ roundInformation.id }}</li>
    <li>Sex : {{ roundInformation.sex }}</li>
    <li>Catégorie : {{ roundInformation.category }}</li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BoulderingLimitedRounds, TypeBoulderingRound } from '~/definitions'

@Component
export default class BouldersDisplay extends Vue {
  @Prop(String) qualificationRound!: TypeBoulderingRound
  @Prop(Object) roundInformation!: BoulderingLimitedRounds
}
</script>

<style scoped></style>
