<template>
  <div class="modal-card" style="width: auto;">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Inscription à une compétition
      </p>
    </header>
    <section class="modal-card-body">
      <p>
        En vous inscrivant à cette compétition vous confirmez posséder les
        équipements nécessaires pour le déroulement de cette compétition
      </p>
    </section>
    <footer class="modal-card-foot is-right">
      <button class="button" type="button" @click="$parent.close()">
        Fermer
      </button>
      <b-button
        type="is-primary"
        :loading="isLoading"
        @click="registerUserToACompetition"
      >
        S'inscrire
      </b-button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import AuthUser from '~/store/authUser'

@Component
export default class UserRegisterToCompetition extends Vue {
  @Prop(Number) readonly competitionId?: number
  isLoading = false
  // @ts-ignore
  credentials = AuthUser.getters?.['Credentials']() || false
  async registerUserToACompetition() {
    this.isLoading = true
    if (!this.competitionId) {
      console.log('Should have a competition id', this.competitionId)
      this.isLoading = false
      return
    }

    try {
      if (!this.credentials?.id) {
        throw new Error(
          `Should specify the id - ${this.credentials} - was found`
        )
      }
      await ApiHelper.AddCompetitor(this.competitionId, this.credentials.id)
      // @ts-ignore
      this.$parent.close()
      this.$emit('registerSuccess')
      this.isLoading = false
    } catch (err) {
      console.log('err', err)
      this.isLoading = false
    }
  }
}
</script>

<style scoped></style>
