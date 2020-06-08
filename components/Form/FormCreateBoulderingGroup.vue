<template>
  <form @submit.prevent="$emit('create', groupName)">
    <b-field>
      <b-input
        v-model="groupName"
        placeholder="Nom du groupe"
        required
      ></b-input>
      <p class="control">
        <b-button
          type="is-success"
          native-type="submit"
          :disabled="groupName && groupName.length === 0"
        >
          Ajouter
        </b-button>
      </p>
    </b-field>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class FormCreateBoulderingGroup extends Vue {
  groupName: string | null = null
}
</script>

<style scoped></style>
