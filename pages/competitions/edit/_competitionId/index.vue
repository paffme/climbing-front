<template>
  <div>
    <EditOneCompetition
      :competition="competition"
      :bouldering="bouldering"
      :role="role"
      @onFetchCompetition="$emit('onFetchCompetition')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  APIBoulderingRounds,
  APICompetition,
  APIUserCompetitionRoles
} from '~/definitions'
import EditOneCompetition from '~/components/EditCompetition/EditOneCompetition.vue'

@Component({
  middleware: ['isAuth', 'setHeader'],
  components: {
    EditOneCompetition
  }
})
export default class indexCompetition extends Vue {
  @Prop(Object) competition!: APICompetition
  @Prop(Object) role!: APIUserCompetitionRoles
  @Prop(Object) bouldering!: APIBoulderingRounds
}
</script>

<style scoped></style>
