<template>
  <div class="columns is-multiline">
    <div v-if="role.organizer" class="roles column is-4">
      <RolesComponent
        :role-name="roleName.Organisateur"
        :competition-id="competitionId"
        @onSelect="loadRoles"
      />
    </div>
    <div v-if="role.organizer" class="roles column is-4">
      <RolesComponent
        :role-name="roleName.President"
        :competition-id="competitionId"
        @onSelect="loadRoles"
      />
    </div>
    <div v-if="role.organizer || role.juryPresident" class="roles column is-4">
      <RolesComponent
        :role-name="roleName.ChefRouteSetter"
        :competition-id="competitionId"
        @onSelect="loadRoles"
      />
    </div>
    <div v-if="role.juryPresident" class="roles column is-4">
      <RolesComponent
        :role-name="roleName.Juges"
        :competition-id="competitionId"
        @onSelect="loadRoles"
      />
    </div>
    <div v-if="role.juryPresident" class="roles column is-4">
      <RolesComponent
        :role-name="roleName.DelegueTechnique"
        :competition-id="competitionId"
        @onSelect="loadRoles"
      />
    </div>
    <div v-if="role.chiefRouteSetter" class="roles column is-4">
      <RolesComponent
        :role-name="roleName.RouteSetter"
        :competition-id="competitionId"
        @onSelect="loadRoles"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIUserCompetitionRoles, RoleName } from '~/definitions'
import RolesComponent from '~/components/RolesComponent/RolesComponent.vue'

@Component({
  components: { RolesComponent }
})
export default class Roles extends Vue {
  @Prop(Object) role!: APIUserCompetitionRoles
  @Prop(Number) competitionId!: number

  roleName = RoleName

  loadRoles() {
    this.$emit('onFetchRole')
  }
}
</script>

<style scoped></style>
