<template>
  <div class="content is-flex alert">
    <span class="subtitle">
      Aucun tour
    </span>
    <b-button type="is-info" @click="$emit('createRound')">
      Ajouter tour
    </b-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class BouldersEmpty extends Vue {}
</script>

<style scoped>
.alert {
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
