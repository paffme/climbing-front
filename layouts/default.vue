<template>
  <div>
    <Navbar :navbarItems="metadataNavbar"></Navbar>

    <div class="contents">
      <Sidebar></Sidebar>

      <div class="app">
        <nuxt/>
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
        metadataNavbar: NAVBAR_METADATA
      }
    }
  };
</script>

<style scoped>
  .contents {
    position: relative;
  }
  .app {
    padding-left: 260px;
  }

  @media screen and (max-width: 1023px) {
    .app {
      padding-left: 80px;
    }
  }
</style>
