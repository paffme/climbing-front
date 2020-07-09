<template>
  <div v-if="competition">
    <div class="header-competition">
      <span class="subtitle"> {{ competition.name }}</span>
      <b-tag
        :class="[
          competition.open ? 'is-success' : 'is-danger',
          'is-pulled-right'
        ]"
      >
        Status : {{ competition.open ? 'Ouverte' : 'Fermée' }}
      </b-tag>
    </div>
    <ul>
      <li>
        <b>Date de début : </b>
        <span>{{ competition.startDate | formatDate }}</span>
      </li>
      <li>
        <b>Date de fin : </b>
        <span>{{ competition.endDate | formatDate }}</span>
      </li>
      <li>
        <b>Addresse : </b>
        <span>{{ competition.address }}</span>
        <span>{{ competition.postalCode }}</span>
        <span>{{ competition.city }}</span>
        <b-button size="is-small">
          <span
            class="pointer has-text-info"
            @click="GoogleMapModalOpen = !GoogleMapModalOpen"
            >Voir la carte</span
          >
        </b-button>
      </li>
    </ul>

    <b-modal
      :active.sync="GoogleMapModalOpen"
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <GoogleMapComponent :competition="competition" />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import { APICompetition } from '~/definitions'
import GoogleMapComponent from '~/components/GoogleMapComponent.vue'

@Component({
  components: { GoogleMapComponent },
  filters: {
    formatDate: (dirtyDate: Date): string => {
      moment.locale('fr')
      return moment(dirtyDate).format('LLLL')
    }
  }
})
export default class CompetitionsDetails extends Vue {
  @Prop(Object) competition!: APICompetition

  GoogleMapModalOpen = false
}
</script>

<style scoped>
.header-competition {
  display: flex;
  justify-content: space-between;
}
</style>
