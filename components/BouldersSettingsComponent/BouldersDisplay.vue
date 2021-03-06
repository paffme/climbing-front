<template>
  <div class="card">
    <template v-if="round">
      <header class="card-header">
        <b-icon
          class="icon"
          type="is-info"
          icon="square-edit-outline"
          @click.native="$emit('edit', round)"
        ></b-icon>
        <p class="card-header-title">
          {{ typeBouldering[qualificationRound] }}
        </p>
        <b-icon
          icon="delete"
          class="icon"
          type="is-danger"
          @click.native="$emit('delete', round.id)"
        ></b-icon>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="meta meta-1 is-flex">
            <b-tag rounded>
              {{ typeBouldering[qualificationRound] }}
            </b-tag>
            <b-tag
              rounded
              :type="
                round.state === rawStateRound.ONGOING
                  ? 'is-primary'
                  : 'is-warning'
              "
            >
              {{ stateRound[round.state] }}
            </b-tag>
          </div>
          <ul>
            <li>
              <b>
                Nom :
              </b>
              {{ round.name }}
            </li>
            <li>
              <b>
                Genre :
              </b>
              {{ round.sex === 'male' ? 'Homme' : 'Femme' }}
            </li>
            <li>
              <b>
                Type :
              </b>
              {{ rankingType[round.rankingType] }}
            </li>
            <li>
              <b>
                Catégorie :
              </b>
              {{ round.category }}
            </li>
            <li>
              <b>
                Quotas :
              </b>
              {{ round.quota }}
            </li>
            <li v-show="round.maxTries">
              <b>
                Nombre d'essais :
              </b>
              {{ round.maxTries || 0 }}
            </li>
          </ul>
        </div>
      </div>
      <footer class="card-footer">
        <span class="card-footer-item has-text-white">
          <b-button type="is-info" @click="modalIsActive = !modalIsActive"
            >Gestion des groupes et blocs</b-button
          >
        </span>
      </footer>

      <b-modal
        :active.sync="modalIsActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="true"
        aria-role="dialog"
        aria-modal
      >
        <BouldersGroups
          :groups="groups"
          :round="round"
          :roles="roles"
          @delete="onDelete"
          @create="onCreateGroup"
          @createBloc="onCreateBloc"
          @roundStart="refreshRound"
          @createJudge="refreshBouldersGroups"
          @deleteJudge="refreshBouldersGroups"
        />
      </b-modal>
    </template>
    <template v-else>
      Aucun tour
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {
  APIBoulderingGroups,
  APIBoulderingGroupsClimbers,
  APIUserCompetitionRoles,
  BoulderingLimitedRounds,
  RankingType,
  RawStateRound,
  StateRound,
  TypeBouldering,
  TypeBoulderingRound
} from '~/definitions'
import BouldersGroups from '~/components/BouldersSettingsComponent/BouldersGroups.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({
  components: { BouldersGroups }
})
export default class BouldersDisplay extends Vue {
  @Prop(String) qualificationRound!: TypeBoulderingRound
  @Prop(Object) round!: BoulderingLimitedRounds
  @Watch('round', { immediate: false, deep: true })
  onRoundChange() {
    this.refreshBouldersGroups()
  }

  @Prop(Object) roles!: APIUserCompetitionRoles
  modalIsActive = false
  groups: APIBoulderingGroupsClimbers[] = []
  typeBouldering = TypeBouldering
  stateRound = StateRound
  rawStateRound = RawStateRound
  rankingType = RankingType

  async mounted() {
    await this.refreshBouldersGroups()
  }

  async getBouldersGroups(competitionId: number, roundId: number) {
    try {
      const groups = await ApiHelper.GetBoulderingGroups(competitionId, roundId)
      this.groups = groups.data
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async onDelete(group: APIBoulderingGroups) {
    try {
      await ApiHelper.DeleteBoulderingGroups(
        this.round.competitionId,
        group.roundId,
        group.id
      )
      await this.refreshBouldersGroups()
      this.$buefy.notification.open({
        type: 'is-success',
        message: 'Groupe supprimé'
      })
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async onCreateGroup(name: string) {
    try {
      await ApiHelper.CreateBoulderingGroup(
        this.round.competitionId,
        this.round.id,
        {
          name
        }
      )
      await this.refreshBouldersGroups()

      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Groupe créée'
      })
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async onCreateBloc(groupId: number) {
    try {
      await ApiHelper.AddBoulder(
        this.round.competitionId,
        this.round.id,
        groupId
      )
      await this.refreshBouldersGroups()
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  refreshRound() {
    this.$emit('refreshRound')
    this.refreshBouldersGroups()
  }

  async refreshBouldersGroups() {
    await this.getBouldersGroups(this.round.competitionId, this.round.id)
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
.icon {
  cursor: pointer;
}
.card-header {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.card-content {
  padding: 0.8rem 0.5rem;
}
.meta {
  justify-content: space-between;
}
.card-header-title {
  text-align: center !important;
}
</style>
