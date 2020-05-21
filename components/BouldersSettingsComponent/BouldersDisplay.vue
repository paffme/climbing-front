<template>
  <div class="card">
    <header class="card-header">
      <b-icon
        class="icon"
        type="is-info"
        icon="square-edit-outline"></b-icon>
      <p class="card-header-title">
        {{ qualificationRound }}
      </p>
      <b-icon
        @click.native="$emit('delete', round.id)"
        icon="delete"
        class="icon"
        type="is-danger"></b-icon>
    </header>
    <div class="card-content">
      <div class="content">
        <ul>
          <li>ID : {{ round.id }}</li>
          <li>Sex : {{ round.sex }}</li>
          <li>Catégorie : {{ round.category }}</li>
        </ul>
      </div>
    </div>
    <footer class="card-footer">
      <span class="card-footer-item has-text-white">
        <b-button type="is-info">Gestion des groupes et blocs</b-button>
      </span>
    </footer>
  </div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BoulderingLimitedRounds, TypeBoulderingRound } from '~/definitions'

@Component
export default class BouldersDisplay extends Vue {
  @Prop(String) qualificationRound!: TypeBoulderingRound
  @Prop(Object) round!: BoulderingLimitedRounds
}
</script>

<style scoped>
  .icon {
    cursor: pointer;
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
