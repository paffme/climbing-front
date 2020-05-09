<template>
  <div>
    <template v-if="AuthUser.Authenticated">
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
  import { Vue, Component } from "vue-property-decorator";
  import { authUser } from "~/utils/store-accessor";

  @Component({
    data() {
      return {
        AuthUser: authUser
      }
    }
  })
  export default class BtnCreateCompetition extends Vue {
  }
</script>

<style scoped>

</style>
