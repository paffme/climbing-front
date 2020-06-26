<template>
  <div id="one-competition" class="columns is-multiline">
    <template v-if="competition">
      <div class="page_header column is-12">
        <div class="columns">
          <div class="column is-1">
            <GoBackBtn />
          </div>
          <div class="column is-8">
            <h1 class="title has-text-centered">
              {{ competition.name }}
            </h1>
          </div>
          <div class="column is-3">
            <template v-if="!competition.cancelled && !competitionIsEnded">
              <BtnEditOrRegisterCompetition
                :is-loading="editOrRegisterBtn.status.isLoading"
                :success="editOrRegisterBtn.status.success"
                :is-already-register="isAlreadyRegister"
                :competition-id="competition.id"
                :is-authenticated="isAutenthicated"
                :user-has-role="userHasRole"
                @register="onRegisterCompetition"
              />
            </template>
          </div>
        </div>
      </div>

      <div class="column is-12">
        <b-notification
          v-if="competitionIsEnded"
          type="is-warning"
          :closable="false"
          has-icon
        >
          Cette compétition est terminé
        </b-notification>
        <b-notification
          v-if="competition.cancelled"
          type="is-danger"
          :closable="false"
          has-icon
        >
          Cette compétition est annulé
        </b-notification>
      </div>

      <div class="column is-12">
        <BreadcrumbComponent :current-page="competition.name" />
      </div>

      <div class="custom_section page_content column is-12">
        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="content">
              <h1 class="title">
                {{ competition.name }}
              </h1>
              <p>
                {{ competition.description }}
              </p>
              <b-tag :type="competition.open ? 'is-success' : 'is-warning'">
                {{
                  competition.open ? 'Compétition open' : 'Competition non open'
                }}
              </b-tag>
              <ul id="detail">
                <li>
                  Date début :
                  <b-tag type="is-info">
                    {{ competition.startDate | formatDate }}
                  </b-tag>
                </li>
                <li>
                  Date fin :
                  <b-tag type="is-danger">
                    {{ competition.endDate | formatDate }}
                  </b-tag>
                </li>
                <li>
                  Type compétition :
                  <b-tag>{{ competition.type | capitalize }}</b-tag>
                </li>
                <li>
                  Adresse :
                  <span
                    >{{ competition.address }} -
                    {{ competition.postalCode }}</span
                  >
                </li>
                <li>
                  Lieu : <b-tag>{{ competition.city | capitalize }}</b-tag>
                </li>
                <li>
                  Heure d'accueil :
                  <span>{{ competition.welcomingDate | formatDate }}</span>
                </li>
                <li>
                  Catégorie:
                  <ul class="category-list">
                    <li
                      v-for="(categorie, index) in competition.categories"
                      :key="index"
                      class="category"
                    >
                      <b-tag>
                        <b-icon
                          size="is-small"
                          :icon="
                            categorie.sex === 'female'
                              ? 'gender-female'
                              : 'gender-male'
                          "
                        >
                        </b-icon>
                        {{ categorie.sex === 'female' ? 'Femme' : 'Homme' }} -
                        {{ categorie.name | capitalize }}
                      </b-tag>
                    </li>
                  </ul>
                </li>
                <hr />
                <li class="detail_text">
                  <h1 class="subtitle is-size-4">
                    Programme :
                  </h1>
                  <span>
                    {{ competition.agenda }}
                  </span>
                </li>
              </ul>

              <div>
                <div class="is-pulled-left">
                  <b-button
                    tag="nuxt-link"
                    :to="{
                      name: 'competitions-id-rank',
                      params: { id: competition.id }
                    }"
                  >
                    Voir classement
                  </b-button>
                </div>
                <div
                  v-if="!competition.cancelled && !competitionIsEnded"
                  class="is-pulled-right"
                >
                  <BtnEditOrRegisterCompetition
                    :is-loading="editOrRegisterBtn.status.isLoading"
                    :success="editOrRegisterBtn.status.success"
                    :is-already-register="isAlreadyRegister"
                    :competition-id="competition.id"
                    :is-authenticated="isAutenthicated"
                    :user-has-role="userHasRole"
                    @register="onRegisterCompetition"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="column is-6"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="column is-offset-2 is-8 is-flex not-found">
        <h1 class="title">
          Aucune compétition trouvée
        </h1>
        <b-button @click="$router.push('/')">
          Revenir au tableau de bord
        </b-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import moment from 'moment'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'
import {
  CategoryName,
  Competition,
  CompetitionsRegistrations,
  RoleNameQueryParams,
  Sex
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { authUser } from '~/utils/store-accessor'
import AuthUser from '~/store/authUser'
import BtnEditOrRegisterCompetition from '~/components/Button/BtnEditOrRegisterCompetition.vue'
import BreadcrumbComponent from '~/components/BreadcrumbComponent.vue'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({
  components: {
    GoBackBtn,
    BtnEditOrRegisterCompetition,
    BreadcrumbComponent
  },
  middleware: ['setHeader'],
  filters: {
    formatDate: (dirtyDate: Date): string => {
      moment.locale('fr')
      return moment(dirtyDate).format('LLLL')
    },
    capitalize: (value: string) => {
      if (!value) {
        return ''
      }
      value = value.toString()
      return value[0].toUpperCase() + value.slice(1)
    }
  },
  data() {
    return {
      Moment: moment,
      roleNameQueryParams: RoleNameQueryParams,
      categories: CategoryName,
      sexes: Sex,
      AuthUser: authUser
    }
  }
})
export default class OneCompetition extends Vue {
  competition: Competition | null = null
  isAlreadyRegister: boolean = false
  isLoading = true

  userHasRole: boolean = false
  competitionIsEnded: boolean = false
  // @ts-ignore
  isAutenthicated = AuthUser.getters?.['Authenticated']() || false
  // @ts-ignore
  credentials = AuthUser.getters?.['Credentials']() || false

  editOrRegisterBtn = {
    status: {
      isLoading: false,
      success: false
    }
  }

  async mounted() {
    const competitionId = this.$route.params.id
      ? parseInt(this.$route.params.id)
      : undefined

    if (!competitionId) {
      this.$buefy.toast.open({
        type: 'is-danger',
        message: 'Aucune compétition trouvé avec cette identifiant'
      })
      return
    }

    try {
      const result = await ApiHelper.GetCompetition(competitionId)
      this.competition = result.data
      this.isAlreadyRegister = await this.checkIfUserIsRegisterToCompetition(
        competitionId
      )
      console.log('this.isAlreadyRegister', this.isAlreadyRegister)
      this.competitionIsEnded = this.checkCompetitionIsEnded(
        this.competition.endDate
      )
      await this.checkUserRole(competitionId)
      this.isLoading = false
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async onRegisterCompetition() {
    try {
      this.editOrRegisterBtn.status.isLoading = true

      if (!this.competition?.id) {
        throw new Error(
          `Should specify the id - ${this.credentials} - was found`
        )
      }

      await ApiHelper.AddCompetitor(
        this.competition.id as number,
        this.credentials.id as number
      )
      this.editOrRegisterBtn.status.isLoading = false
      this.editOrRegisterBtn.status.success = true
      this.isAlreadyRegister = true
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Vous êtes désormais inscrit à la compétition'
      })
    } catch (err) {
      this.editOrRegisterBtn.status.isLoading = false
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  checkCompetitionIsEnded(endDate?: Date | null): boolean {
    if (!endDate) return true
    return moment(moment(endDate).format()).isBefore(moment().format())
  }

  async checkIfUserIsRegisterToCompetition(
    competitionId: number
  ): Promise<boolean> {
    try {
      const result = await ApiHelper.GetRegistrationsForACompetition(
        competitionId
      )
      const registrations = result.data

      const isRegistered = registrations.find(
        (registration: CompetitionsRegistrations) => {
          return registration.userId === this.credentials.id
        }
      )

      return !!isRegistered
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return false
    }
  }

  // WIP
  async checkUserRole(competitionId: number) {
    if (!this.isAutenthicated) {
      console.log('ERROR - Utilisateur non authentifié')
      return
    }
    const userId = this.credentials?.id

    if (!userId) {
      console.log("ERROR - Utilisateur possédant un token mais pas d'id ")
      return
    }

    try {
      const response = await ApiHelper.GetRolesForCompetition(
        competitionId,
        userId
      )
      console.log('roles', response.data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
      for (const [key, value] of Object.entries(response.data)) {
        if (value) {
          this.userHasRole = true
        }
      }

      console.log('this.userHasRole', this.userHasRole)
    } catch (err) {
      if (err.response.status === 401 && this.isAutenthicated) {
        return this.$router.push('/login')
      }
      AxiosHelper.HandleAxiosError(this, err)
      console.log(
        'ERROR - Imposssible de récupérer les roles utilisateurs',
        err
      )
    }
  }
}
</script>

<style scoped lang="scss">
.not-found {
  flex-direction: column;
  align-items: center;
}
ul {
  margin: 0;
}
#detail {
  flex-direction: column;
  li {
    justify-content: space-between;
    display: flex;
  }
  li.detail_text {
    display: block;
  }
}
.category-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 0 0 10px;
  padding: 0;
}
li.category {
  margin: 0 0 5px 0;
}
</style>
