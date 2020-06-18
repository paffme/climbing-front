<template>
  <div class="notification">
    <div class="columns">
      <div class="column">
        <h1 class="title">
          Gestion des groupes et blocs
        </h1>
      </div>
    </div>
    <div
      v-if="groups && Array.isArray(groups) && groups.length > 0"
      class="columns"
    >
      <div class="column is-4 is-offset-4">
        <FormCreateBoulderingGroup @create="onCreate" />
      </div>
    </div>
    <div class="columns is-multiline">
      <template v-if="groups && Array.isArray(groups) && groups.length > 0">
        <div v-for="(group, index) in groups" :key="index" class="column">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <div class="meta meta-1 is-flex">
                  <b-tag rounded> ID : {{ group.id }} </b-tag>
                  <b-tag rounded>
                    {{ group.state }}
                  </b-tag>
                </div>
                <ul>
                  <li>
                    <div class="line">
                      <span>Grimpeur : </span>
                      <template
                        v-if="
                          group.climbers &&
                          Array.isArray(group.climbers) &&
                          group.climbers.length > 0
                        "
                      >
                        <b-field>
                          <b-select>
                            <option
                              v-for="(climber, index) in group.climbers"
                              :key="index"
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
                  </li>
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
                              :group-id="group.id"
                              :boulder="boulder"
                              @select="addJudge"
                              @delete="onDeleteBloc"
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
                        @click.native="addBoulder(group.id)"
                      ></b-icon>
                    </div>
                  </li>
                  <li>Nom : {{ group.name }}</li>
                </ul>
              </div>
            </div>
            <footer class="card-footer">
              <span class="card-footer-item has-text-white">
                <b-button type="is-danger" @click="$emit('delete', group)"
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIBoulderingGroups, APIBoulders } from '~/definitions'
import FormCreateBoulderingGroup from '~/components/Form/FormCreateBoulderingGroup.vue'
import RolesModalComponent from '~/components/RolesComponent/RolesModalComponent.vue'
import JudgesModal from '~/components/BouldersSettingsComponent/JudgesModal.vue'
import { AxiosHelper } from '~/utils/axiosHelper'
import { ApiHelper } from '~/utils/api_helper/apiHelper'

@Component({
  components: { FormCreateBoulderingGroup, RolesModalComponent, JudgesModal }
})
export default class BouldersGroups extends Vue {
  @Prop(Array) groups!: APIBoulderingGroups[]
  @Prop(Number) roundId!: number
  @Prop(Number) competitionId!: number
  @Prop(Number) boulderId!: number

  createGroup = false

  onCreate(name: string) {
    console.log('onCreate', name)
    this.$emit('create', name)
  }

  async addBoulder(groupId: number) {
    console.log('coucou', groupId)
    this.$emit('createBloc', groupId)
  }

  async addJudge(meta: {
    id: number
    name: number
    boulder: APIBoulders
    groupId: number
  }) {
    try {
      await ApiHelper.AssignJudgeToBoulder(
        this.competitionId,
        this.roundId,
        meta.groupId,
        meta.boulder.id,
        meta.id
      )
      this.$emit('createJudge')
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async onDeleteBloc(meta: {
    boulderId: number
    groupId: number
    userId: number
  }) {
    try {
      await ApiHelper.DeleteJudgeToBoulder(
        this.competitionId,
        this.roundId,
        meta.groupId,
        meta.boulderId,
        meta.userId
      )
      this.$emit('deleteJudge')
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
  margin-right: 5px;
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

ul#boulder-list {
  display: flex;
  flex-direction: row;
}
.content #boulder-list li + li {
  margin-top: 0;
}
li {
  list-style-type: none;
  margin: 0 2px;
}
</style>
