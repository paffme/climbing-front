<template>
  <form @submit.prevent="$emit('createRound', Form.input)">
    <b-field v-if="!Form.isEdition">
      <div class="block">
        <b-radio v-model="Form.input.sex" :native-value="sex.Female" name="sex">
          Femme
        </b-radio>
        <b-radio v-model="Form.input.sex" :native-value="sex.Male" name="sex">
          Homme
        </b-radio>
      </div>
    </b-field>

    <b-field label="Nom" :label-position="labelPosition">
      <b-input v-model="Form.input.name" required />
    </b-field>

    <b-field
      v-if="!Form.isEdition"
      label="Catégorie"
      :label-position="labelPosition"
    >
      <b-select v-model="Form.input.category" required expanded>
        <option
          v-for="(category, key) in categoriesName"
          :key="key"
          :value="category"
        >
          {{ category }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Type de classement" :label-position="labelPosition">
      <b-select v-model="Form.input.rankingType" required expanded>
        <option
          v-for="(type, key, index) in rankingtypes"
          :key="index"
          :value="key"
        >
          {{ type }}
        </option>
      </b-select>
    </b-field>

    <b-field
      v-if="!Form.isEdition"
      label="Type"
      :label-position="labelPosition"
    >
      <b-select v-model="Form.input.type" required expanded>
        <option
          v-for="(typeBouldering, key, index) in typesBouldering"
          :key="index"
          :value="key"
        >
          {{ typeBouldering }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Quota" :label-position="labelPosition">
      <b-numberinput
        v-model="Form.input.quota"
        :min="boulderingRules.quota.min"
      />
    </b-field>
    <b-field label="Boulders" :label-position="labelPosition">
      <b-numberinput
        v-model="Form.input.boulders"
        :min="boulderingRules.boulders.min"
      />
    </b-field>
    <b-field label="Nombre d'essais maximum" :label-position="labelPosition">
      <b-numberinput v-model="Form.input.maxTries" />
    </b-field>

    <b-button native-type="submit" type="is-success">
      {{ Form.isEdition ? 'Modifier le round' : 'Créer un round'}}
    </b-button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  BoulderingRoundInput,
  BoulderingRoundInputEdit,
  CategoryName,
  FormBoulderingRound,
  RankingType,
  Sex,
  TypeBouldering
} from '~/definitions'

@Component
export default class FormRoundCompetition extends Vue {
  @Prop(String) genre!: Sex
  @Prop(String) category!: CategoryName
  @Prop(Object) round!: BoulderingRoundInput | BoulderingRoundInputEdit

  labelPosition = 'on-border'
  categoriesName = CategoryName
  rankingtypes = RankingType
  typesBouldering = TypeBouldering
  sex = Sex
  competitionId: null | string = null
  boulderingRules = {
    quota: {
      min: 1,
      default: 1
    },
    boulders: {
      min: 1,
      default: 1
    }
  }

  Form: FormBoulderingRound = {
    error: false,
    success: false,
    isLoading: false,
    isEdition: !!(this.round as BoulderingRoundInputEdit)?.id,
    input: {
      id: (this.round as BoulderingRoundInputEdit)?.id,
      category: this.category || this.round?.category,
      sex: this.genre || this.round?.sex,
      name: this.round?.name,
      quota: this.round?.quota || this.boulderingRules.quota.default,
      boulders: this.round?.boulders || this.boulderingRules.boulders.default,
      maxTries: this.round?.maxTries,
      rankingType: this.round?.rankingType || RankingType.CIRCUIT,
      type: this.round?.type || TypeBouldering.FINAL,
      groups: 1
    }
  }

  mounted() {
    this.competitionId = this.$route.params.competitionId
  }
}
</script>

<style scoped></style>
