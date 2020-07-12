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

      <footer>
        <cookie-law theme="dark-lime" :button-text="`J'ai compris.`">
          <div slot="message">
            En utilisant les services de PAFFME, vous acceptez notre Utilisation
            des cookies. Nos partenaires et nous-mêmes opérons mondialement et
            utilisons des cookies, notamment à des fins de statistiques, de
            personnalisation et publicitaires.
          </div>
        </cookie-law>
      </footer>
    </div>
  </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
import Sidebar from '~/components/Sidebar'
import Navbar from '~/components/Navbar'
import { NAVBAR_METADATA } from '~/constants'

export default {
  components: {
    Sidebar,
    Navbar,
    CookieLaw
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
