<template>
  <div>
    <div class="panel-block">
      <b-field label="Selectionner le nom">
        <b-autocomplete
          rounded
          :data="initUser"
          placeholder="Pierrot Martinez"
          icon="magnify"
          clearable
          @select="(option) => fillArray(option)"
        >
          <template slot="empty">
            No results found
          </template>
          <template slot-scope="props">
            <p>
              {{ `${props.option.firstName} ${props.option.lastName}` }}
            </p>
          </template>
        </b-autocomplete>
      </b-field>
    </div>
    <template v-if="internalUsers.length > 0">
      <ul>
        <li
          v-for="(user, index) in internalUsers"
          :key="user.id"
          class="panel-block is-active"
        >
          <nuxt-link :to="'/user/' + user.id">
            <p>
              {{ `${user.firstName} ${user.lastName}` }}
            </p>
          </nuxt-link>
          <b-button
            :key="user.id"
            type="is-danger"
            :loading="btnLoading"
            icon-right="delete"
            @click="removeItem(index, user.id)"
          />
        </li>
      </ul>
    </template>
    <template v-if="internalUsers.length === 0">
      <ul v-if="!isLoading">
        <li class="panel-block is-active">
          Aucun utilisateur ajouté
        </li>
      </ul>
    </template>
    <ul v-if="isLoading">
      <li class="panel-block">
        <b-skeleton width="100%" :animated="true" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIUser, RoleName } from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'

@Component
export default class TabUserSelector extends Vue {
  @Prop(String) readonly role!: string
  internalUsers: Array<APIUser> = []
  initUser: Array<APIUser> = []
  isLoading = false
  btnLoading = false

  mounted() {
    let request
    if (this.role === RoleName.President) {
      request = ApiHelper.GetJuryPresidents
    }
    if (this.role === RoleName.Juges) {
      request = ApiHelper.GetJudges
    }
    if (this.role === RoleName.ChefRouteSetter)
      request = ApiHelper.GetChiefRouteSetters
    if (this.role === RoleName.RouteSetter) request = ApiHelper.GetRouteSetters
    if (this.role === RoleName.DelegueTechnique)
      request = ApiHelper.GetTechnicalDelegates
    if (this.role === RoleName.Organisateur) request = ApiHelper.GetOrganizers

    this.makeGetRequest(request)
  }

  fillArray(user: APIUser | null) {
    if (!user) {
      return
    }
    this.isLoading = true
    if (this.internalUsers.includes(user)) {
      this.$buefy.toast.open({
        message: 'Utilisateurs déjà existant',
        type: 'is-danger'
      })
      this.isLoading = false
      return
    }
    setTimeout(async () => {
      const request = this.getRequest('UPDATE', this.role)

      await this.makeAddOrRemoveRequest(request, user.id)
      this.isLoading = false
      this.internalUsers.push(user as never)
    }, 1500)
  }

  removeItem(index: number, userId: number): void {
    if (!this.internalUsers) {
      return
    }
    this.btnLoading = true
    setTimeout(async () => {
      const request = this.getRequest('DELETE', this.role)

      await this.makeAddOrRemoveRequest(request, userId)
      await Promise.resolve()
      this.btnLoading = false
      this.internalUsers.splice(index, 1)
    }, 1500)
  }

  getRequest(
    typeRequest: 'DELETE' | 'UPDATE',
    role: string
  ): (competitionId: number, userId: number) => any {
    if (role === RoleName.President) {
      return typeRequest === 'DELETE'
        ? ApiHelper.RemoveJuryPresident
        : ApiHelper.AddJuryPresident
    }
    if (role === RoleName.Juges) {
      return typeRequest === 'DELETE'
        ? ApiHelper.RemoveJudge
        : ApiHelper.AddJudge
    }
    if (role === RoleName.ChefRouteSetter) {
      return typeRequest === 'DELETE'
        ? ApiHelper.RemoveChiefRouteSetters
        : ApiHelper.AddChiefRouteSetters
    }
    if (role === RoleName.RouteSetter) {
      return typeRequest === 'DELETE'
        ? ApiHelper.RemoveRouteSetters
        : ApiHelper.AddRouteSetters
    }
    if (role === RoleName.DelegueTechnique) {
      return typeRequest === 'DELETE'
        ? ApiHelper.RemoveTechnicalDelegates
        : ApiHelper.AddTechnicalDelegates
    }
    if (role === RoleName.Organisateur) {
      return typeRequest === 'DELETE'
        ? ApiHelper.RemoveOrganizers
        : ApiHelper.AddOrganizers
    }

    throw new Error('No role was found')
  }

  async makeAddOrRemoveRequest(
    request: (competitionId: number, userId: number) => any,
    userId: number
  ): Promise<void> {
    try {
      if (!this.$route.params?.competitionId) {
        return
      }
      await request(parseInt(this.$route.params.competitionId), userId)
    } catch (err) {
      console.log('makeAddOrRemoveRequest - Err', err)
    }
  }

  async makeGetRequest(
    request?: (competitionId: number) => any
  ): Promise<void> {
    if (!request) {
      return
    }
    try {
      if (!this.$route.params?.competitionId) {
        return
      }
      // const result = await request(parseInt(this.$route.params.competitionId))
      this.initUser = [
        {
          createdAt: '2020-04-23T23:13:37.202Z',
          updatedAt: '2020-04-23T23:13:37.202Z',
          id: 0,
          club: null,
          birthYear: 22,
          email: 'string',
          firstName: 'Pierre',
          lastName: 'Emanuel'
        },
        {
          createdAt: '2020-04-23T23:13:37.202Z',
          updatedAt: '2020-04-23T23:13:37.202Z',
          id: 1,
          birthYear: 22,
          club: null,
          email: 'string',
          firstName: 'Marcus',
          lastName: 'Garvey'
        }
      ]
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
.panel-block {
  display: flex;
  justify-content: space-between;
}
</style>
