<template>
  <div>
    <b-button size="is-small" @click.native="isActive = !isActive">
      {{ boulder.id }}
    </b-button>
    <div class="judges-list">
      <div class="judges">
        <b-modal :has-modal-card="true" :active.sync="isActive">
          <div class="card">
            <div class="card-header">
              <h1 class="card-header-title">
                Gestion du bloc
                <b-tag>ID {{ boulder.id }}</b-tag>
              </h1>
            </div>
            <div class="card-content content-judge">
              <div class="content">
                <SearchUser @select="onSelect" />
              </div>
              <template
                v-if="
                  boulder.judges &&
                  Array.isArray(boulder.judges) &&
                  boulder.judges.length > 0
                "
              >
                <p>Listes des juges du bloc</p>
                <b-field>
                  <b-select v-model="selectedJudge" multiple native-size="4">
                    <option
                      v-for="judge in boulder.judges"
                      :key="judge.id"
                      :value="judge.id"
                    >
                      {{ judge.firstName }} {{ judge.lastName }}#{{ judge.id }}
                    </option>
                  </b-select>
                </b-field>
              </template>
              <template v-else>
                <p>Aucun juges</p>
              </template>
              <div class="is-flex buttons-actions">
                <b-button
                  v-show="selectedJudge"
                  class="btn"
                  type="is-danger"
                  @click="deleteJudge"
                >
                  Supprimer juge
                </b-button>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BoulderingLimitedRounds, User } from '~/definitions'
import SearchUser from '~/components/Form/SearchUser.vue'

@Component({
  components: { SearchUser }
})
export default class JudgesModal extends Vue {
  @Prop(Object) boulder!: {
    id: number
    judges: User[]
  }

  @Prop(Object) round!: BoulderingLimitedRounds
  @Prop(Number) competitionId!: number
  @Prop(Object) currentCompetition!: {
    roundId: number
    groupId: number
    boulderId: number
  }

  selectedJudge: User | null = null
  isActive = false

  async onSelect(user: { id: number; name: string }) {
    const meta = {
      ...user,
      groupId: this.currentCompetition.groupId,
      boulder: this.boulder
    }
    this.$emit('select', meta)
  }

  async deleteJudge() {
    this.$buefy.dialog.confirm({
      type: 'is-info',
      message: 'Voulez-vous vraiment supprimé ce juge ?',
      onConfirm: () => {
        const meta = {
          boulderId: this.currentCompetition.boulderId,
          userId: this.selectedJudge,
          groupId: this.currentCompetition.groupId
        }
        this.$emit('delete', meta)
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/bulma_customize.scss';

.tag {
  cursor: pointer;
}

.tag:hover {
  background-color: $primary;
  color: white;
}

.judges-list {
  position: relative;
}

.judges {
  position: absolute;
  z-index: 999;
  bottom: 25px;
  right: -520px;
}

.content-judge {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  margin-top: 10px;
}

ul {
  margin: 0;
}

li {
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

li:hover {
  background-color: #03378c;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.buttons-actions .btn:first-child {
  margin-right: 10px;
}

ul {
  margin: 0 !important;
}
</style>
