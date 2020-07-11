<template>
  <div>
    <nuxt-child :user-credentials="userCredentials" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AuthUser from '~/store/authUser'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import { APIUser } from '~/definitions'

@Component({
  middleware: ['isAuth']
})
export default class user extends Vue {
  userCredentials: APIUser | null = null
  async mounted() {
    try {
      // @ts-ignore
      const userId = AuthUser.getters?.['Credentials']().id

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
