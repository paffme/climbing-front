<template>
  <div>
    <div class="block">
      <span class="subtitle">Configuration de la compétition</span>
    </div>
    <form v-if="internal_competition" v-on:submit.prevent="updateCompetition()" class="form">
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
            v-model="internal_competition.endDate"
          >
          </b-datepicker>
        </b-field>
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

      <div class="is-pulled-right">
        <b-button type="is-primary" tag="button" :loading="isLoading" v-on:click="updateCompetition">Valider compétition</b-button>
      </div>
    </form>



    <form v-else v-on:submit.prevent="registerCompetition()" class="form">
      <b-field horizontal label="Nom compétition">
        <b-input name="subject" expanded v-model="competition.name"></b-input>
      </b-field>

      <b-field horizontal label="Date">
        <b-field>
          <b-datepicker
            placeholder="Date de début"
            icon="calendar-today"
            trap-focus
            v-model="competition.startDate"
          >
          </b-datepicker>
        </b-field>
        <b-field>
          <b-datepicker
            placeholder="Date de fin"
            icon="calendar-today"
            trap-focus
            v-model="competition.endDate"
          >
          </b-datepicker>
        </b-field>
      </b-field>

      <b-field horizontal label="Type">
        <b-select placeholder="Selectionner type de compétition" v-model="competition.type">
          <option v-for="type in typeCompetiton" :value="type">{{ type }}</option>
        </b-select>
      </b-field>

      <b-field horizontal grouped label="Adresse">
        <b-field>
          <b-input placeholder="Adresse" v-model="competition.address"></b-input>
        </b-field>
        <b-field expanded>
          <b-input placeholder="Ville" v-model="competition.city"></b-input>
        </b-field>
        <b-field expanded>
          <b-input placeholder="Code postal" v-model="competition.postalCode"></b-input>
        </b-field>
      </b-field>

      <b-field id="category" horizontal label="Categories" grouped>
        <FormCompetitionCategories :default-value="competition" v-on:category-value="addCategory" v-on:delete="removeCategory" :can-be-delete="true"></FormCompetitionCategories>
      </b-field>

      <b-field v-if="competition.categories.length > 0">
        <b-select
          multiple
          v-model="selectedOptions">
          <option v-for="(categorie, index) in competition.categories" :key="index" v-on:click="categoryIndex = index">
            <span>{{ categorie.sex }} - {{ categorie.name }}</span>
          </option>
        </b-select>
        <b-button v-if="selectedOptions.length > 0" icon-right="delete" type="is-danger" v-on:click="removeCategory"></b-button>
      </b-field>

      <div class="is-pulled-right">
        <b-button type="is-primary" tag="button" :loading="isLoading" v-on:click="registerCompetition">Valider compétition</b-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, PropSync, Vue } from "vue-property-decorator";
  import { CategoryName, Competition, Sex, TypeCompetition } from "~/definitions";
  import FormCompetitionCategories from "~/components/Form/FormCompetitionCategories.vue";
  import _ from "lodash";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";

  @Component({
    components: {FormCompetitionCategories}
  })
  export default class CompetitionForm extends Vue {
    @PropSync('testCompet', { type: Object }) internal_competition!: Competition
    categoryIndex: number | null = null
    selectedOptions = []
    typeCompetiton = TypeCompetition
    competition: Competition = {
      name: 'Chalais Savoyard',
      type: TypeCompetition.Bouldering,
      startDate: new Date('2020-04-25T14:50:54.009Z'),
      endDate: new Date('2020-04-25T14:50:54.009Z'),
      address: '19 Avenue Villejuif',
      city: 'Choisy',
      postalCode: '94420',
      categories: [
        {sex: Sex.Female, name: CategoryName.Benjamin}
      ]
    };
    isLoading = false

    async registerCompetition() {
      this.isLoading = true
      try {
        console.log('this.competition', this.competition)
        await ApiHelper.CreateCompetition(this.competition)
        this.$buefy.toast.open({
          type: 'is-success',
          message: "Compétition créée"
        })
        this.isLoading = false
      } catch(err) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: "Une erreur s'est produite"
        })
        this.isLoading = false
      }
    }

    async updateCompetition() {
      try {
        await ApiHelper.UpdateCompetition(this.internal_competition)
        this.$buefy.toast.open({
          type: 'is-success',
          message: "Compétition mise à jours"
        })
      } catch(err) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: "Une erreur s'est produite"
        })
      }
    }

    addCategory(result: any) {
      let competitionCategories = this.internal_competition && this.internal_competition.categories || this.competition && this.competition.categories
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

      console.log('alreadyexist', alreadyExist)
      if (!alreadyExist) competitionCategories.push(result)
    }

    removeCategory() {
      if (this.categoryIndex === null) return

      let competitionCategories = this.internal_competition && this.internal_competition.categories || this.competition && this.competition.categories

      if (this.categoryIndex === 0 && competitionCategories.length === 1) {
        competitionCategories = []
        return
      }
      competitionCategories.splice(this.categoryIndex, 1)
    }

    private competitionDTO(competition: Competition): any {
    }
  }
</script>

<style scoped>

</style>
