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
  import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BtnCreateCompetition extends Vue {
  @Prop(Boolean) isConnected!: boolean
}
</script>

<style scoped></style>
