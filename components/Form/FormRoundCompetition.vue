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
      <b-select
        v-model="Form.input.type"
        required
        expanded
        @input="updateMaxGroups"
      >
        <option
          v-for="(typeBouldering, key, index) in typesBouldering"
          :key="index"
          :value="key"
        >
          {{ typeBouldering }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Groupe" :label-position="labelPosition">
      <b-select
        v-model="Form.input.groups"
        required
        expanded
        :disabled="maxGroups === 1"
      >
        <option v-for="numGroup in maxGroups" :key="numGroup" :value="numGroup">
          {{ numGroup }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Bloc" :label-position="labelPosition">
      <b-numberinput
        v-model="Form.input.boulders"
        :min="boulderingRules.boulders.min"
      />
    </b-field>
    <b-field
      v-show="Form.input.rankingType === rawRankingType.LIMITED_CONTEST"
      label="Nombre d'essais maximum"
      :label-position="labelPosition"
    >
      <b-numberinput v-model="Form.input.maxTries" :min="1" />
    </b-field>

    <b-button
      native-type="submit"
      :disabled="Form.input.maxTries === 0"
      type="is-success"
    >
      {{ Form.isEdition ? 'Modifier le round' : 'Créer un round' }}
    </b-button>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  BoulderingRoundInput,
  BoulderingRoundInputEdit,
  CategoryName,
  FormBoulderingRound,
  RankingType,
  RawRankingType,
  Sex,
  TypeBouldering,
  TypeBoulderingRound
} from '~/definitions'

@Component
export default class FormRoundCompetition extends Vue {
  @Prop(String) genre!: Sex
  @Prop(String) category!: CategoryName
  @Prop(Object) round!: BoulderingRoundInput | BoulderingRoundInputEdit
  @Prop(String) type!: TypeBoulderingRound

  labelPosition = 'on-border'
  categoriesName = CategoryName
  rankingtypes = RankingType
  typesBouldering = TypeBouldering
  rawRankingType = RawRankingType
  sex = Sex
  maxGroups = 2
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
      boulders: this.round?.boulders || this.boulderingRules.boulders.default,
      maxTries: this.round?.maxTries || 3,
      rankingType: this.round?.rankingType || RawRankingType.CIRCUIT,
      type: this.round?.type || this.type || TypeBoulderingRound.QUALIFIER,
      groups: 1
    }
  }

  mounted() {
    this.competitionId = this.$route.params.competitionId
  }

  updateMaxGroups() {
    console.log('this.Form.input.type', this.Form.input.type)
    this.maxGroups =
      this.Form.input.type === TypeBoulderingRound.QUALIFIER ? 2 : 1
    this.Form.input.groups = 1
    console.log('this.maxGroups', this.maxGroups)
  }
}
</script>

<style scoped></style>
