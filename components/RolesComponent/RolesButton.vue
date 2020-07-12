<template>
  <b-button type="is-info" rounded icon="add" @click="$emit('click')">
    {{ text }}
  </b-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RoleName } from '~/definitions'
import { getRoleName } from '~/utils/wording-role'

@Component({})
export default class RolesButton extends Vue {
  @Prop(String) roleName!: RoleName
  text = `Ajouter un ${getRoleName(this.roleName)}`
}
</script>

<style scoped></style>
