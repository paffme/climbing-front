<template>
  <b-field grouped>
    <b-field label="Sexe">
      <b-select :disabled="formIsValid" placeholder="Selectionner type de compétition" v-model="data.sex">
        <option v-for="sexe in sexes" :value="sexe">{{ sexe === sexes.Female ? 'Femme' : 'Homme' }}</option>
      </b-select>
    </b-field>
    <b-field label="Catégorie">
      <b-select :disabled="formIsValid" placeholder="Selectionner catégorie" v-model="data.category">
        <option v-for="name in categoryName" :value="name">{{ name }}</option>
      </b-select>
    </b-field>
    <template v-if="!formIsValid">
      <b-field label="Valider">
        <b-button icon-left="plus" type="is-success" v-on:click="emitData">Valider</b-button>
      </b-field>
    </template>
    <template v-else>
      <b-field label="Supprimer">
        <b-button icon-left="plus" type="is-danger" v-on:click="deleteInput">Supprimer</b-button>
      </b-field>
    </template>
  </b-field>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { CategoryName, CompetitionCategories, Sex } from "~/definitions/definitions";

  @Component({
    data: function() {
      return {
        sexes: Sex,
        categoryName: CategoryName
      }
    }
  })
  export default class FormCompetitionCategories extends Vue {
    @Prop(Boolean) canBeDelete?: boolean
    @Prop() defaultValue?: CompetitionCategories
    data = {
      sex: this.defaultValue?.sex,
      category: this.defaultValue?.name
    }
    formIsValid = false

    deleteInput() {
      if (!this.canBeDelete) {
        console.log('this.canBeDelete', this.canBeDelete)
        this.formIsValid = false
        console.log('this.formIsValid', this.formIsValid)
        this.$emit('delete')
        return
      }
      this.$emit('delete')
    }
    emitData() {
      this.$emit('category-value', this.data)
      this.formIsValid = true
    }
  }
</script>

<style scoped>

</style>
