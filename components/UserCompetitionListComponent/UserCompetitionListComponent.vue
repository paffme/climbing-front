<template>
  <div>
    <template
      v-if="
        competitions && Array.isArray(competitions) && competitions.length > 0
      "
    >
      <template v-for="competition in competitions">
        <ShowCompetitionComponent
          :key="competition.id"
          :competition="competition"
        />
      </template>
    </template>
    <template v-else>
      <div class="notification">
        <p>
          Vous n'êtes inscrit a aucune compétition
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ShowCompetitionComponent from '~/components/ShowCompetitionComponent.vue'
import { APICompetition } from '~/definitions'

@Component({
  components: { ShowCompetitionComponent }
})
export default class UserCompetitionListComponent extends Vue {
  @Prop(Array) competitions!: APICompetition[]
}
</script>

<style scoped></style>
