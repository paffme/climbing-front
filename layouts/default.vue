<template>
  <div class="columns is-gapless">
    <Sidebar></Sidebar>
    <div class="column">
      <Navbar :navbarItems="metadataNavbar"></Navbar>
      <section class="main-content">
        <nuxt/>
      </section>
    </div>
  </div>
</template>

<script>
  import Sidebar from '~/components/Sidebar'
  import Navbar from '~/components/Navbar'
  import { NAVBAR_METADATA } from "~/constants";

  export default {
    components: {
      Sidebar,
      Navbar
    },
    data: function() {
      return {
        metadataNavbar: NAVBAR_METADATA,
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
      }
    }
  };
</script>
