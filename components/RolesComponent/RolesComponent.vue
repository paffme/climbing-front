<template>
  <div class="panel">
    <p class="panel-heading">Liste des {{ roleName }}</p>
    <div class="panel-block">
      <div class="panel-block-content">
        <template
          v-if="
            userWithRoles &&
            Array.isArray(userWithRoles) &&
            userWithRoles.length > 0
          "
        >
          <RolesListComponent :users="userWithRoles" @remove="onRemove" />
          <RolesButton
            class="rolesbtn is-pulled-right"
            @click="modalIsActive = true"
          ></RolesButton>
        </template>
        <template v-else>
          <RolesEmptyComponent :role-name="roleName" />
          <RolesButton
            class="rolesbtn is-pulled-right"
            @click="modalIsActive = true"
          ></RolesButton>
        </template>
      </div>
    </div>

    <b-modal
      :active.sync="modalIsActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
      @close="onCloseModal"
    >
      <RolesModalComponent
        :suggested-users="suggestedUsers"
        @input="fetchSuggestedUsers"
        @select="onSelect"
      ></RolesModalComponent>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIUser, RoleName, User } from '~/definitions'
import { RolesAPI } from '~/utils/api_helper/RolesAPI/RolesAPI'
import RolesListComponent from '~/components/RolesComponent/RolesListComponent.vue'
import RolesEmptyComponent from '~/components/RolesComponent/RolesEmptyComponent.vue'
import RolesButton from '~/components/RolesComponent/RolesButton.vue'
import RolesModalComponent from '~/components/RolesComponent/RolesModalComponent.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { RolesBuilder } from '~/utils/api_helper/RolesBuilder'

@Component({
  components: {
    RolesModalComponent,
    RolesListComponent,
    RolesEmptyComponent,
    RolesButton
  }
})
export default class RolesComponent extends Vue {
  @Prop(String) roleName!: RoleName
  @Prop(Number) competitionId!: number

  modalIsActive: boolean = false

  suggestedUsers: { name: string; id: number }[] | null = null
  userWithRoles: User[] = []
  rolesApi: RolesAPI | null = null

  async created() {
    this.rolesApi = RolesBuilder.getRoles(this.roleName)
    this.userWithRoles = await this.fetchUserWithRoles(this.competitionId)
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

  async fetchUserWithRoles(competitionId: number): Promise<APIUser[]> {
    const axiosResponse = await this.rolesApi?.get(competitionId)

    if (!axiosResponse?.data || !Array.isArray(axiosResponse.data)) return []

    return axiosResponse.data
  }

  dtoUser(users: User[]): Array<{ name: string; id: number }> {
    return users.map((user) => {
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`
      }
    })
  }

  async onSelect(user: { name: string; id: number }): Promise<void> {
    try {
      await this.addRoles(this.competitionId, user.id)
      this.userWithRoles = await this.refreshUsersWithRole()
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Role ajouté'
      })
    } catch (err) {
      if (err.response.status === 409) {
        this.$buefy.toast.open({
          type: 'is-info',
          message: `Possède déjà le role ${this.roleName}`
        })
      }
      console.log('onSelect event Error - ', err)
    }
  }

  onCloseModal() {
    this.suggestedUsers = []
    this.modalIsActive = false
  }

  onRemove(user: APIUser) {
    this.$buefy.dialog.confirm({
      type: 'is-danger',
      hasIcon: true,
      title: "Suppression d'un role",
      message: `Voulez vraiment supprimer ${user.firstName} ${user.lastName} ?`,
      onConfirm: () => this.remove(user),
      cancelText: 'Non',
      confirmText: 'Oui'
    })
  }

  async remove(user: APIUser) {
    try {
      await this.rolesApi?.remove(this.competitionId, user.id)
      this.userWithRoles = await this.refreshUsersWithRole()
    } catch (err) {
      if (err.response.status === 400) {
        this.$buefy.toast.open({
          type: 'is-info',
          message: 'Vous ne pouvez pas vous supprimer vous même'
        })
      }
      console.log(err)
    }
  }

  async addRoles(competitionId: number, userId: number) {
    return this.rolesApi?.add(competitionId, userId)
  }

  async refreshUsersWithRole(): Promise<APIUser[]> {
    return this.fetchUserWithRoles(this.competitionId)
  }
}
</script>

<style scoped>
.panel-block-content {
  width: 100%;
  padding-top: 10px;
}

.rolesbtn {
  margin-top: 10px;
}
#empty-roles {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
