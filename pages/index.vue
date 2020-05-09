<template>
  <div class="columns">
    <div class="column is-12">
      <div class="page_header">
        <h1 class="title">Tableau de bord FFME</h1>
        <BtnCreateCompetition></BtnCreateCompetition>
      </div>

      <div class="custom_section page_stats">
        <div class="tile is-ancestor">
          <div class="tile is-4 is-parent">
            <StatsBlock :number="dashboardStats.futureCompetitions" description="Compétitions a venir" type="is-primary"></StatsBlock>
          </div>
          <div class="tile is-4 is-parent">
            <StatsBlock :number="dashboardStats.nbClimber" description="Grimpeur depuis 2020" type="is-warning"></StatsBlock>
          </div>
          <div class="tile is-4 is-parent">
            <StatsBlock :number="dashboardStats.nbCompetitions" description="Compétitions au total" type="is-danger"></StatsBlock>
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
  import { authUser } from "~/utils/store-accessor";
  import BtnCreateCompetition from "~/components/BtnCreateCompetition.vue";

  @Component({
    components: { Rank, StatsBlock, BtnCreateCompetition }
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
    dashboardStats = {
      futureCompetitions: 0,
      nbClimber: 1320,
      nbCompetitions: 0
    }

    async created() {
      try {
        const response = await ApiHelper.GetCompetitions()
        this.dashboardStats.nbClimber = await this.fetchNbClimber()
        this.dashboardStats.nbCompetitions = Array.isArray(response.data) ? response.data.length : 0
        this.competitions = response.data
      } catch(e) {
        this.competitions = []
      }
    }

    async fetchNbClimber(): Promise<number> {
      const response = await ApiHelper.GetUserCount()
      return response.data.count
    }
  }
</script>

<style scoped>
  .competition_title {
    justify-content: space-between;
  }
</style>
