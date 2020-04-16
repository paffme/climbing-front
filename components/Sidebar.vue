<template>
  <div>
    <p class="menu-label is-hidden-touch">
      General
    </p>
    <ul class="menu-list">
      <li
        v-for="(item, key) of items"
        :key="key">
        <nuxt-link
          :to="item.to"
          exact-active-class="is-active">
          <b-icon :icon="item.icon"/>
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";

  @Component
  export default class Sidebar extends Vue {
    data() {
      return {
        items: [
          {
            title: "Tableau de bord",
            icon: "home",
            to: { name: "dashboard" }
          },
          {
            title: "Compétitions",
            icon: "lightbulb",
            to: { name: "competitions" }
          },
          {
            title: "Mon profile",
            icon: "account",
            to: { name: "user-id" }
          }
        ]
      };
    }
  }
</script>

<style scoped>

</style>
