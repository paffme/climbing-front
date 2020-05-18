<template>
  <div>
    <b-tag class="tag" @click.native="isActive = !isActive">
      {{ boulder.id }}
    </b-tag>
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
              <template
                v-if="
                  boulder.judges &&
                  Array.isArray(boulder.judges) &&
                  boulder.judges.length > 0
                "
              >
                <ul>
                  <li
                    v-for="(judge, index) in boulder.judges"
                    :key="index"
                    @click="deleteBloc(judge.id, boulder.id)"
                  >
                    <span
                      >{{ judge.firstName }} {{ judge.lastName }}#{{
                        judge.id
                      }}</span
                    >
                    <span>
                      <b-icon class="icon" type="is-white" icon="delete" />
                    </span>
                  </li>
                </ul>
              </template>
              <template v-else>
                <p>Aucun juges</p>
              </template>
              <transition name="fade">
                <div v-show="searchIsActive">
                  <SearchUser @select="onSelect" />
                </div>
              </transition>
              <b-button
                class="btn"
                type="is-primary"
                @click="searchIsActive = true"
              >
                Ajouter juges
              </b-button>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { User } from '~/definitions'
import SearchUser from '~/components/Form/SearchUser.vue'

@Component({
  components: { SearchUser }
})
export default class JudgesModal extends Vue {
  @Prop(Object) boulder!: {
    id: number
    judges: User[]
  }

  @Prop(Number) groupId!: number
  isActive = false
  searchIsActive = false

  async onSelect(user: { id: number; name: string }) {
    const meta = {
      ...user,
      groupId: this.groupId,
      boulder: this.boulder
    }
    this.$emit('select', meta)
  }

  async deleteBloc(judgeId: number, boulderId: number) {
    this.$buefy.dialog.confirm({
      type: 'is-info',
      message: 'Voulez-vous vraiment supprimé ce juge ?',
      onConfirm: () => {
        console.log('coucou')
        const meta = {
          boulderId,
          userId: judgeId,
          groupId: this.groupId
        }
        this.$emit('delete', meta)
      }
    })
  }
}
</script>

<style scoped>
.tag {
  cursor: pointer;
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
</style>
