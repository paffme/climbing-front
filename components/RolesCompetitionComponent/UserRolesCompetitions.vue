<template>
  <div id="roles" class="columns">
    <div class="column is-3">
      <p>Voir mon profile en tant que :</p>
      <b-select v-model="selectedRole" expanded @input="getCompetitions">
        <option v-for="(role, index) in roleName" :key="index" :value="role">
          {{ role }}
        </option>
      </b-select>
    </div>
    <div class="column is-9">
      <h1 class="title">
        {{ selectedRole }}
      </h1>

      <template v-if="isLoading">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
        <!--<template v-for="i in sampleMedia">
          <article :key="i" class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <b-skeleton width="64px" height="64px"></b-skeleton>
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong><b-skeleton active></b-skeleton></strong>
                  <b-skeleton active height="100"></b-skeleton>
                </p>
              </div>
            </div>
            <div class="media-right">
              <b-skeleton active width="140" height="40"></b-skeleton>
            </div>
          </article>
        </template>-->
      </template>
      <template v-else-if="!isLoading && competitions && competitions.length === 0">
        <p class="subtitle">Vous n'avez aucun rôle attribué</p>
      </template>
      <template v-else>
        <template v-for="competition in competitions">
          <nuxt-link :to="`/competitions/${competition.id}`">
            <article :key="competition.id" class="media competitions">
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
                  <nuxt-link :to="`/competitions/${competition.id}`">
                    <span class="button is-success">Voir la compétition</span>
                  </nuxt-link>
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
import { Component, Vue } from 'vue-property-decorator'
import moment from 'moment'
import {
  APICompetition,
  CategoryName,
  RoleName,
  Sex,
  TypeCompetition
} from '~/definitions'
import { AxiosHelper } from '~/utils/axiosHelper'
import { RolesBuilder } from "~/utils/api_helper/RolesBuilder";
import AuthUser from "~/store/authUser";
import { authUser } from "~/utils/store-accessor";

@Component({
  filters: {
    formatDate: (dirtyDate: Date): string => {
      moment.locale('fr')
      return moment(dirtyDate).format('LLLL')
    }
  }
})
export default class UserRolesCompetitions extends Vue {
  roleName = RoleName
  selectedRole = RoleName.Juges
  sampleMedia = 3
  isLoading = true
  competitions: APICompetition[] | null = null

  created() {
    this.getCompetitions(this.selectedRole)
  }
  async getCompetitions(role: RoleName) {
    console.log('input')
    this.isLoading = true
    try {
      console.log('role', role)
      const rolesAPI = RolesBuilder.getRoles(role)
      if (!rolesAPI) throw new Error('No role has been found')
      const { data } = await rolesAPI.getCompetitionFromRole(authUser.Credentials!.id as number)
      this.competitions = data
      this.isLoading = false
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style scoped>
.competition-info {
  margin-left: 5px;
}

strong {
  color: inherit;
}

.media {
  padding: 10px;
}

.competitions:hover {
  background-color: #03378c;
  color: white !important;
}
</style>
