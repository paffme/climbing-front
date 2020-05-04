<template>
  <div>
    <div class="block">
      <span class="subtitle">Configuration de la compétition</span>
    </div>
    <form v-if="internal_competition" v-on:submit.prevent="updateCompetition(internal_competition)" class="form">
      <b-field horizontal label="Nom compétition">
        <b-input name="subject" expanded v-model="internal_competition.name"></b-input>
      </b-field>

      <b-field horizontal label="Date">
        <b-field>
          <b-datepicker
            placeholder="Date de début"
            icon="calendar-today"
            trap-focus
            v-model="internal_competition.startDate"
          >
          </b-datepicker>
        </b-field>
        <b-field>
          <b-datepicker
            placeholder="Date de fin"
            icon="calendar-today"
            trap-focus
            v-model="internal_competition.endDate">
          </b-datepicker>
        </b-field>
      </b-field>

      <b-field horizontal label="Compétition open">
        <b-switch v-model="internal_competition.open"></b-switch>
      </b-field>
      <b-field horizontal label="Date d'accueil">
        <b-datetimepicker
          placeholder="Date d'accueil"
          icon="calendar-today"
          trap-focus
          v-model="internal_competition.welcomingDate"
        >
        </b-datetimepicker>
      </b-field>

      <b-field horizontal label="Type">
        <b-select placeholder="Selectionner type de compétition" v-model="internal_competition.type">
          <option v-for="type in typeCompetiton" :value="type">{{ type }}</option>
        </b-select>
      </b-field>

      <b-field horizontal grouped label="Adresse">
        <b-field>
          <b-input placeholder="Adresse" v-model="internal_competition.address"></b-input>
        </b-field>
        <b-field expanded>
          <b-input placeholder="Ville" v-model="internal_competition.city"></b-input>
        </b-field>
        <b-field expanded>
          <b-input placeholder="Code postal" v-model="internal_competition.postalCode"></b-input>
        </b-field>
      </b-field>

      <b-field id="category" horizontal label="Categories" grouped>
        <FormCompetitionCategories :default-value="internal_competition" v-on:category-value="addCategory" v-on:delete="removeCategory(index)" :can-be-delete="true"></FormCompetitionCategories>
      </b-field>

      <b-field v-if="internal_competition.categories.length > 0">
        <b-select
          multiple
          v-model="selectedOptions">
          <option v-for="(categorie, index) in internal_competition.categories" :key="index" v-on:click="categoryIndex = index">
            <span>{{ categorie.sex }} - {{ categorie.name }}</span>
          </option>
        </b-select>
        <b-button v-if="selectedOptions.length > 0" icon-right="delete" type="is-danger" v-on:click="removeCategory"></b-button>
      </b-field>

      <b-field horizontal label="Description">
        <b-input type="textarea" v-model="internal_competition.description"></b-input>
      </b-field>

      <b-field horizontal label="Agenda">
        <b-input type="textarea" v-model="internal_competition.agenda"></b-input>
      </b-field>

      <div class="is-pulled-right">
        <b-button type="is-primary" tag="button" native-type="submit" :loading="isLoading">Valider compétition</b-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
  import { CategoryName, Competition, Sex, TypeCompetition } from "~/definitions";
  import FormCompetitionCategories from "~/components/Form/FormCompetitionCategories.vue";
  import _ from "lodash";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";

  @Component({
    components: {FormCompetitionCategories}
  })
  export default class EditCompetitionForm extends Vue {
    @Prop({default: Object}) readonly internal_competition!: Competition
    categoryIndex: number | null = null
    selectedOptions = []
    typeCompetiton = TypeCompetition
    isLoading = false

    async updateCompetition(competitionData: Competition) {
      competitionData.id = this.internal_competition?.id
      console.log('competitionData', competitionData)
      try {
        await ApiHelper.UpdateCompetition(competitionData)
        this.$buefy.toast.open({
          type: 'is-success',
          message: "Compétition mise à jours"
        })
      } catch(err) {
        console.log('err', err)
        this.$buefy.toast.open({
          type: 'is-danger',
          message: "Une erreur s'est produite"
        })
      }
    }

    addCategory(result: any) {
      let competitionCategories = this.internal_competition && this.internal_competition.categories
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
          type: 'is-info',
          message: 'Cette catégorie existe déjà'
        })
      }
    }

    removeCategory() {
      if (this.categoryIndex === null) return

      let competitionCategories = this.internal_competition && this.internal_competition.categories

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

</style>
