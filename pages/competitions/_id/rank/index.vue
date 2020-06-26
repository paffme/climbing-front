<template>
  <div>
    <h1 class="title">
      Classement général
    </h1>
    <GeneralRanking />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GeneralRanking from '~/components/GeneralRanking.vue'

@Component({
  components: { GeneralRanking }
})
export default class RankPage extends Vue {}
</script>

<style scoped></style>
