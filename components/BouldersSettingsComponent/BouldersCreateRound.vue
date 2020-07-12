<template>
  <div class="card">
    <div class="card-header">
      <span class="card-header-title">
        Création d'un tour
      </span>
    </div>
    <div class="card-content">
      <FormRoundCompetition
        :genre="genre"
        :category="category"
        :type="type"
        @createRound="onCreateRound"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FormRoundCompetition from '~/components/Form/FormRoundCompetition.vue'
import { CategoryName, Sex, TypeBoulderingRound } from '~/definitions'

@Component({
  components: { FormRoundCompetition }
})
export default class BouldersCreateRound extends Vue {
  @Prop(String) genre?: Sex
  @Prop(String) category?: CategoryName
  @Prop(String) type?: TypeBoulderingRound
  onCreateRound(value: any) {
    this.$emit('createRound', value)
    this.$emit('close')
  }
}
</script>

<style scoped></style>
