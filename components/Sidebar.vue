<template>
  <b-sidebar
    type="is-light"
    :fullheight="fullheight"
    :full-width="fullwidth"
    :overlay="overlay"
    position="static"
    mobile="reduce"
    open
  >
    <div class="p-1">
      <div class="profil-user is-flex is-hidden-touch">
        <figure class="image is-128x128">
          <img
            class="is-rounded"
            src="https://bulma.io/images/placeholders/128x128.png"
          />
        </figure>
        <p v-if="credentials">
          {{ credentials.firstName + ' ' + credentials.lastName }}
        </p>
      </div>
      <hr />
      <b-menu>
        <b-menu-list label="Menu">
          <template v-for="(item, index) of items">
            <b-menu-item
              :key="index"
              :icon="item.icon"
              :label="item.title"
              tag="nuxt-link"
              :to="item.to"
            />
          </template>
          <b-menu-list label="Actions">
            <template v-if="isConnected">
              <b-menu-item
                icon="logout"
                label="Se déconnecter"
                @click="disconnectUser"
              />
            </template>
            <template v-else>
              <b-menu-item
                icon="login"
                label="Se connecter"
                @click="$router.push('/login')"
              />
            </template>
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
import { Vue, Component } from 'vue-property-decorator'
import { authUser } from '~/store'
import { AxiosHelper } from '~/utils/axiosHelper'
import AuthUser from '~/store/authUser'

@Component({
  data() {
    return {
      // @ts-ignore
      isConnected: AuthUser.getters?.['Authenticated']() || false,
      // @ts-ignore
      credentials: AuthUser.getters?.['Credentials']() || undefined
    }
  }
})
export default class Sidebar extends Vue {
  items = [
    {
      title: 'Tableau de bord',
      icon: 'home',
      to: { name: 'index' }
    },
    {
      title: 'Mon profile',
      icon: 'account',
      to: { name: 'user-id' }
    }
  ]

  open = true
  overlay = false
  fullheight = true
  fullwidth = false
  mobile = 'reduce'

  disconnectUser() {
    authUser.disconnectUser()
    AxiosHelper.RemoveHeaderAuthorizationToken()
    this.$router.push('/login')
  }
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
