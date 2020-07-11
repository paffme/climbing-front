<template>
  <div class="columns">
    <div class="column is-12">
      <div class="page_header columns is-multiline">
        <div class="column is-12">
          <h1 class="title">
            Mes compétitions
          </h1>
          <div class="columns">
            <div
              v-if="userCredentials && userCredentials.id"
              class="column is-12"
            >
              <UserCompetitionListComponent
                :competitions="competitions"
                :user-id="userCredentials.id"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APICompetition, APIUser } from '~/definitions'
import UserCompetitionListComponent from '~/components/UserCompetitionListComponent/UserCompetitionListComponent.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import AuthUser from '~/store/authUser'

@Component({
  components: { UserCompetitionListComponent }
})
export default class RegisteredUserCompetitions extends Vue {
  @Prop(Object) userCredentials!: APIUser

  competitions: APICompetition[] = []
  async mounted() {
    this.competitions = await this.getCompetitionListForCurrentUser()
  }

  async getCompetitionListForCurrentUser(): Promise<
    APICompetition[] | undefined
  > {
    try {
      // @ts-ignore
      const userId = AuthUser.getters?.['Credentials']().id
      if (!userId) throw new Error('No credentials ID was found')
      const competitions = await ApiHelper.GetRegistrationsByUser(userId)

      const promises = competitions.data.map((competition) => {
        if (!competition || !competition.competitionId) return

        return ApiHelper.GetCompetition(competition.competitionId)
      })

      const result = await Promise.all(promises)

      const fullCompetitions = result
        .map((competition) => {
          return competition?.data
        })
        .filter((competition) => !!competition)

      console.log('competitions', fullCompetitions)
      return fullCompetitions
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return []
    }
  }
}
</script>

<style scoped></style>
