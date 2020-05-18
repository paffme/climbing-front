<template>
  <b-field v-if="categories" label="Rounded">
    {{ selected }}
    <b-select
      v-model="selected"
      placeholder="Selectionner une catégorie"
      rounded
      @input="$emit('select', selected)"
    >
      <template v-for="category in categories">
        <option
          v-for="(genre, key) in category.genre"
          :key="key"
          :value="{ category: category.category, genre }"
        >
          {{ category.category + ' - ' + genre }}
        </option>
      </template>
    </b-select>
  </b-field>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CategoriesSelect } from '~/definitions'

@Component
export default class BouldersSelectCategories extends Vue {
  @Prop(Array) categories!: CategoriesSelect[]
  selected = null
}
</script>

<style scoped></style>
