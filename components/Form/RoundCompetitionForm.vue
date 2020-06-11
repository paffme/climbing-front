<template>
  <form @submit.prevent="addRound">
    <b-field>
      <div class="block">
        <b-radio v-model="Form.input.sex" :native-value="sex.Female" name="sex">
          Femme
        </b-radio>
        <b-radio v-model="Form.input.sex" :native-value="sex.Male" name="sex">
          Homme
        </b-radio>
      </div>
    </b-field>

    <b-field label="Nom">
      <b-input v-model="Form.input.name" />
    </b-field>

    <b-field label="Catégorie">
      <b-select v-model="Form.input.category" expanded>
        <option
          v-for="(category, key) in categoriesName"
          :key="key"
          :value="category"
        >
          {{ category }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Type de classement">
      <b-select v-model="Form.input.rankingType" expanded>
        <option
          v-for="(type, key, index) in rankingtypes"
          :key="index"
          :value="key"
        >
          {{ type }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Type">
      <b-select v-model="Form.input.type" expanded>
        <option
          v-for="(typeBouldering, key, index) in typesBouldering"
          :key="index"
          :value="key"
        >
          {{ typeBouldering }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Quota">
      <b-numberinput v-model="Form.input.quota" />
    </b-field>
    <b-field label="Boulders">
      <b-numberinput v-model="Form.input.boulders" />
    </b-field>
    <b-button native-type="submit" type="is-success">
      Créer un round
    </b-button>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  CategoryName,
  FormBoulderingRound,
  RankingType,
  Sex,
  TypeBouldering
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'

@Component
export default class RoundCompetitionForm extends Vue {
  categoriesName = CategoryName
  rankingtypes = RankingType
  typesBouldering = TypeBouldering
  sex = Sex
  competitionId: null | string = null
  Form: FormBoulderingRound = {
    error: false,
    success: false,
    isLoading: false,
    input: {
      category: undefined,
      sex: undefined,
      index: 1,
      name: undefined,
      quota: 0,
      boulders: 0,
      rankingType: RankingType.CIRCUIT,
      type: TypeBouldering.FINAL,
      groups: 1
    }
  }

  mounted() {
    this.competitionId = this.$route.params.competitionId
  }

  async addRound() {
    if (!this.competitionId) {
      return
    }
    try {
      await ApiHelper.AddRound(
        parseInt(this.competitionId, 10),
        this.Form.input
      )
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Round ajouté'
      })
    } catch (error) {
      this.$buefy.toast.open({
        type: 'is-danger',
        message: "Une erreur s'est produite"
      })
    }
  }
}
</script>

<style scoped></style>
