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
        @click="$emit('register')"
      >
        S'inscrire
      </b-button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class UserRegisterToCompetition extends Vue {
  @Prop(Boolean) isLoading!: boolean
  @Prop(Boolean) success!: boolean
  @Watch('success')
  onSuccessChanged(newVal: boolean, old: boolean) {
    // @ts-ignore
    if (newVal) this.$parent.close()
    console.log('onSuccessChanged', newVal)
    console.log('onSuccessChanged', old)
  }
}
</script>

<style scoped></style>
