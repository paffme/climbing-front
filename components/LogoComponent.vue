<template>
  <nuxt-link to="/">
    <img src="../assets/ffme_logo.png" alt="" width="140" />
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LogoComponent extends Vue {}
</script>

<style scoped></style>
