<template>
  <div>
    <div id="nav">
      <Navbar></Navbar>
    </div>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <Sidebar></Sidebar>
      </aside>

      <div class="container column is-10">
        <nuxt/>
      </div>
    </section>
  </div>
</template>

<script>
  import Sidebar from '~/components/Sidebar'
  import Navbar from '~/components/Navbar'
  export default {
    components: {
      Sidebar,
      Navbar
    }
  };
</script>
