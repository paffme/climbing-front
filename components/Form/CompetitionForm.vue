<template>
  <div>
    <div class="block">
      <span class="subtitle">
        Toute la configuration de la compétition
      </span>
    </div>
    <form class="form" @submit.prevent="registerCompetition()">
      <b-field horizontal label="Nom">
        <b-input
          v-model="Form.competition.name"
          class="name"
          expanded
          name="subject"
        />
      </b-field>

      <b-field horizontal label="Date de début et de fin">
        <b-field>
          <b-datepicker
            v-model="Form.competition.startDate"
            :date-formatter="dateFormatter"
            class="date-start"
            editable
            icon="calendar-today"
            placeholder="Date de début"
            trap-focus
          />
        </b-field>
        <b-field>
          <b-datepicker
            v-model="Form.competition.endDate"
            :date-formatter="dateFormatter"
            class="date-end"
            editable
            icon="calendar-today"
            placeholder="Date de fin"
            trap-focus
          />
        </b-field>
      </b-field>

      <b-field horizontal label="Open">
        <b-switch v-model="Form.competition.open" class="status" />
      </b-field>
      <b-field horizontal label="Date d'accueil">
        <b-datepicker
          v-model="Form.competition.welcomingDate"
          :date-formatter="dateFormatter"
          class="date-welcome"
          editable
          icon="calendar-today"
          placeholder="Date d'accueil"
          trap-focus
        />
      </b-field>

      <b-field horizontal label="Type">
        <b-select
          v-model="Form.competition.type"
          placeholder="Sélectionner le type de la compétition"
        >
          <option
            v-for="(type, index) in typeCompetiton"
            :key="index"
            :value="type"
          >
            {{ type === typeCompetiton.Bouldering ? 'Bloc' : type }}
          </option>
        </b-select>
      </b-field>

      <b-field horizontal grouped label="Adresse">
        <b-input
          v-model="Form.competition.address"
          placeholder="Adresse"
          class="street"
        />
        <b-input
          v-model="Form.competition.city"
          placeholder="Ville"
          class="city"
        />
        <b-input
          v-model="Form.competition.postalCode"
          placeholder="Code postal"
          class="low-size postal-code"
        />
      </b-field>
      <b-field class="category-male" horizontal label="Catégories masculines">
        <div class="block">
          <div class="select-all">
            <b-switch v-model="selectMaleCategories">
              Sélectionner tout
            </b-switch>
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

      <b-field class="category-female" horizontal label="Catégories féminines">
        <div class="block">
          <div class="select-all">
            <b-switch v-model="selectFemaleCategories">
              Sélectionner tout
            </b-switch>
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
        <b-input
          v-model="Form.competition.description"
          class="description"
          type="textarea"
        />
      </b-field>

      <b-field horizontal label="Agenda">
        <b-input
          v-model="Form.competition.agenda"
          class="agenda"
          type="textarea"
        />
      </b-field>

      <div class="is-pulled-right">
        <b-button
          type="is-primary"
          tag="button"
          :loading="Form.isLoading"
          class="create-competition"
          @click="registerCompetition"
        >
          Créer
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
  components: { FormCompetitionCategories },
  methods: {
    dateFormatter(dt: Date) {
      return dt.toLocaleDateString('fr', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
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
      agenda: this.competition?.agenda || '9h00 : Accueil\n...',
      welcomingDate: this.competition?.welcomingDate || new Date(),
      description:
        this.competition?.description || 'Ceci est une simple description',
      startDate: this.competition?.startDate || new Date(),
      endDate: this.competition?.endDate || new Date(),
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

.low-size {
  max-width: 100px;
}
</style>
