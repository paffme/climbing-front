<template>
  <b-sidebar
    type="is-light"
    :fullheight="fullheight"
    :fullWidth="fullwidth"
    :overlay="overlay"
    position="static"
    mobile="reduce"
    open
  >
    <div class="p-1">
      <div class="profil-user is-flex is-hidden-touch">
        <figure class="image is-128x128">
          <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <p>Connor McGregor</p>
      </div>
      <hr>
      <b-menu>
        <b-menu-list label="Menu">
          <template v-for="(item) of items">
            <b-menu-item
              :icon="item.icon"
              :label="item.title"
              tag="nuxt-link"
              :to="item.to"
            >
            </b-menu-item>
          </template>
          <b-menu-list label="Actions">
            <b-menu-item icon="logout" label="Se déconnecter"></b-menu-item>
          </b-menu-list>
        </b-menu-list>
      </b-menu>
    </div>
  </b-sidebar>
</template>

<style>
  .p-1 {
    padding: 1em;
  }
</style>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";

  @Component
  export default class Sidebar extends Vue {
    items = [
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
    ];
    open = true;
    overlay = false;
    fullheight = true;
    fullwidth = false;
    mobile = "reduce";
  }
</script>

<style scoped lang="scss">
  .profil-user {
    flex-direction: column;
    align-items: center;
  }

  .profil-user p {
    padding-top: 20px;
  }
</style>
