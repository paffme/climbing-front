<template>
  <div class="columns">
    <div class="column is-12">
      <div class="page_header columns is-multiline">
        <div class="column is-12">
          <h1 class="title">
            Mon profil
          </h1>
          <div class="columns">
            <div
              v-if="userCredentials && userCredentials.id"
              class="column is-12 notification"
            >
              <UserRolesCompetitions :user-id="userCredentials.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIUser } from '~/definitions'
import UserRolesCompetitions from '~/components/RolesCompetitionComponent/UserRolesCompetitions.vue'

@Component({
  components: { UserRolesCompetitions }
})
export default class roles extends Vue {
  @Prop(Object) userCredentials!: APIUser
}
</script>

<style scoped></style>
