<template>
  <div>
    <Navbar :navbarItems="metadataNavbar"></Navbar>
    <div class="custom_content">
      <Sidebar></Sidebar>

      <div class="columns is-gapless">
        <div class="column is-12">
          <section class="main-content">
            <nuxt/>
          </section>
        </div>
      </div>
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

<style scoped lang="scss">
  .custom_content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
</style>
