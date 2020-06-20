<template>
  <div class="columns">
    <div class="column is-12">
      <div class="page_header columns is-multiline">
        <div class="column is-12">
          <h1 class="title">
            Mon profil
          </h1>
          <div class="columns is-multiline">
            <div class="column is-12 notification">
              <h1 class="subtitle">
                Modification du profil
              </h1>
              <FormUpdateUser :user="userCredentials" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FormUpdateUser from '~/components/Form/FormUpdateUser.vue'
import { APIUser } from '~/definitions'
import UserRolesCompetitions from '~/components/RolesCompetitionComponent/UserRolesCompetitions.vue'

@Component({
  middleware: 'isAuth',
  components: { FormUpdateUser, UserRolesCompetitions }
})
export default class UserId extends Vue {
  @Prop(Object) userCredentials!: APIUser
}
</script>

<style scoped></style>
