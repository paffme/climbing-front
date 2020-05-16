<template>
  <div class="columns">
    <div class="column is-12">
      <div class="page_header">
        <h1 class="title">
          Tableau de bord FFME
        </h1>
        <BtnCreateCompetition />
      </div>

      <div class="custom_section page_stats">
        <div class="tile is-ancestor">
          <div class="tile is-4 is-parent">
            <StatsBlock
              :number="dashboardStats.futureCompetitions"
              description="Compétitions a venir"
              type="is-primary"
            />
          </div>
          <div class="tile is-4 is-parent">
            <StatsBlock
              :number="dashboardStats.nbClimber"
              description="Grimpeur depuis 2020"
              type="is-warning"
            />
          </div>
          <div class="tile is-4 is-parent">
            <StatsBlock
              :number="dashboardStats.nbCompetitions"
              description="Compétitions totales"
              type="is-danger"
            />
          </div>
        </div>
      </div>

      <div class="custom_section page_contents">
        <div class="columns">
          <div class="column is-12">
            <b-notification :closable="false">
              <div class="is-flex competition_title">
                <span class="subtitle">Compétitions à venir</span>
                <nuxt-link to="competitions">
                  <span>Autres compétitions</span>
                </nuxt-link>
              </div>
              <Rank :competitions.sync="competitions" />
            </b-notification>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Rank from '~/components/Rank.vue'
import StatsBlock from '~/components/StatsBlock.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { Competition } from '~/definitions'
import BtnCreateCompetition from '~/components/Button/BtnCreateCompetition.vue'
import { futureCompetitions } from '~/utils/filterHelper'
import { AxiosError } from "axios";

@Component({
  components: { Rank, StatsBlock, BtnCreateCompetition }
})
export default class Dashboard extends Vue {
  data = [
    {
      id: 4,
      name: 'Chalais Savoyard',
      categories: [
        {
          sex: 'female',
          name: 'benjamin'
        }
      ],
      startDate: '2020-04-25T14:50:54.000Z',
      endDate: '2020-04-25T14:50:54.000Z',
      city: 'Choisy',
      address: '19 Avenue Villejuif',
      postalCode: '94420',
      type: 'lead',
      createdAt: '2020-04-25T17:18:33.000Z',
      updatedAt: '2020-04-25T17:18:33.000Z'
    }
  ]

  competitions?: Competition[] = []
  dashboardStats = {
    futureCompetitions: 0,
    nbClimber: 0,
    nbCompetitions: 0
  }

  async created() {
    try {
      this.dashboardStats.nbClimber = await this.fetchNbClimber()
      this.competitions = await this.fetchFutureCompetitions()
      this.dashboardStats.nbCompetitions = await this.fetchNbCompetitions()
      this.dashboardStats.futureCompetitions = this.countCompetitions(this.competitions)
    } catch (err) {
      this.competitions = []
      this.handleAxiosError(err)
    }
  }

  async fetchNbClimber(): Promise<number> {
    try {
      const response = await ApiHelper.GetUserCount()
      return response.data.count
    } catch(err) {
      console.log('fetchFutureCompetitions - ERR', err)
      throw err
    }
  }

  async fetchNbCompetitions(): Promise<number> {
    try {
      const response = await ApiHelper.GetCompetitionsCount()
      return response.data.count
    } catch(err) {
      console.log('fetchFutureCompetitions - ERR', err)
      throw err
    }
  }

  async fetchFutureCompetitions(): Promise<Competition[]> {
    try {
      const axiosResponse = await ApiHelper.GetCompetitions(futureCompetitions())
      return axiosResponse.data
    } catch(err) {
      console.log('fetchFutureCompetitions - ERR', err)
      throw err
    }
  }

  countCompetitions(competitions: Competition[]): number {
    return Array.isArray(competitions)
      ? competitions.length
      : 0
  }

  handleAxiosError(error: AxiosError): void {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
    }
    console.log(error);
  }
}
</script>

<style scoped>
.competition_title {
  justify-content: space-between;
}
</style>
