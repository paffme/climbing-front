<template>
  <div>
    <div class="block">
      <span class="subtitle">Toute la configuration de la compétition</span>
    </div>
    <form class="form" @submit.prevent="registerCompetition()">
      <b-field horizontal label="Nom compétition">
        <b-input v-model="Form.competition.name" name="subject" expanded />
      </b-field>

      <b-field horizontal label="Date début / Date fin">
        <b-field>
          <b-datepicker
            v-model="Form.competition.startDate"
            placeholder="Date de début"
            icon="calendar-today"
            trap-focus
          />
        </b-field>
        <b-field>
          <b-datepicker
            v-model="Form.competition.endDate"
            placeholder="Date de fin"
            icon="calendar-today"
            trap-focus
          />
        </b-field>
      </b-field>

      <b-field horizontal label="Compétition open">
        <b-switch v-model="Form.competition.open" />
      </b-field>
      <b-field horizontal label="Date d'accueil">
        <b-datepicker
          v-model="Form.competition.welcomingDate"
          placeholder="Date d'accueil"
          icon="calendar-today"
          trap-focus
        />
      </b-field>

      <b-field horizontal label="Type">
        <b-select
          v-model="Form.competition.type"
          placeholder="Selectionner type de compétition"
        >
          <option
            v-for="(type, index) in typeCompetiton"
            :key="index"
            :value="type"
          >
            {{ type }}
          </option>
        </b-select>
      </b-field>

      <b-field horizontal grouped label="Adresse">
        <b-field>
          <b-input v-model="Form.competition.address" placeholder="Adresse" />
        </b-field>
        <b-field expanded>
          <b-input v-model="Form.competition.city" placeholder="Ville" />
        </b-field>
        <b-field expanded>
          <b-input
            v-model="Form.competition.postalCode"
            placeholder="Code postal"
          />
        </b-field>
      </b-field>

      <b-field horizontal label="Catégorie Homme">
        <div class="block">
          <div class="select-all">
            <b-checkbox v-model="selectMaleCategories">
              Selectionner tout
            </b-checkbox>
          </div>
          <template v-for="(category, index) in categories">
            <b-checkbox
              :key="index"
              v-model="maleCategories"
              :disabled="selectMaleCategories"
              :native-value="category"
            >
              {{ category }}
            </b-checkbox>
          </template>
        </div>
      </b-field>

      <b-field horizontal label="Catégorie Femme">
        <div class="block">
          <div class="select-all">
            <b-checkbox v-model="selectFemaleCategories">
              Selectionner tout
            </b-checkbox>
          </div>
          <template v-for="(category, index) in categories">
            <b-checkbox
              :key="index"
              v-model="femaleCategories"
              :disabled="selectFemaleCategories"
              :native-value="category"
            >
              {{ category }}
            </b-checkbox>
          </template>
        </div>
      </b-field>

      <b-field horizontal label="Description">
        <b-input v-model="Form.competition.description" type="textarea" />
      </b-field>

      <b-field horizontal label="Agenda">
        <b-input v-model="Form.competition.agenda" type="textarea" />
      </b-field>

      <div class="is-pulled-right">
        <b-button
          type="is-primary"
          tag="button"
          :loading="Form.isLoading"
          @click="registerCompetition"
        >
          Valider compétition
        </b-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  CategoryName,
  Competition,
  CompetitionCategories,
  FormCreateCompetition,
  Sex,
  TypeCompetition
} from '~/definitions'
import FormCompetitionCategories from '~/components/Form/FormCompetitionCategories.vue'

@Component({
  data() {
    return {
      categories: CategoryName
    }
  },
  components: { FormCompetitionCategories }
})
export default class CompetitionForm extends Vue {
  @Prop(Object) competition!: Competition
  typeCompetiton = TypeCompetition
  Form: FormCreateCompetition = {
    error: false,
    success: false,
    isLoading: false,
    isEdition: false,
    competition: {
      name: this.competition?.name || 'Chalais Savoyard',
      type: this.competition?.type || TypeCompetition.Bouldering,
      open: this.competition?.open || false,
      agenda:
        this.competition?.agenda ||
        'Lundi rencontre avec le personnel blablabla...',
      welcomingDate:
        this.competition?.welcomingDate || new Date('2020-09-25T14:50:54.009Z'),
      description:
        this.competition?.description || 'Ceci est une simple description',
      startDate:
        this.competition?.startDate || new Date('2020-09-25T14:50:54.009Z'),
      endDate:
        this.competition?.endDate || new Date('2020-09-25T14:50:54.009Z'),
      address: this.competition?.address || '19 Avenue Villejuif',
      city: this.competition?.city || 'Choisy',
      postalCode: this.competition?.postalCode || '94420',
      categories: this.competition?.categories || [
        { sex: Sex.Male, name: CategoryName.Benjamin }
      ]
    }
  }

  maleCategories: (CategoryName | undefined)[] =
    this.competition?.categories
      ?.map((category) => {
        if (category.sex === Sex.Male) return category.name
      })
      .filter((category) => !!category) || []

  femaleCategories: (CategoryName | undefined)[] =
    this.competition?.categories
      ?.map((category) => {
        if (category.sex === Sex.Female) return category.name
      })
      .filter((category) => !!category) || []

  selectMaleCategories: any = false
  selectFemaleCategories: any = false

  async registerCompetition() {
    this.Form.competition.categories = this.handleCategories()
    this.$emit('emit', this.Form.competition)
  }

  formatCategory(sex: Sex, categoryName: object): CompetitionCategories[] {
    return Object.keys(categoryName).map((category) => {
      console.log('category', category)
      return {
        sex,
        name: category.toLowerCase() as CategoryName
      }
    })
  }

  handleCategories(): CompetitionCategories[] {
    // Verification des categories
    let maleCategories: CompetitionCategories[] = []
    let femaleCategories: CompetitionCategories[] = []

    // Dans le cas ou toute les catégorie pour les hommes sont selectionnées
    if (this.selectMaleCategories) {
      maleCategories = this.formatCategory(Sex.Male, CategoryName)
    } else {
      maleCategories = this.maleCategories.map((category?: CategoryName) => {
        return {
          sex: Sex.Male,
          name: category as CategoryName
        }
      })
    }

    if (this.selectFemaleCategories) {
      femaleCategories = this.formatCategory(Sex.Female, CategoryName)
    } else {
      femaleCategories = this.femaleCategories.map(
        (category?: CategoryName) => {
          return {
            sex: Sex.Female,
            name: category as CategoryName
          }
        }
      )
    }
    return maleCategories.concat(femaleCategories)
  }
}
</script>

<style scoped>
.category {
  justify-content: flex-end;
}
</style>
