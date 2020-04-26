<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Inscription à une compétition</p>
    </header>
    <section class="modal-card-body">
      <p>
        En vous inscrivant à cette compétition vous confirmez posséder les équipements nécessaires pour le déroulement
        de cette compétition
      </p>
    </section>
    <footer class="modal-card-foot is-right">
      <button class="button" type="button" @click="$parent.close()">Fermer</button>
      <b-button type="is-primary" :loading="isLoading" v-on:click="registerUserToACompetition">S'inscrire</b-button>
    </footer>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";
  import { authUser } from "~/utils/store-accessor";

  @Component
  export default class UserRegisterToCompetition extends Vue {
    @Prop(Number) readonly competitionId?: number
    isLoading = false
    async registerUserToACompetition() {
      this.isLoading = true
      if (!this.competitionId) {
        console.log('Should have a competition id', this.competitionId)
        this.isLoading = false
        return
      }

      try {
        if (!authUser.Credentials?.id) throw(`Should specify the id - ${authUser.Credentials} - was found`)
        // await ApiHelper.AddCompetitor(this.competitionId, authUser.Credentials?.id)
        //@ts-ignore
        this.$parent.close()
        this.$emit('hasRegister')
        this.isLoading = false
      } catch(err) {
        console.log('err', err)
        this.isLoading = false
      }
    }
  }
</script>

<style scoped>

</style>
