<template>
  <div>
    <h1 class="title">
      Toutes les compétitions
    </h1>
    <BtnCreateCompetition :is-connected="isConnected" />
    <div class="is-pulled-right">
      <b-field
        grouped
        group-multiline
        label="Nombre de compétition par page"
        custom-class="little-margin"
      >
        <b-select v-model="perPage" @input="loadCompetitions">
          <option :value="1">
            1
          </option>
          <option :value="5">
            5
          </option>
          <option :value="10">
            10
          </option>
          <option :value="20">
            20
          </option>
          <option :value="30">
            30
          </option>
        </b-select>
      </b-field>
    </div>
    <b-tag rounded type="is-success">
      Compétition actuelle :
      <b>
        {{ totalCompetition }}
      </b>
    </b-tag>
    <DefaultRankCompetition
      :competitions.sync="competitions"
      :total-competition="totalCompetition"
      :per-page="perPage"
      @page-change="pageChange"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Competition } from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import DefaultRankCompetition from '~/components/DefaultRankCompetition.vue'
import BtnCreateCompetition from '~/components/Button/BtnCreateCompetition.vue'
import AuthUser from '~/store/authUser'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({
  components: { DefaultRankCompetition, BtnCreateCompetition }
})
export default class IndexCompetitions extends Vue {
  competitions: Competition[] = []
  totalCompetition = 0
  perPage = 5
  page = 1
  isConnected = false

  async created() {
    // @ts-ignore
    this.isConnected = AuthUser.getters?.['Authenticated']() || false
    try {
      const totalCompetition = await ApiHelper.GetCompetitionsCount()
      this.totalCompetition = totalCompetition.data.count
      await this.loadCompetitions()
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      this.competitions = []
    }
  }

  async loadCompetitions() {
    this.competitions = await this.fetchCompetitions()
  }

  async fetchCompetitions(): Promise<Competition[]> {
    try {
      const response = await ApiHelper.GetCompetitionsPagination(
        this.page,
        this.perPage
      )

      return response.data
    } catch (err) {
      console.log('fetchCompetitions - Error', err)
      throw err
    }
  }

  async pageChange(pageNumber: number) {
    this.page = pageNumber
    await this.loadCompetitions()
  }
}
</script>

<style scoped></style>
