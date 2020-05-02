<template>
  <div class="columns">
    <template v-if="competition">
      <div class="column">
        <div class="page_header">
          <GoBackBtn></GoBackBtn>
          <h1 class="title">{{ competition.name }}</h1>
          <b-button type="is-info"
                    icon-right="tools"
                    tag="router-link"
                    :to="`/competitions/edit/${competition.id}`"
          >
            Editer cette compétition
          </b-button>
        </div>

        <div class="custom_section page_content">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li class="is-primary"><nuxt-link to="/competitions">Compétitions</nuxt-link></li>
              <li class="is-active"><a href="#" aria-current="page">{{ competition.name }}</a></li>
            </ul>
          </nav>

          <div class="columns">
            <div class="column is-6">
              <div class="content">

                <b-notification
                  v-if="competition.cancelled"
                  type="is-danger"
                  :closable="false"
                  has-icon>
                  Cette compétition est annulé
                </b-notification>
                <h1 class="title"> {{ competition.name }} </h1>
                <p>
                  {{ competition.description }}
                </p>
                <b-tag :type="competition.open ? 'is-success' : 'is-danger'">{{ competition.open ? 'Compétition Open' : 'Competition non Open' }}</b-tag>
                <ul id="detail">
                  <li>Date début : <b-tag type="is-info">{{ competition.startDate | formatDate }}</b-tag></li>
                  <li>Date fin : <b-tag type="is-danger">{{ competition.endDate | formatDate }}</b-tag></li>
                  <li>Type compétition : <b-tag>{{ competition.type | capitalize}}</b-tag></li>
                  <li>Adresse : <span>{{ competition.address}} - {{ competition.postalCode}}</span></li>
                  <li>Lieu : <b-tag>{{ competition.city | capitalize}}</b-tag></li>
                  <li>Catégorie:
                    <ul>
                      <li v-for="categorie in competition.categories">
                        {{ categorie.sex }} - {{ categorie.name }}
                      </li>
                    </ul>
                  </li>
                  <li>Heure d'accueil : <span>{{ competition.welcomingDate | formatDate }}</span></li>
                  <hr>
                  <li class="detail_text">
                    <h1 class="subtitle is-size-4">Programme :</h1>
                    <span>
                      {{ competition.agenda }}
                    </span>
                  </li>
                </ul>

                <div class="is-pulled-right" v-if="!competition.cancelled">
                  <b-button type="is-primary" v-on:click="openRegisterModal" :loading="isLoading" :disabled="isAlreadyRegister">
                    {{ isAlreadyRegister ? 'Vous êtes déjà inscrit': 'Je souhaite participer !'}}</b-button>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <GmapMap
                :center="{lat:10, lng:10}"
                :zoom="7"
                map-type-id="terrain"
                style="width: 100%; height: 100vh"
              >
              </GmapMap>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
        <div class="column is-offset-2 is-8 is-flex not-found">
          <h1 class="title">Aucune compétition trouvée</h1>
          <b-button v-on:click="$router.push('/')">Revenir au tableau de bord</b-button>
        </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import GoBackBtn from "~/components/GoBackBtn.vue";
  import { Competition, CompetitionsRegistrations } from "~/definitions";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";
  import moment from 'moment'
  import UserRegisterToCompetition from "~/components/Form/UserRegisterToCompetition.vue";
  import { authUser } from "~/utils/store-accessor";

  @Component({
    middleware: 'isAuth',
    components: { GoBackBtn },
    filters: {
      formatDate: (dirtyDate: string): string => {
        moment.locale('fr')
        return moment(dirtyDate).format('LLLL')
      },
      capitalize: (value: string) => {
        if (!value) return ''
        value = value.toString()
        return value.toUpperCase()
      }
    }
  })
  export default class OneCompetition extends Vue {
    competition: Competition | null = null
    isAlreadyRegister: boolean = false
    isLoading = true
    async created() {
      const competitionId = this.$route.params.id ? parseInt(this.$route.params.id) : undefined

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
        this.isAlreadyRegister = await this.checkIfUserIsRegisterToCompetition(competitionId)
        this.isLoading = false
      } catch(err) {
        console.log(err)
      }
    }

    openRegisterModal() {
      this.$buefy.modal.open({
        parent: this,
        props: {
          competitionId: this.competition && this.competition.id
        },
        events: {
          hasRegister: () => {
            this.isAlreadyRegister = true
          }
        },
        component: UserRegisterToCompetition,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true
      })
    }

    async mounted() {

    }

    async checkIfUserIsRegisterToCompetition(competitionId: number): Promise<boolean> {
      try {
        const result = await ApiHelper.GetRegistrationsForACompetition(competitionId)
        const registrations = result.data

        const isRegistered = registrations.find((registration: CompetitionsRegistrations) => {
          return registration.userId === authUser.Credentials?.id;
        })

        return !!isRegistered
      } catch (err) {
        console.log(err)
        return false
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
