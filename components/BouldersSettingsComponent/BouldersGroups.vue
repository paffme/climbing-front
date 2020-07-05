<template>
  <div class="notification" style="min-width: 960px;">
    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="header">
          <h1 class="title">
            Gestion des groupes et blocs
          </h1>
          <LabelState :round-id="round.id" :state="round.state"></LabelState>
        </div>
        <div v-if="round.state !== rawStateRound.ENDED" class="is-pulled-right">
          <b-button
            class="btn2"
            :disabled="
              round.state !== rawStateRound.PENDING || !roles.juryPresident
            "
            @click="startRound"
          >
            {{
              round.state === rawStateRound.PENDING
                ? 'Démarrer le round'
                : 'Round en cours'
            }}
          </b-button>
        </div>
      </div>
      <div
        v-if="
          groups &&
          Array.isArray(groups) &&
          groups.length > 0 &&
          roles.juryPresident
        "
        class="column is-12"
      >
        <p>Créer un nouveau groupe :</p>
        <FormCreateBoulderingGroup @create="onCreate" />
      </div>
    </div>
    <div class="columns is-multiline">
      <template v-if="groups && Array.isArray(groups) && groups.length > 0">
        <div class="column is-12">
          <p class="subtitle">
            Apercu des groupes
          </p>
        </div>
        <div v-for="(group, index) in groups" :key="index" class="column is-6">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <div class="meta meta-1 is-flex">
                  <b-tag rounded> ID : {{ group.id }} </b-tag>
                  <LabelState
                    :round-id="group.id"
                    :state="group.state"
                  ></LabelState>
                </div>
                <div class="columns">
                  <div class="column is-6 line-right">
                    <ul>
                      <li>
                        <div class="line">
                          <p>Bloc</p>
                          <template
                            v-if="
                              group.boulders &&
                              Array.isArray(group.boulders) &&
                              group.boulders.length > 0
                            "
                          >
                            <ul id="boulder-list">
                              <li
                                v-for="(boulder, index) in group.boulders"
                                :key="index"
                              >
                                <JudgesModal
                                  :boulder="boulder"
                                  :round="round"
                                  :current-competition="{
                                    roundId: round.id,
                                    groupId: group.id,
                                    boulderId: boulder.id
                                  }"
                                  :competition-id="round.competitionId"
                                  @select="addJudge"
                                  @delete="onDeleteJudge"
                                />
                              </li>
                            </ul>
                          </template>
                          <template v-else>
                            <span>Aucun bloc</span>
                          </template>
                          <b-icon
                            class="btn"
                            icon="plus-circle"
                            @click.native="addBloc(group.id)"
                          ></b-icon>
                        </div>
                      </li>
                      <li>Nom : {{ group.name }}</li>
                    </ul>
                  </div>
                  <div class="column is-6">
                    <div>
                      <p>Liste des grimpeurs</p>
                      <template
                        v-if="
                          group.climbers &&
                          Array.isArray(group.climbers) &&
                          group.climbers.length > 0
                        "
                      >
                        <b-field>
                          <b-select
                            v-model="selectedUser"
                            multiple
                            native-size="4"
                          >
                            <option
                              v-for="climber in group.climbers"
                              :key="climber.id"
                              :value="climber.id"
                            >
                              {{ `${climber.firstName} ${climber.lastName}` }}
                            </option>
                          </b-select>
                        </b-field>
                      </template>
                      <template v-else>
                        <span>Aucun grimpeur</span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <span class="card-footer-item has-text-white">
                <b-button
                  type="is-danger"
                  :disabled="!roles.juryPresident"
                  @click="$emit('delete', group)"
                  >Supprimer groupe</b-button
                >
              </span>
            </footer>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="column">
          <div class="card">
            <div class="card-content groups is-flex">
              <p class="subtitle">
                Aucun groupe trouvé
              </p>
              <b-button
                icon-left="plus-circle"
                type="is-primary"
                :disabled="roles"
                @click="createGroup = true"
              >
                Créer un nouveau groupe
              </b-button>
              <div v-show="createGroup" class="groupe-creation">
                <FormCreateBoulderingGroup @create="onCreate" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  APIBoulderingGroups,
  APIBoulders,
  APIUserCompetitionRoles,
  BoulderingLimitedRounds,
  RawStateRound
} from '~/definitions'
import FormCreateBoulderingGroup from '~/components/Form/FormCreateBoulderingGroup.vue'
import RolesModalComponent from '~/components/RolesComponent/RolesModalComponent.vue'
import JudgesModal from '~/components/BouldersSettingsComponent/JudgesModal.vue'
import { AxiosHelper } from '~/utils/axiosHelper'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import LabelState from '~/components/LabelState.vue'

@Component({
  components: {
    FormCreateBoulderingGroup,
    RolesModalComponent,
    JudgesModal,
    LabelState
  }
})
export default class BouldersGroups extends Vue {
  @Prop(Array) groups!: APIBoulderingGroups[]
  @Prop(Object) round!: BoulderingLimitedRounds
  @Prop(Number) boulderId!: number
  @Prop(Object) roles!: APIUserCompetitionRoles

  createGroup = false
  rawStateRound = RawStateRound
  selectedUser = []

  onCreate(name: string) {
    this.$emit('create', name)
  }

  async addBloc(groupId: number) {
    this.$buefy.dialog.confirm({
      message: 'Voulez-vous créer un nouveau bloc ?',
      onConfirm: () => {
        this.$emit('createBloc', groupId)
      }
    })
  }

  async addJudge(meta: {
    id: number
    name: number
    boulder: APIBoulders
    groupId: number
  }) {
    try {
      await ApiHelper.AssignJudgeToBoulder(
        this.round.competitionId,
        this.round.id,
        meta.groupId,
        meta.boulder.id,
        meta.id
      )
      this.$emit('createJudge')
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Juge ajouté'
      })
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async onDeleteJudge(meta: {
    boulderId: number
    groupId: number
    userId: number
  }) {
    try {
      await ApiHelper.DeleteJudgeToBoulder(
        this.round.competitionId,
        this.round.id,
        meta.groupId,
        meta.boulderId,
        meta.userId
      )
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Juge supprimé'
      })
      this.$emit('deleteJudge')
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async startRound() {
    try {
      await ApiHelper.StartCompetition(
        this.round.type,
        this.round.competitionId
      )
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'La compétition à démarré'
      })
      this.$emit('roundStart')
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async stopRound() {
    try {
      await ApiHelper.StartCompetition(
        this.round.type,
        this.round.competitionId,
        [{ state: RawStateRound.ENDED }]
      )
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'La compétition à démarré'
      })
      this.$emit('roundStart')
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style scoped>
.control {
  display: inline;
}

.line {
  display: flex;
  align-items: center;
}

.line > * {
  margin: 0px;
}
.line ul .line p {
  margin: 0;
}
.line > .btn:hover {
  cursor: pointer;
}

.meta {
  justify-content: space-between;
}

.groupe-creation > * {
  margin: 3px;
}

.groups {
  flex-direction: column;
  align-items: center;
}

ul {
  margin: 0;
}

ul#boulder-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
}

ul#boulder-list li {
  margin: 0;
  padding: 2px;
}

li {
  list-style-type: none;
  margin: 10px 2px;
}

.bloc:hover {
  background-color: red;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 0;
}

.btn2 {
  margin: 10px 0;
}
.line-right {
  border-right: 1px solid #e2e2e2;
}
</style>
