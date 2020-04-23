<template>
  <div class="columns">
    <div class="column is-12">
      <div class="page_header">
        <h1 class="title">Compétitions FFME</h1>
        <b-button type="is-success"
                  icon-right="license"
                  tag="router-link"
                  :to="'/competitions/create'"
        >
          Créer une compétition
        </b-button>
      </div>

      <div class="custom_section page_stats">
        <div class="tile is-ancestor">
          <div class="tile is-4 is-parent">
            <StatsBlock number="12" description="Compétitions en cours" type="is-primary"></StatsBlock>
          </div>
          <div class="tile is-4 is-parent">
            <StatsBlock number="1320" description="Grimpeur depuis 2020" type="is-warning"></StatsBlock>
          </div>
          <div class="tile is-4 is-parent">
            <StatsBlock number="1920" description="Compétitions au total" type="is-danger"></StatsBlock>
          </div>
        </div>
      </div>

      <div class="custom_section page_contents">
        <div class="is-flex">
          <span class="title">Compétition féminine</span>
          <span>Autres compétitions</span>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import Rank from "~/components/Rank.vue";
  import StatsBlock from "~/components/StatsBlock.vue";

  @Component({
    components: { Rank, StatsBlock }
  })
  export default class Competitions extends Vue {

  }
</script>

<style scoped>

</style>
