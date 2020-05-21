<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Nouveau round
      </p>
    </header>
    <div class="content is-flex">
      <b-icon class="icon" @native.click="$emit('createRound')" size="is-large" icon="plus-circle"></b-icon>
    </div>
  </div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BoulderingLimitedRounds, TypeBoulderingRound } from '~/definitions'

@Component
export default class BouldersDisplayEmpty extends Vue {
}
</script>

<style scoped lang="scss">
  @import "~/assets/css/bulma_customize.scss";

  .icon {
    cursor: pointer;
    transition: .2s ease-in;
  }
  .icon:hover {
    color: $primary
  }
  .content {
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .card-header {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .card-header-title {
    text-align: center !important;
  }
</style>
