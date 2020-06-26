<template>
  <div>
    <div class="header-competition">
      <span class="subtitle"> {{ round.name }}</span>
      <b-tag :class="[tagStateColor, 'is-pulled-right']">
        {{ rawStateRound[round.state] }}
      </b-tag>
    </div>
    <ul>
      <li>
        <b>Date de début : </b>
        <span>{{ competition.startDate | formatDate }}</span>
      </li>
      <li>
        <b>Date de fin : </b>
        <span>{{ competition.endDate | formatDate }}</span>
      </li>
      <li>
        <b>Addresse : </b>
        <span>{{ competition.address }}</span>
        <span>{{ competition.postalCode }}</span>
        <span>{{ competition.city }}</span>
        <span
          class="pointer has-text-info"
          @click="GoogleMapModalOpen = !GoogleMapModalOpen"
          >Voir la carte</span
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BoulderingLimitedRounds, RawStateRound } from '~/definitions'

@Component
export default class RoundDetails extends Vue {
  @Prop(Object) round!: BoulderingLimitedRounds

  rawStateRound = RawStateRound
  tagStateColor = 'is-success'
}
</script>

<style scoped>
.header-competition {
  display: flex;
  justify-content: space-between;
}
</style>
