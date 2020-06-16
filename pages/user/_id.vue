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
                  <FormUpdateUser :user="user" />
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
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { APIUser } from '~/definitions'
import UserRolesCompetitions from '~/components/RolesCompetitionComponent/UserRolesCompetitions.vue'

@Component({
  middleware: ['isAuth', 'setHeader'],
  components: { FormUpdateUser, UserRolesCompetitions },
  validate({ params }: any) {
    const userId = parseInt(params.id, 10)
    if (!userId) {
      throw new Error('ID utilisateur nécessaire')
    }

    return true
  },
  async asyncData(ctx) {
    const userId = parseInt(ctx.params.id, 10)
    const user = await ApiHelper.GetUser(userId)

    console.log('user', user)
    return {
      user: user.data
    }
  }
})
export default class UserId extends Vue {
  user: APIUser | null = null
}
</script>

<style scoped></style>
