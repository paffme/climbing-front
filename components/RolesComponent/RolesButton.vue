<template>
  <b-button type="is-info" rounded icon="add" @click="$emit('click')">
    {{ text }}
  </b-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  data() {
    return {
      text: 'Ajouter un utilisateur'
    }
  }
})
export default class RolesButton extends Vue {}
</script>

<style scoped></style>
