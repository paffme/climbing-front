<template>
  <b-field v-if="categoryCanBeSelected" label="Selectionner la catégories">
    <b-select
      v-model="selected"
      placeholder="Selectionner une catégorie"
      rounded
      @input="$emit('select', selected)"
    >
      <template v-for="category in categoryCanBeSelected">
        <option
          v-for="(genre, key) in category.genre"
          :key="category.category + key"
          :value="{ category: category.category, genre }"
        >{{ category.category + ' - ' + genre }}
        </option>
      </template>
    </b-select>
  </b-field>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CategoriesSelect } from '~/definitions'

@Component({
  data() {
    return {
      selected: null
    }
  }
})
export default class BouldersSelectCategories extends Vue {
  @Prop(Array) categoryCanBeSelected!: CategoriesSelect[]
  selected: {category: string, genre: string} | null = null

  created() {
    this.selected = { "category": this.categoryCanBeSelected[0].category, "genre": this.categoryCanBeSelected[0].genre[0] }
  }
}
</script>

<style scoped></style>
