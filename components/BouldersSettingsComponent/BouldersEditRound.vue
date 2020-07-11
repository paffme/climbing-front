<template>
  <div class="card">
    <div class="card-header">
      <span class="card-header-title">Edition d'un tour</span>
    </div>
    <div class="card-content">
      <FormRoundCompetition :round="round" @createRound="onEditRound" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FormRoundCompetition from '~/components/Form/FormRoundCompetition.vue'
import { BoulderingRoundInput, BoulderingRoundInputEdit } from '~/definitions'

@Component({
  components: { FormRoundCompetition }
})
export default class BouldersEditRound extends Vue {
  @Prop(Object) round!: BoulderingRoundInput | BoulderingRoundInputEdit
  onEditRound(value: any) {
    this.$emit('editRound', value)
    this.$emit('close')
  }
}
</script>

<style scoped></style>
