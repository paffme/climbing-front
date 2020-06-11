<template>
  <div class="content">
    <h4 class="title">
      Classement de la compétition
    </h4>
    <div class="content">
      <div class="subtitle">
        Genre
      </div>
      <b-field position="is-centered">
        <template v-for="(sex, index) in sexes">
          <b-radio-button :key="index" v-model="filter.sex" :native-value="sex">
            <b-icon
              :icon="sex === sexes.Male ? 'gender-male' : 'gender-female'"
            />
            <span>{{ sex | capitalize }}</span>
          </b-radio-button>
        </template>
      </b-field>
      <div class="subtitle">
        Catégorie
      </div>
      <b-field position="is-centered">
        <template v-for="(category, index) in categories">
          <b-radio-button
            :key="index"
            v-model="filter.categorie"
            :native-value="category"
          >
            <span>{{ category | capitalize }}</span>
          </b-radio-button>
        </template>
      </b-field>
      <RankOneCompetition
        :competition-id="competitionId"
        :sex="filter.sex"
        :categorie="filter.categorie"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import RankOneCompetition from '~/components/Table/RankOneCompetition.vue'
import { CategoryName, Sex } from '~/definitions'

@Component({
  components: { RankOneCompetition },
  data() {
    return {
      categories: CategoryName,
      sexes: Sex
    }
  }
})
export default class RankingComponent extends Vue {
  @Prop(Number) competitionId!: number

  filter = {
    sex: Sex.Male,
    categorie: CategoryName.Benjamin
  }
}
</script>

<style scoped></style>
