<template>
  <b-carousel-list v-model="test" :data="boulders" :items-to-show="1">
    <template slot="item" slot-scope="props">
      <div class="card">
        <div class="card-image">
          <figure class="image is-5by4">
            <a @click="info(props.index)"><img :src="props.list.image" /></a>
          </figure>
          <b-tag type="is-danger" rounded style="position: absolute; top: 0;">
            <b>50%</b>
          </b-tag>
        </div>
        <div class="card-content">
          <div class="content">
            <p class="title is-6">
              {{ props.list.title }}
            </p>
            <p class="subtitle is-7">
              @johnsmith
            </p>
            <div class="field is-grouped">
              <p v-if="props.list.rating" class="control">
                <b-rate :value="props.list.rating" show-score disabled />
              </p>
              <p class="control" style="margin-left: auto;">
                <button class="button is-small is-danger is-outlined">
                  <b-icon size="is-small" icon="heart" />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </b-carousel-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component
export default class BouldersPicture extends Vue {
  @Prop(Number) boulderId!: number
  @Prop(Object) readonly round!: { id: number; boulderIds: Array<number> }
  @Prop(Object) readonly competition!: { id: number; name: string }
  boulders: Array<{ id: number; image: string | null }> = []

  @Prop(Object) readonly annotations!: Array<Array<Number>>

  test = 0
  items: any = null

  created() {
    this.retrieveImageAPI()
    this.round.boulderIds.forEach((boulderId) => {
      this.boulders.push({
        id: boulderId,
        image: 'https://buefy.org/static/img/placeholder-1280x960.png'
      })
    })
  }

  info(value: any) {
    this.test = value
  }

  async retrieveImageAPI() {
    const fakeData = [
      {
        title: 'Slide 1',
        image: 'https://buefy.org/static/img/placeholder-1280x960.png'
      },
      {
        title: 'Slide 2',
        image: 'https://buefy.org/static/img/placeholder-1280x960.png',
        rating: 3.5
      },
      {
        title: 'Slide 3',
        image: 'https://buefy.org/static/img/placeholder-1280x960.png',
        rating: 5
      },
      {
        title: 'Slide 4',
        image: 'https://buefy.org/static/img/placeholder-1280x960.png'
      },
      {
        title: 'Slide 5',
        image: 'https://buefy.org/static/img/placeholder-1280x960.png',
        rating: 5
      },
      {
        title: 'Slide 6',
        image: 'https://buefy.org/static/img/placeholder-1280x960.png',
        rating: 4
      },
      {
        title: 'Slide 7',
        image: 'https://buefy.org/static/img/placeholder-1280x960.png',
        rating: 2.7
      },
      {
        title: 'Slide 8',
        image: 'https://buefy.org/static/img/placeholder-1280x960.png',
        rating: 1.5
      }
    ]
    try {
      this.items = fakeData
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>
