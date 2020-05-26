<template>
  <div>
    <div class="block">
      <span class="subtitle">Configuration de la compétition</span>
    </div>
    <form class="form" @submit.prevent="registerCompetition()">
      <b-field horizontal label="Nom compétition">
        <b-input v-model="Form.competition.name" name="subject" expanded />
      </b-field>

      <b-field horizontal label="Date">
        <b-field>
          <b-datepicker
            editable
            v-model="Form.competition.startDate"
            placeholder="Date de début"
            icon="calendar-today"
            trap-focus
          />
        </b-field>
        <b-field>
          <b-datepicker
            editable
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
          editable
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

      <b-field id="category" horizontal label="Categories" grouped>
        <FormCompetitionCategories
          :default-value="Form.competition"
          :can-be-delete="true"
          @category-value="addCategory"
          @delete="removeCategory"
        />
      </b-field>

      <b-field
        v-if="Form.competition.categories.length > 0"
        class="is-flex category"
      >
        <b-button
          v-if="selectedOptions.length > 0"
          icon-right="delete"
          type="is-danger"
          @click="removeCategory"
        />
        <b-select v-model="selectedOptions" multiple>
          <option
            v-for="(categorie, index) in Form.competition.categories"
            :key="index"
            @click="categoryIndex = index"
          >
            <span>{{ categorie.sex }} - {{ categorie.name }}</span>
          </option>
        </b-select>
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
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import {
  CategoryName,
  FormCreateCompetition,
  Sex,
  TypeCompetition
} from '~/definitions'
import FormCompetitionCategories from '~/components/Form/FormCompetitionCategories.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'

@Component({
  components: { FormCompetitionCategories }
})
export default class CreateCompetitionForm extends Vue {
  categoryIndex: number | null = null
  selectedOptions = []
  typeCompetiton = TypeCompetition
  Form: FormCreateCompetition = {
    error: false,
    success: false,
    isLoading: false,
    competition: {
      name: 'Chalais Savoyard',
      type: TypeCompetition.Bouldering,
      open: true,
      agenda: 'Lundi rencontre avec le personnel blablabla...',
      welcomingDate: new Date('2020-04-25T14:50:54.009Z'),
      description: 'Ceci est une simple description',
      startDate: new Date('2020-04-25T14:50:54.009Z'),
      endDate: new Date('2020-04-25T14:50:54.009Z'),
      address: '19 Avenue Villejuif',
      city: 'Choisy',
      postalCode: '94420',
      categories: [{ sex: Sex.Female, name: CategoryName.Benjamin }]
    }
  }

  async registerCompetition() {
    this.Form.isLoading = true
    console.log('this.Form', this.Form)
    try {
      const newCompetition = await ApiHelper.CreateCompetition(
        this.Form.competition
      )
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Compétition créée'
      })
      this.Form.success = true
      this.Form.isLoading = false
      console.log('newCOmpetition', newCompetition.data)
      this.$router.push(`/competitions/${newCompetition.data.id}`)
    } catch (err) {
      this.$buefy.toast.open({
        type: 'is-danger',
        message: "Une erreur s'est produite"
      })
      this.Form.error = true
      this.Form.isLoading = false
    }
  }

  addCategory(result: any) {
    const competitionCategories = this.Form.competition?.categories || undefined
    if (!competitionCategories) {
      return
    }
    let alreadyExist = false
    if (competitionCategories.length === 0) {
      alreadyExist = false
    } else {
      competitionCategories.forEach((category) => {
        if (_.isEqual(category, result)) {
          alreadyExist = true
        }
      })
    }

    if (!alreadyExist) {
      competitionCategories.push(result)
    } else {
      this.$buefy.toast.open({
        type: 'is-warning',
        message: 'Cette catégorie existe déjà'
      })
    }
  }

  removeCategory() {
    console.log('this.categoryIndex', this.categoryIndex)
    if (this.categoryIndex === null) {
      return
    }

    const competitionCategories = this.Form.competition?.categories
    console.log('competitionCategories', competitionCategories)
    if (!competitionCategories) {
      return
    }

    if (this.categoryIndex === 0 && competitionCategories.length === 1) {
      this.Form.competition.categories = []
      return
    }
    competitionCategories.splice(this.categoryIndex, 1)
  }
}
</script>

<style scoped>
.category {
  justify-content: flex-end;
}
</style>
