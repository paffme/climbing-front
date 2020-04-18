<template>
  <div>

    <div class="columns is-gapless">
      <div class="column is-2">
        <Sidebar></Sidebar>
      </div>
      <div class="column ">
        <Navbar :navbarItems="metadataNavbar"></Navbar>
        <section class="main-content">
          <nuxt/>
        </section>
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
