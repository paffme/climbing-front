<template>
  <div>
    <h1 class="title">Toutes les compétitions</h1>
    <div class="is-pulled-right">
      <b-field grouped group-multiline label="Nombre de compétition par page" custom-class="little-margin">
        <b-select v-model="perPage" >
          <option :value="1">1</option>
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </b-select>
      </b-field>
    </div>
      <b-tag rounded type="is-success">
        Compétition actuelle : <bold>{{ totalCompetition }}</bold>
      </b-tag>
    <Rank :competitions.sync="competitions" v-on:page-change="pageChange" :total-competition="totalCompetition" :per-page="perPage"></Rank>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import { Competition } from "~/definitions";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";
  import Rank from "~/components/Rank.vue";
  import LinkHeader from "http-link-header"


  @Component({
    components: { Rank }
  })
  export default class IndexCompetitions extends Vue {
    competitions?: Competition[] | null = null
    totalCompetition = 0
    perPage = 5
    page = 1

    async created() {
      try {
        await this.loadData()
      } catch(e) {
        console.log(e)
        this.competitions = []
      }
    }

    async loadData() {
      const response = await ApiHelper.GetCompetitionsPagination(this.page, this.perPage)
      const totalCompetition = await ApiHelper.GetCompetitionsCount()
      let link = null
      console.log('response', response)
      console.log('totalCompetition', totalCompetition.data.count)
      this.totalCompetition = totalCompetition.data.count
      if( (response.headers.link)) link = LinkHeader.parse(response.headers.link)
      this.competitions = response.data
    }

    async pageChange(pageNumber: number) {
      console.log('page nb', pageNumber)
      this.page = pageNumber
      await this.loadData()
    }
  }
</script>

<style scoped>
.little-margin {
  margin-right: 20px;
}
</style>
