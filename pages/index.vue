<template>
  <section class="section">
    <h1>Test Deploy - Master 3</h1>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class HomePage extends Vue {
  // Hooks
  beforeRouteEnter(to: any, from: any, next: any) {
    console.log('beforeRouteEnter')
    next()
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    console.log('beforeRouteUpdate')
    next()
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    console.log('beforeRouteLeave')
    next()
  }
  // Properties

  // Component Data
  message: string = 'This is a message'

  // Computed properties
}
</script>
