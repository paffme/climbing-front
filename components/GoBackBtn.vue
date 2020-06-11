<template>
  <b-button icon-left="menu-left" @click="goBack" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class GoBackBtn extends Vue {
  goBack() {
    this.$router.go(-1)
  }
}
</script>

<style scoped></style>
