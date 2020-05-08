<template>
  <div>
    <h1 class="title">Toutes les compétitions</h1>
    <Rank :competitions.sync="competitions"></Rank>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Competition } from "~/definitions";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";
  import Rank from "~/components/Rank.vue";

  @Component({
    components: { Rank }
  })
  export default class IndexCompetitions extends Vue {
    competitions?: Competition[] = []

    async created() {
      try {
        const response = await ApiHelper.GetCompetitions()
        this.competitions = response.data
      } catch(e) {
        this.competitions = []
      }
    }
  }
</script>

<style scoped>

</style>
