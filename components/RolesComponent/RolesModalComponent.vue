<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Ajouter un nouveau role
      </p>
    </header>
    <div class="card-content">
      <span class="description-text"
        >Trouver un utilisateur via son nom et/ou prénom</span
      >
      <div class="custom-field">
        <b-field>
          <b-autocomplete
            id="userInput"
            v-model="name"
            rounded
            icon="magnify"
            placeholder="Jean Valjean"
            :data="suggestedUsers || []"
            field="name"
            @typing="$emit('input', name)"
            @select="(option) => (selected = option)"
          >
            <template slot-scope="props">
              {{ props.option.name }}#{{ props.option.id }}
            </template>
            <template slot="empty">
              Aucun résultat trouvée
            </template>
          </b-autocomplete>
          <b-button
            type="is-info"
            :disabled="!selected"
            icon="check"
            @click="confirmChoice(selected)"
          >
            Ajouter
          </b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class RolesModalComponent extends Vue {
  @Prop(Array) suggestedUsers!: Array<{ name: string; id: number }>
  name: string | null = null
  selected: { name: string; id: number } | null = null

  confirmChoice(user: { name: string; id: number }) {
    this.$emit('select', user)
    this.name = null
  }
}
</script>

<style scoped>
.description-text {
  margin: 20px 0;
}
.custom-field {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
