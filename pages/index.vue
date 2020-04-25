<template>
  <div class="columns">
    <div class="column is-12">
      <div class="page_header">
        <h1 class="title">Tableau de bord FFME</h1>
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
        <div class="columns">
          <div class="column is-8">
            <b-notification :closable="false">
              <div class="is-flex competition_title">
                <span class="subtitle">Voir les compétitions</span>
                <span>Autres compétitions</span>
              </div>
              <Rank :competitions="data"></Rank>
            </b-notification>
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
    data = [
      {
        "createdAt": "2020-04-24T15:06:28.786Z",
        "updatedAt": "2020-04-24T15:06:28.786Z",
        "id": 1,
        "name": "Everest Recordz",
        "type": "Difficulté",
        "startDate": "2020-04-24T15:06:28.786Z",
        "endDate": "2020-04-24T15:06:28.786Z",
        "address": "string",
        "city": "CHamonix",
        "postalCode": "string",
        "categories": [
          "string"
        ]
      },
      {
        "createdAt": "2020-04-24T15:06:28.786Z",
        "updatedAt": "2020-04-24T15:06:28.786Z",
        "id": 0,
        "name": "Compétition Chagny",
        "type": "Block",
        "startDate": "2020-04-24T15:06:28.786Z",
        "endDate": "2020-04-24T15:06:28.786Z",
        "address": "string",
        "city": "Chagny",
        "postalCode": "string",
        "categories": [
          "string"
        ]
      }
    ]
  }
</script>

<style scoped>
  .competition_title {
    justify-content: space-between;
  }
</style>
