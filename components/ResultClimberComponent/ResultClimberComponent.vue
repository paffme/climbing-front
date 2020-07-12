<template>
  <div class="columns is-multiline">
    <template
      v-if="
        filteredBoulders &&
        Array.isArray(filteredBoulders) &&
        filteredBoulders.length > 0
      "
    >
      <div class="column is-offset-3 is-6">
        <CarousselBoulderImage
          :competition-id="round.competitionId"
          :round-id="round.id"
          :group-id="group.id"
          :boulders="filteredBoulders"
          @onChangeBloc="changeBloc"
        />
      </div>
      <div class="column is-offset-3 is-6">
        <p v-show="results.alreadyNote" class="notification has-text-centered">
          Utilisateur déjà noté
        </p>
        <b-field label="Sélection du grimpeur">
          <b-select
            v-model="blocToSend.userId"
            placeholder="Sélectionnez un grimpeur"
            expanded
            @input="getResult"
          >
            <option
              v-for="climber in group.climbers"
              :key="climber.id"
              :value="climber.id"
            >
              {{ climber.firstName + ' ' + climber.lastName }}
            </option>
          </b-select>
        </b-field>
        <FormAddResultToClimber
          :round="round"
          :result="results"
          :group-id="group.id"
          :is-disabled="!blocToSend.blocId || !blocToSend.userId"
          @onSendNote="processNote"
        />
      </div>
    </template>
    <template v-else>
      <p class="notification">
        Aucun bloc à juger
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {
  APIBoulderingGroupsClimbers,
  APIBoulders,
  APIUserCompetitionRoles,
  BoulderingLimitedRounds,
  BoulderingResult,
  BoulderingResultWithCredentials,
  BoulderResultWithNote
} from '~/definitions'
import CarousselBoulderImage from '~/components/ResultClimberComponent/NoteClimberComponent.vue'
import FormAddResultToClimber from '~/components/Form/FormAddResultToClimber.vue'
import { AxiosHelper } from '~/utils/axiosHelper'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import AuthUser from '~/store/authUser'

@Component({
  components: { CarousselBoulderImage, FormAddResultToClimber }
})
export default class ResultClimberComponent extends Vue {
  @Prop(Object) roles!: APIUserCompetitionRoles
  @Prop(Object) group!: APIBoulderingGroupsClimbers
  @Watch('group', { immediate: true, deep: true })
  filterJudge(group: APIBoulderingGroupsClimbers) {
    if (this.roles.juryPresident) {
      this.filteredBoulders = group.boulders
      return
    }

    if (!this.roles.judge) {
      this.filteredBoulders = []
      return
    }

    this.filteredBoulders = group.boulders.filter((boulder) => {
      return boulder.judges.find((judge) => {
        // @ts-ignore
        return AuthUser.getters?.['Credentials']().id === judge.id
      })
    })
  }

  @Prop(Object) round!: BoulderingLimitedRounds

  filteredBoulders: APIBoulders[] | null = null

  results: BoulderResultWithNote = {
    climberId: 0,
    top: false,
    zone: false,
    try: 1,
    alreadyNote: false
  }

  blocToSend: { blocId: number | null; userId: number | null } = {
    blocId: null,
    userId: null
  }

  created() {
    this.blocToSend.blocId = this.group.boulders?.[0]?.id
    this.blocToSend.userId = this.group.climbers?.[0]?.id
    this.getResult()
  }

  processNote(note: BoulderingResultWithCredentials) {
    if (!this.blocToSend.userId || !this.blocToSend.blocId) return

    const result: {
      data: BoulderingResult
      info: { blocId: number; groupId: number }
    } = {
      data: {
        climberId: this.blocToSend.userId,
        top: note.top,
        zone: note.zone,
        try: note.try
      },
      info: {
        groupId: this.group.id,
        blocId: this.blocToSend.blocId
      }
    }
    this.sendNote(result)
  }

  async getResult() {
    if (!this.blocToSend.blocId || !this.blocToSend.userId)
      throw new Error('Pas de bloc to Send')

    const competitionId = parseInt(this.$route.params.competitionId, 10)

    if (!competitionId) throw new Error('Competition ID introuvable')

    try {
      const result = await ApiHelper.GetResultClimber(
        competitionId,
        this.round.id,
        this.group.id,
        this.blocToSend.blocId,
        this.blocToSend.userId
      )

      this.results = {
        climberId: result.data.climberId,
        top: result.data.top,
        zone: result.data.zone,
        try: result.data.topInTries || result.data.zoneInTries,
        alreadyNote: true
      }
    } catch (err) {
      if (err.response.data.code === 'BOULDERING_RESULT_NOT_FOUND') {
        this.results = {
          climberId: 0,
          top: false,
          zone: false,
          try: 1,
          alreadyNote: false
        }
        return
      }
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async sendNote(note: {
    data: BoulderingResult
    info: { blocId: number; groupId: number }
  }) {
    try {
      await ApiHelper.AddBoulderingResult(
        note.data,
        this.round.competitionId,
        this.round.id!,
        note.info.groupId,
        note.info.blocId
      )
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Note ajoutée'
      })
      this.getResult()
    } catch (err) {
      if (err.response.status === 403) {
        this.$buefy.toast.open({
          type: 'is-warning',
          message: 'Vous ne pouvez pas juger ce bloc'
        })
        return
      }
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  changeBloc(blocId: number) {
    this.blocToSend.blocId = blocId
    this.getResult()
  }
}
</script>

<style scoped></style>
