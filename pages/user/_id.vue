<template>
  <div class="columns">
    <div class="column is-12">
      <div class="page_header columns is-multiline">
        <div class="column is-12">
          <h1 class="title">
            Mon profil
          </h1>
          <div class="columns is-multiline">
            <div class="column is-12">
              <b-tabs type="is-boxed">
                <b-tab-item label="Profile" icon="google-photos">
                  <h1 class="subtitle">
                    Modification du profil
                  </h1>
                  <FormUpdateUser :user="userCredentials" />
                </b-tab-item>
                <b-tab-item label="Mes roles" icon="account">
                  <UserRolesCompetitions />
                </b-tab-item>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FormUpdateUser from '~/components/Form/FormUpdateUser.vue'
import { AxiosHelper } from '~/utils/axiosHelper'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { authUser } from '~/utils/store-accessor'
import { APIUser } from '~/definitions'
import UserRolesCompetitions from '~/components/RolesCompetitionComponent/UserRolesCompetitions.vue'

@Component({
  middleware: 'isAuth',
  components: { FormUpdateUser, UserRolesCompetitions }
})
export default class UserId extends Vue {
  userCredentials: APIUser | null = null

  async created() {
    await this.getUser()
  }

  async getUser() {
    try {
      const userId = authUser.Credentials?.id

      if (!userId) throw new Error('No user id have been found')

      const response = await ApiHelper.GetUser(userId)
      this.userCredentials = response.data
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style scoped></style>
