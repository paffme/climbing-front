<template>
  <div id="roles" class="columns">
    <div class="column is-3">
      <p class="_title">
        Voir mon profile en tant que :
      </p>
      <b-select v-model="selectedRole" expanded @input="getCompetitions">
        <option v-for="(role, index) in roleName" :key="index" :value="role">
          {{ role }}
        </option>
      </b-select>
    </div>
    <div id="content" class="column is-9">
      <h1 class="title">
        {{ selectedRole }}
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
          Vous n'avez aucun rôle attribué
        </p>
      </template>
      <template v-else>
        <template v-for="competition in competitions">
          <nuxt-link
            :key="competition.id"
            :to="`/competitions/${competition.id}`"
          >
            <article class="media competitions">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ competition.name }}</strong>
                    <small>Il y a deux jours</small>
                    <br />
                    {{ competition.description }}
                    <br />
                    {{ competition.address }} |
                    {{ competition.startDate | formatDate }}
                  </p>
                </div>
              </div>
              <div class="media-right">
                <p class="level-item">
                  <b-tooltip label="Editer la compétition">
                    <nuxt-link :to="`/competitions/edit/${competition.id}`">
                      <b-icon
                        class="icon"
                        type="is-info"
                        icon="square-edit-outline"
                      >
                      </b-icon>
                    </nuxt-link>
                  </b-tooltip>
                  <b-tooltip label="Aller à la compétition">
                    <nuxt-link :to="`/competitions/${competition.id}`">
                      <b-icon
                        class="icon"
                        type="is-info"
                        icon="arrow-right-bold-circle"
                      >
                      </b-icon>
                    </nuxt-link>
                  </b-tooltip>
                </p>
              </div>
            </article>
          </nuxt-link>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import moment from 'moment'
import { APICompetition, RoleName } from '~/definitions'
import { AxiosHelper } from '~/utils/axiosHelper'
import { RolesBuilder } from '~/utils/api_helper/RolesBuilder'

@Component({
  filters: {
    formatDate: (dirtyDate: Date): string => {
      moment.locale('fr')
      return moment(dirtyDate).format('LLLL')
    }
  }
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

  async getCompetitions(role: RoleName) {
    this.isLoading = true
    try {
      const rolesAPI = RolesBuilder.getRoles(role)
      if (!rolesAPI) throw new Error('No role has been found')
      const { data } = await rolesAPI.getCompetitionFromRole(this.userId)
      console.log('role', data)
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
