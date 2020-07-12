<template>
  <b-notification :closable="false">
    <div class="content">
      <b-icon icon="alert-circle has-text-danger"> </b-icon>
      <span class="subtitle">
        Danger zone
      </span>
    </div>
    <b-button type="is-gray" expanded>
      Supprimer cette compétition
    </b-button>
  </b-notification>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class BtnDeleteCompetition extends Vue {}
</script>

<style scoped></style>
