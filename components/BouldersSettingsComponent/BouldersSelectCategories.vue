<template>
  <b-field v-if="categoryCanBeSelected" label="Sélectionner la catégorie">
    <b-select
      v-model="selected"
      placeholder="Sélectionner une catégorie"
      rounded
      @input="$emit('select', selected)"
    >
      <template v-for="category in categoryCanBeSelected">
        <option
          v-for="(genre, key) in category.genre"
          :key="category.category + key"
          :value="{ category: category.category, genre }"
        >
          {{ wordingCategory(category.category) + ' - ' }}
          {{ genre === 'male' ? 'Homme' : 'Femme' }}
        </option>
      </template>
    </b-select>
  </b-field>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { CategoriesSelect, CurrentCategory } from '~/definitions'
import WordingCategory from '~/utils/wordingCategory'

@Component
export default class BouldersSelectCategories extends Vue {
  @Prop(Array) categoryCanBeSelected!: CategoriesSelect[]
  @Prop(Object) currentSelect!: CurrentCategory
  @Watch('currentSelect', { immediate: true, deep: true })
  onCurrentSelectChange(val: CurrentCategory) {
    this.selected = val
  }

  selected: { category: string; genre: string } | null = null
  wordingCategory = WordingCategory

  mounted() {
    const category =
      (this.categoryCanBeSelected &&
        this.categoryCanBeSelected[0] &&
        this.categoryCanBeSelected[0].category) ||
      undefined
    const genre =
      (this.categoryCanBeSelected &&
        this.categoryCanBeSelected[0] &&
        this.categoryCanBeSelected[0].genre &&
        this.categoryCanBeSelected[0].genre[0]) ||
      undefined
    if (!category && !genre) {
      this.selected = null
      return
    }
    this.selected = {
      category,
      genre
    }
  }
}
</script>

<style scoped></style>
