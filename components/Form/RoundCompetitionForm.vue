<template>
  <form v-on:submit.prevent="addRound">
     <b-field label="Catégorie">
       <b-select v-model="Form.input.category">
         <option v-for="category in categoriesName" :value="category">{{ category }}</option>
       </b-select>
     </b-field>
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
      <b-input v-model="Form.input.name"></b-input>
    </b-field>
    <b-field grouped>
      <b-field label="Quota">
        <b-input v-model="Form.input.quota"></b-input>
      </b-field>
      <b-field label="Boulders">
        <b-input v-model="Form.input.boulders"></b-input>
      </b-field>
    </b-field>
    <b-button native-type="submit" type="is-success">Créer un round</b-button>
  </form>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import { CategoryName, FormBoulderingRound, Sex } from "~/definitions";

  @Component
  export default class RoundCompetitionForm extends Vue {
    categoriesName = CategoryName
    sex = Sex
    Form: FormBoulderingRound = {
      error: false,
      success: false,
      isLoading: false,
      input: {
        category: undefined,
        sex: undefined,
        index: 0,
        name: undefined,
        quota: 0,
        boulders: 0,
        rankingType: 'CIRCUIT',
        type: 'QUALIFIER',
        groups: 0
      }
    }

    addRound() {
      alert('Add round')
      console.log('this.Form', this.Form)
    }
  }
</script>

<style scoped>

</style>
