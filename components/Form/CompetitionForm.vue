<template>
  <div>
    <div class="block">
      <span class="subtitle">Configuration de la compétition</span>
    </div>
    <form v-on:submit.prevent="registerCompetition()" id="form">
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
        <FormCompetitionCategories :default-value="competition" v-on:category-value="addCategory" v-on:delete="removeCategory(index)" :can-be-delete="true"></FormCompetitionCategories>
      </b-field>

      <div class="is-pulled-right">
        <b-button type="is-primary" tag="button" v-on:click="registerCompetition">Valider compétition</b-button>
      </div>
    </form>
    <ul>
      <li v-for="categorie in competition.categories">
        {{ categorie.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import { Competition, TypeCompetition } from "~/definitions";
  import FormCompetitionCategories from "~/components/Form/FormCompetitionCategories.vue";

  @Component({
    components: {FormCompetitionCategories}
  })
  export default class CompetitionForm extends Vue {
    competition: Competition = {
      name: null,
      type: null,
      startDate: null,
      endDate: null,
      address: null,
      city: null,
      postalCode: null,
      categories: []
    };
    typeCompetiton = TypeCompetition

    registerCompetition() {
      console.log('this.competition', this.competition)
    }

    addCategory(data: any) {
      console.log('this.competition.categories', this.competition.categories)
      this.competition.categories.push(data)
    }

    removeCategory(index: number) {
      this.competition.categories.splice(index, 1)

    }
  }
</script>

<style scoped>

</style>
