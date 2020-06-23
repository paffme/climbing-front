<template>
  <div>
    <Navbar :navbar-items="metadataNavbar" />
    <div class="custom_content">
      <Sidebar />

      <div class="perso_content">
        <section class="main-content">
          <section class="section">
            <div class="container is-fluid">
              <nuxt />
            </div>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'
import Navbar from '~/components/Navbar'
import { NAVBAR_METADATA } from '~/constants'

export default {
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      metadataNavbar: NAVBAR_METADATA,
      items: [
        {
          title: 'Tableau de bord',
          icon: 'home',
          to: { name: 'dashboard' }
        },
        {
          title: 'Compétitions',
          icon: 'lightbulb',
          to: { name: 'competitions' }
        },
        {
          title: 'Mon profil',
          icon: 'account',
          to: { name: 'user-id' }
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.custom_content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.perso_content {
  width: 100%;
  height: 100vh;
  overflow: scroll;
}
</style>
