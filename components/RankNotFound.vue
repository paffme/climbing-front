<template>
  <section class="section">
    <div class="content has-text-grey has-text-centered">
      <p>
        <b-icon icon="emoticon-sad" size="is-large" />
      </p>
      <p>Aucun classement n'a été trouvée</p>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class RankNotFound extends Vue {}
</script>

<style scoped></style>
