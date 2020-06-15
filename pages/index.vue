<template>
  <div class="columns">
    <div class="column is-12">
      <div class="page_header columns is-multiline">
        <div class="column is-12">
          <h1 class="title">
            Tableau de bord FFME
          </h1>
        </div>
        <div class="column">
          <BtnCreateCompetition :is-connected="isConnected" />
        </div>
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
              :number="dashboardStats.totalCompetitions"
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
              <Rank
                :competitions.sync="competitions"
                :total-competition="dashboardStats.futureCompetitions"
                :per-page="perPage"
                @page-change="pageChange"
              />
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
import AuthUser from '~/store/authUser'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({
  data() {
    return {
      // @ts-ignore
      isConnected: AuthUser.getters?.['Authenticated']() || false
    }
  },
  components: { Rank, StatsBlock, BtnCreateCompetition }
})
export default class Competitions extends Vue {
  competitions?: Competition[] = []
  dashboardStats = {
    futureCompetitions: 0,
    nbClimber: 0,
    totalCompetitions: 0
  }

  perPage = 5
  page = 1

  async created() {
    try {
      this.competitions = await this.fetchFutureCompetitions()
      this.dashboardStats.nbClimber = await this.fetchNbClimber()
      this.dashboardStats.futureCompetitions = await this.countCompetition(true)
      this.dashboardStats.totalCompetitions = await this.countCompetition()
    } catch (err) {
      console.log('error Created - Index', err)
      this.competitions = []
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async fetchNbClimber(): Promise<number> {
    try {
      const response = await ApiHelper.GetUserCount()
      return response.data.count
    } catch (err) {
      console.log('fetchNbClimber - ERR', err)
      throw err
    }
  }

  async countCompetition(futurCompetition?: boolean): Promise<number> {
    try {
      const response = await ApiHelper.GetCompetitionsCount(
        futurCompetition ? futureCompetitions() : undefined
      )
      return response.data.count
    } catch (err) {
      console.log('fetchNbCompetitions - ERR', err)
      throw err
    }
  }

  async fetchFutureCompetitions(): Promise<Competition[]> {
    try {
      const axiosResponse = await ApiHelper.GetCompetitionsPagination(
        this.page,
        this.perPage,
        futureCompetitions()
      )
      console.log('axiosResponse', axiosResponse)
      return axiosResponse.data
    } catch (err) {
      console.log('fetchFutureCompetitions - ERR', err)
      throw err
    }
  }

  async pageChange(pageNumber: number) {
    this.page = pageNumber
    this.competitions = await this.fetchFutureCompetitions()
  }

  countCompetitions(competitions: Competition[]): number {
    return Array.isArray(competitions) ? competitions.length : 0
  }
}
</script>

<style scoped>
.competition_title {
  justify-content: space-between;
}
</style>
