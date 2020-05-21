<template>
  <b-notification :closable="false">
    <div class="content is-flex alert">
      <span class="subtitle">Vous n'avez ajouter aucun round</span>
      <b-button v-on:click=" $emit('createRound')">Ajouter round</b-button>
    </div>
  </b-notification>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BoulderingLimitedRounds, TypeBoulderingRound } from '~/definitions'

@Component
export default class BouldersEmpty extends Vue {
}
</script>

<style scoped>
.alert {
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
