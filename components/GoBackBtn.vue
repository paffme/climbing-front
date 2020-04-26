<template>
  <b-button icon-left="menu-left" v-on:click="goBack"></b-button>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";

  @Component
  export default class GoBackBtn extends Vue {

    goBack() {
      this.$router.go(-1);
    }
  }
</script>

<style scoped>

</style>
