<template>
  <b-field grouped>
    <b-field>
      <b-select placeholder="Selectionner type de compétition" v-model="newVal.sex">
        <option v-for="sexe in sexes" :value="sexe">{{ sexe === sexes.Female ? 'Femme' : 'Homme' }}</option>
      </b-select>
    </b-field>
    <b-field>
      <b-select placeholder="Selectionner catégorie" v-model="newVal.name">
        <option v-for="name in categoryName" :value="name">{{ name }}</option>
      </b-select>
    </b-field>
    <template>
      <b-field>
        <b-button icon-left="plus" type="is-success" v-on:click="emitData">Valider</b-button>
      </b-field>
    </template>
  </b-field>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { CategoryName, CompetitionCategories, Sex } from "~/definitions";

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
    newVal = {
      sex: null,
      name: null
    }

    deleteInput() {
      this.$emit('delete')
    }
    emitData() {
      this.$emit('category-value', this.newVal)
      this.newVal = {
        sex: null,
        name: null
      }
    }
  }
</script>

<style scoped>

</style>
