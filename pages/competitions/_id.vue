<template>
  <div class="columns">
    <template v-if="competition">
      <div class="column">
        <div class="page_header">
          <GoBackBtn />
          <h1 class="title">
            {{ competition.name }}
          </h1>
          <template v-if="userHasRole">
            <b-button
              type="is-info"
              icon-right="tools"
              tag="router-link"
              :to="`/competitions/edit/${competition.id}`"
            >
              Editer cette compétition
            </b-button>
          </template>
          <template v-else-if="!userHasRole">
            <b-button
              type="is-primary"
              :loading="isLoading"
              :disabled="isAlreadyRegister"
              @click="openRegisterModal"
            >
              {{
                isAlreadyRegister
                  ? 'Vous êtes déjà inscrit'
                  : 'Je souhaite participer !'
              }}
            </b-button>
          </template>
        </div>

        <div class="custom_section page_content">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li class="is-primary">
                <nuxt-link to="/">
                  Compétitions
                </nuxt-link>
              </li>
              <li class="is-active">
                <a href="#" aria-current="page">{{ competition.name }}</a>
              </li>
            </ul>
          </nav>

          <div class="columns">
            <div class="column is-6">
              <div class="content">
                <b-notification
                  v-if="competition.cancelled"
                  type="is-danger"
                  :closable="false"
                  has-icon
                >
                  Cette compétition est annulé
                </b-notification>
                <h1 class="title">
                  {{ competition.name }}
                </h1>
                <p>
                  {{ competition.description }}
                </p>
                <b-tag :type="competition.open ? 'is-success' : 'is-danger'">
                  {{
                    competition.open
                      ? 'Compétition Open'
                      : 'Competition non Open'
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
                    Catégorie:
                    <ul>
                      <li
                        v-for="(categorie, index) in competition.categories"
                        :key="index"
                      >
                        {{ categorie.sex }} - {{ categorie.name }}
                      </li>
                    </ul>
                  </li>
                  <li>
                    Heure d'accueil :
                    <span>{{ competition.welcomingDate | formatDate }}</span>
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

                <div v-if="!competition.cancelled" class="is-pulled-right">
                  <BtnRegisterCompetition :competition-id="competition.id" />
                </div>
              </div>
            </div>
            <div class="column is-6">
              <GmapMap
                :center="{ lat: 10, lng: 10 }"
                :zoom="7"
                map-type-id="terrain"
                style="width: 100%; height: 100vh;"
              />
            </div>
          </div>
          <hr />
          <div class="columns">
            <div class="column is-12">
              <div class="content">
                <h4 class="title">
                  Classement de la compétition
                </h4>
                <div class="content">
                  <div class="subtitle">
                    Genre
                  </div>
                  <b-field position="is-centered">
                    <template v-for="(sex, index) in sexes">
                      <b-radio-button
                        :key="index"
                        v-model="filter.sex"
                        :native-value="sex"
                      >
                        <b-icon
                          :icon="
                            sex === sexes.Male ? 'gender-male' : 'gender-female'
                          "
                        />
                        <span>{{ sex | capitalize }}</span>
                      </b-radio-button>
                    </template>
                  </b-field>
                  <div class="subtitle">
                    Catégorie
                  </div>
                  <b-field position="is-centered">
                    <template v-for="(category, index) in categories">
                      <b-radio-button
                        :key="index"
                        v-model="filter.categorie"
                        :native-value="category"
                      >
                        <span>{{ category | capitalize }}</span>
                      </b-radio-button>
                    </template>
                  </b-field>
                  <RankOneCompetition
                    :competition-id="competition && competition.id"
                    :sex="filter.sex"
                    :categorie="filter.categorie"
                  />
                </div>
              </div>
            </div>
          </div>
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
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
import GoBackBtn from '~/components/GoBackBtn.vue'
import {
  CategoryName,
  Competition,
  CompetitionsRegistrations,
  RoleNameQueryParams,
  Sex
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { authUser } from '~/utils/store-accessor'
import RankOneCompetition from '~/components/Table/RankOneCompetition.vue'
import BtnRegisterCompetition from '~/components/Button/BtnRegisterCompetition.vue'
import AuthUser from '~/store/authUser'

@Component({
  components: { GoBackBtn, RankOneCompetition, BtnRegisterCompetition },
  data() {
    return {
      roleNameQueryParams: RoleNameQueryParams,
      categories: CategoryName,
      sexes: Sex,
      AuthUser: authUser
    }
  },
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
  }
})
export default class OneCompetition extends Vue {
  competition: Competition | null = null
  isAlreadyRegister: boolean = false
  isLoading = true
  filter = {
    sex: Sex.Male,
    categorie: CategoryName.Benjamin
  }

  userHasRole: boolean = false
  // @ts-ignore
  isAutenthicated = AuthUser.getters?.['Authenticated']() || false
  // @ts-ignore
  credentials = AuthUser.getters?.['Credentials']() || false

  async created() {
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
      this.checkUserRole(competitionId)
      this.isLoading = false
    } catch (err) {
      console.log(err)
    }
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
          return registration.userId === authUser.Credentials?.id
        }
      )

      return !!isRegistered
    } catch (err) {
      console.log(err)
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
      const response = await ApiHelper.GetUserCompetitionRoles(
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
</style>
