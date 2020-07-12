<template>
  <nuxt-link :key="competition.id" :to="`/competitions/${competition.id}`">
    <article class="media competitions">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>
              {{ competition.name }}
            </strong>
            <small>
              Il y a deux jours
            </small>
            <br />
            {{ competition.description }}
            <br />
            {{ competition.address }} |
            {{ competition.startDate | formatDate }}
          </p>
        </div>
      </div>
      <div class="media-right">
        <p class="level-item">
          <!--<b-tooltip label="Editer la compétition">
            <nuxt-link :to="`/competitions/edit/${competition.id}`">
              <b-icon
                class="icon"
                type="is-info"
                icon="square-edit-outline"
              >
              </b-icon>
            </nuxt-link>
          </b-tooltip>-->
          <b-tooltip label="Aller à la compétition">
            <nuxt-link :to="`/competitions/${competition.id}`">
              <b-icon
                class="icon"
                type="is-info"
                icon="arrow-right-bold-circle"
              >
              </b-icon>
            </nuxt-link>
          </b-tooltip>
        </p>
      </div>
    </article>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import { APICompetition } from '~/definitions'

@Component({
  filters: {
    formatDate: (dirtyDate: Date): string => {
      moment.locale('fr')
      return moment(dirtyDate).format('LLLL')
    }
  }
})
export default class ShowCompetitionComponent extends Vue {
  @Prop(Object) competition!: APICompetition
}
</script>

<style scoped>
strong {
  color: inherit;
}

.media {
  padding: 10px;
}
.competitions {
  text-decoration: none;
  color: black;
}
.competitions:hover {
  background-color: #03378c;
  color: white !important;
}
.icon {
  margin: 0 10px;
}
.icon:hover {
  color: white !important;
}
._title {
  margin-bottom: 15px;
}
#content {
  height: 100vh;
}
</style>
