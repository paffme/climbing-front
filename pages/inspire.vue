<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Just start  <b-icon
        icon="rocket"
        size="is-large"
      />"
    </h2>
    <h3 class="subtitle is-6 has-text-grey">
      Author: <a href="https://github.com/anteriovieira">
        Antério Vieira
      </a>
    </h3>
  </section>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class InspirePage extends Vue {
    // Hooks
    beforeRouteEnter(to: any, from: any, next: any) {
      console.log('beforeRouteEnter', this)
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
  }
</script>
