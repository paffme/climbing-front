<template>
  <div>
    <div class="block">
      <span class="subtitle">Configuration de la compétition</span>
    </div>
    <form v-on:submit.prevent="registerCompetition()" class="form">
      <b-field horizontal label="Nom compétition">
        <b-input name="subject" expanded v-model="Form.competition.name"></b-input>
      </b-field>

      <b-field horizontal label="Date">
        <b-field>
          <b-datepicker
            placeholder="Date de début"
            icon="calendar-today"
            trap-focus
            v-model="Form.competition.startDate"
          >
          </b-datepicker>
        </b-field>
        <b-field>
          <b-datepicker
            placeholder="Date de fin"
            icon="calendar-today"
            trap-focus
            v-model="Form.competition.endDate"
          >
          </b-datepicker>
        </b-field>
      </b-field>

      <b-field horizontal label="Compétition open">
        <b-switch v-model="Form.competition.open"></b-switch>
      </b-field>
      <b-field horizontal label="Date d'accueil">
        <b-datepicker
          placeholder="Date d'accueil"
          icon="calendar-today"
          trap-focus
          v-model="Form.competition.welcomingDate"
        >
        </b-datepicker>
      </b-field>

      <b-field horizontal label="Type">
        <b-select placeholder="Selectionner type de compétition" v-model="Form.competition.type">
          <option v-for="type in typeCompetiton" :value="type">{{ type }}</option>
        </b-select>
      </b-field>

      <b-field horizontal grouped label="Adresse">
        <b-field>
          <b-input placeholder="Adresse" v-model="Form.competition.address"></b-input>
        </b-field>
        <b-field expanded>
          <b-input placeholder="Ville" v-model="Form.competition.city"></b-input>
        </b-field>
        <b-field expanded>
          <b-input placeholder="Code postal" v-model="Form.competition.postalCode"></b-input>
        </b-field>
      </b-field>

      <b-field id="category" horizontal label="Categories" grouped>
        <FormCompetitionCategories :default-value="Form.competition" v-on:category-value="addCategory" v-on:delete="removeCategory" :can-be-delete="true"></FormCompetitionCategories>
      </b-field>

      <b-field v-if="Form.competition.categories.length > 0" class="is-flex category">
        <b-button v-if="selectedOptions.length > 0" icon-right="delete" type="is-danger" v-on:click="removeCategory"></b-button>
        <b-select
          multiple
          v-model="selectedOptions">
          <option v-for="(categorie, index) in Form.competition.categories" :key="index" v-on:click="categoryIndex = index">
            <span>{{ categorie.sex }} - {{ categorie.name }}</span>
          </option>
        </b-select>
      </b-field>

      <b-field horizontal label="Description">
        <b-input type="textarea" v-model="Form.competition.description"></b-input>
      </b-field>

      <b-field horizontal label="Agenda">
        <b-input type="textarea" v-model="Form.competition.agenda"></b-input>
      </b-field>

      <div class="is-pulled-right">
        <b-button type="is-primary" tag="button" :loading="Form.isLoading" v-on:click="registerCompetition">Valider compétition</b-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, PropSync, Vue } from "vue-property-decorator";
  import { CategoryName, Competition, FormCreateCompetition, Sex, TypeCompetition } from "~/definitions";
  import FormCompetitionCategories from "~/components/Form/FormCompetitionCategories.vue";
  import _ from "lodash";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";

  @Component({
    components: {FormCompetitionCategories}
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
        categories: [
          {sex: Sex.Female, name: CategoryName.Benjamin}
        ]
      }
    }

    async registerCompetition() {
      this.Form.isLoading = true
      console.log('this.Form', this.Form)
      try {
        const newCompetition = await ApiHelper.CreateCompetition(this.Form.competition)
        this.$buefy.toast.open({
          type: 'is-success',
          message: "Compétition créée"
        })
        this.Form.success = true
        this.Form.isLoading = false
        console.log('newCOmpetition', newCompetition.data)
        this.$router.push(`/competitions/${newCompetition.data.id}`)
      } catch(err) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: "Une erreur s'est produite"
        })
        this.Form.error = true
        this.Form.isLoading = false
      }
    }

    addCategory(result: any) {
      let competitionCategories = this.Form.competition?.categories || undefined
      if (!competitionCategories) return
      let alreadyExist = false
      if (competitionCategories.length === 0) {
        alreadyExist = false
      } else {
        competitionCategories.forEach(category => {
          if (_.isEqual(category, result)) {
            alreadyExist = true
            return
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
      if (this.categoryIndex === null) return

      let competitionCategories = this.Form.competition?.categories
      if (!competitionCategories) return

      if (this.categoryIndex === 0 && competitionCategories.length === 1) {
        competitionCategories = []
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
