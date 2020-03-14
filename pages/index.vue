<template>
  <section class="section">
    <h1>Test Deploy - 1</h1>
    <div class="columns is-mobile">
      <card title="Free" icon="github-circle">
        Open source on
        <a href="https://github.com/buefy/buefy">
          GitHub
        </a>
      </card>

      <card title="Responsive" icon="cellphone-link">
        <b class="has-text-grey">
          Every
        </b>
        component is responsive
      </card>

      <card title="Modern" icon="alert-decagram">
        Built with
        <a href="https://vuejs.org/">
          Vue.js
        </a>
        and
        <a href="http://bulma.io/">
          Bulma
        </a>
      </card>

      <card title="Lightweight" icon="arrange-bring-to-front">
        No other internal dependency
      </card>
    </div>
  </section>
</template>

<script lang="ts">
import Card from '~/components/Card.vue'
import { Vue, Component } from 'vue-property-decorator'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
])

@Component({
  components: { Card },
})
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
