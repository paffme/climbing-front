<template>
  <div class="columns">
    <div class="column">
      <h1 class="title">En cours de création...</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  middleware: 'isAuth',
})
export default class UserId extends Vue {}
</script>

<style scoped></style>
