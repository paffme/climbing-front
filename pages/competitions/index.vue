<template>
  <div>
    <h1 class="title">Toutes les compétitions</h1>
    <Rank :competitions.sync="competitions" v-on:page-change="pageChange"></Rank>
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
    competitions?: Competition[] = []

    async created() {
      try {
        const response = await ApiHelper.GetCompetitionsPagination(1, 3)
        console.log('response', response.headers.link)
        const link = LinkHeader.parse(response.headers.link)
        console.log('link', link)
        this.competitions = response.data
      } catch(e) {
        this.competitions = []
      }
    }

    pageChange(elem: any) {
      console.log('pageChange', elem)
    }
  }
</script>

<style scoped>

</style>
