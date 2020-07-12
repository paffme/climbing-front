<template>
  <div id="roles" class="columns">
    <div class="column is-3">
      <p class="_title">
        Voir mon profil en tant que :
      </p>
      <b-select v-model="selectedRole" expanded @input="getCompetitions">
        <option v-for="(role, index) in roleName" :key="index" :value="role">
          {{ getRoleName(role) }}
        </option>
      </b-select>
    </div>
    <div id="content" class="column is-9">
      <h1 class="title">
        {{ getRoleName(selectedRole) }}
      </h1>

      <template v-if="isLoading">
        <b-loading
          :is-full-page="false"
          :active.sync="isLoading"
          :can-cancel="true"
        ></b-loading>
      </template>
      <template
        v-else-if="!isLoading && competitions && competitions.length === 0"
      >
        <p class="subtitle">
          Vous n'avez aucun rôle d'attribué
        </p>
      </template>
      <template v-else>
        <template v-for="competition in competitions">
          <ShowCompetitionComponent
            :key="competition.id"
            :competition="competition"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { APICompetition, RoleName } from '~/definitions'
import { AxiosHelper } from '~/utils/axiosHelper'
import { RolesBuilder } from '~/utils/api_helper/RolesBuilder'
import ShowCompetitionComponent from '~/components/ShowCompetitionComponent.vue'
import { getRoleName } from '~/utils/wording-role'

@Component({
  components: { ShowCompetitionComponent }
})
export default class UserRolesCompetitions extends Vue {
  @Prop(Number) userId!: number
  roleName = RoleName
  selectedRole = RoleName.Juges
  isLoading = true
  competitions: APICompetition[] | null = null

  created() {
    this.getCompetitions(this.selectedRole)
  }

  getRoleName(roleName: RoleName): string {
    const displayRoleName = getRoleName(roleName)
    return displayRoleName[0].toUpperCase() + displayRoleName.substr(1)
  }

  async getCompetitions(role: RoleName) {
    this.isLoading = true
    try {
      const rolesAPI = RolesBuilder.getRoles(role)
      if (!rolesAPI) throw new Error('No role has been found')
      const { data } = await rolesAPI.getCompetitionFromRole(this.userId)
      this.competitions = data
      this.isLoading = false
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style scoped>
strong {
  color: inherit;
}

.media {
  padding: 10px;
}
.competitions {
  text-decoration: none;
  color: black;
}
.competitions:hover {
  background-color: #03378c;
  color: white !important;
}
.icon {
  margin: 0 10px;
}
.icon:hover {
  color: white !important;
}
._title {
  margin-bottom: 15px;
}
#content {
  height: 100vh;
}
</style>
