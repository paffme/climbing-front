<template>
  <b-tag type="is-info">
    {{ stateRound[state] }}
    (id: {{ roundId }})
  </b-tag>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RawStateRound, StateRound } from '~/definitions'

@Component
export default class LabelState extends Vue {
  @Prop(String) state!: RawStateRound
  @Prop(Number) roundId!: number

  stateRound = StateRound
}
</script>

<style scoped></style>
