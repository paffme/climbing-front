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
            <StatsBlock :number="0" description="Compétitions en cours" type="is-primary"></StatsBlock>
          </div>
          <div class="tile is-4 is-parent">
            <StatsBlock :number="1320" description="Grimpeur depuis 2020" type="is-warning"></StatsBlock>
          </div>
          <div class="tile is-4 is-parent">
            <StatsBlock :number="competitions.length" description="Compétitions au total" type="is-danger"></StatsBlock>
          </div>
        </div>
      </div>

      <div class="custom_section page_contents">
        <div class="columns">
          <div class="column is-8">
            <b-notification :closable="false">
              <div class="is-flex competition_title">
                <span class="subtitle">Compétitions à venir</span>
                <nuxt-link to="competitions"><span>Autres compétitions</span></nuxt-link>
              </div>
              <Rank :competitions.sync="competitions"></Rank>
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
  import { ApiHelper } from "~/utils/api_helper/apiHelper";
  import { Competition } from "~/definitions";
  import { futureCompetitions } from "~/utils/filterHelper";

  @Component({
    middleware: 'isAuth',
    components: { Rank, StatsBlock }
  })
  export default class Competitions extends Vue {
    data = [
      {
          "id": 4,
          "name": "Chalais Savoyard",
          "categories": [
            {
              "sex": "female",
              "name": "benjamin"
            }
          ],
          "startDate": "2020-04-25T14:50:54.000Z",
          "endDate": "2020-04-25T14:50:54.000Z",
          "city": "Choisy",
          "address": "19 Avenue Villejuif",
          "postalCode": "94420",
          "type": "lead",
          "createdAt": "2020-04-25T17:18:33.000Z",
          "updatedAt": "2020-04-25T17:18:33.000Z"
      }
    ]
    competitions?: Competition[] = []

    async created() {
      try {
        const response = await ApiHelper.GetCompetitions(futureCompetitions())
        this.competitions = response.data
      } catch(e) {
        this.competitions = []
      }
    }
  }
</script>

<style scoped>
  .competition_title {
    justify-content: space-between;
  }
</style>
