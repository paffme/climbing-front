<template>
  <div>
    <template v-if="isConnected">
      <b-button
        type="is-success"
        icon-right="license"
        tag="router-link"
        :to="'/competitions/create'"
      >
        Créer une compétition
      </b-button>
    </template>
    <template v-else>
      <b-tooltip label="Vous devez être connecté">
        <b-button
          disabled
          type="is-success"
          icon-right="license"
          tag="router-link"
          :to="'/competitions/create'"
        >
          Créer une compétition
        </b-button>
      </b-tooltip>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AuthUser from '~/store/authUser'

@Component({
  data() {
    return {
      // @ts-ignore
      isConnected: AuthUser.getters?.['Authenticated']() || false
    }
  }
})
export default class BtnCreateCompetition extends Vue {}
</script>

<style scoped></style>
