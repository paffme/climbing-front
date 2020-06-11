<template>
  <b-field>
    <b-autocomplete
      v-model="name"
      class="userInput"
      rounded
      icon="magnify"
      placeholder="Jean Valjean"
      :data="suggestedUsers || []"
      field="name"
      @typing="fetchSuggestedUsers(name)"
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
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { User } from '~/definitions'

@Component
export default class SearchUser extends Vue {
  name: string | null = null
  selected: { name: string; id: number } | null = null
  suggestedUsers: Array<{ name: string; id: number }> = []

  confirmChoice(user: { name: string; id: number }) {
    this.$emit('select', user)
    this.name = null
  }

  async fetchSuggestedUsers(input: string | null): Promise<void | null> {
    if (!input) return

    if (input.length < 2) {
      this.suggestedUsers = []
      return
    }
    const query = { lastName: { $re: input } }
    const response = await ApiHelper.GetUsers(JSON.stringify(query))
    if (!response) return null

    this.suggestedUsers = this.dtoUser(response.data)
  }

  dtoUser(users: User[]): Array<{ name: string; id: number }> {
    return users.map((user) => {
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`
      }
    })
  }
}
</script>

<style scoped></style>
