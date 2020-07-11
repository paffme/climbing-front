<template>
  <div>
    <template
      v-if="_boulders && Array.isArray(_boulders) && _boulders.length > 0"
    >
      <p class="subtitle notification has-text-centered">
        Bloc numéro {{ _boulders[index].id }}
      </p>
      <b-carousel :autoplay="false" @change="onChange">
        <b-carousel-item v-for="(boulder, i) in _boulders" :key="i">
          <template v-if="_boulders[index].url">
            <span class="image is-4by3">
              <img :src="_boulders[index].url" />
            </span>
          </template>
          <template v-else>
            <section :class="`hero is-medium is-warning`">
              <div class="hero-body has-text-centered">
                <h1 class="title">
                  Image du bloc non disponible
                </h1>
              </div>
            </section>
          </template>
        </b-carousel-item>
      </b-carousel>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch, Prop } from 'vue-property-decorator'
import { APIBoulders, User } from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component
export default class CarousselBoulderImage extends Vue {
  @PropSync('boulders', { type: Array }) _boulders!: {
    id: number
    judges: User[]
    url: string
  }[]

  @Watch('boulders', { immediate: true, deep: true })
  async onBoulderFetchPhotos(boulders: APIBoulders[]) {
    console.log('onBoulderFetchPhotos - boulders', boulders)
    console.log('competitionId', this.competitionId)
    boulders.forEach(async (boulder, index) => {
      const result = await ApiHelper.GetBoulderPhoto(
        this.competitionId,
        this.roundId,
        this.groupId,
        boulder.id
      )

      this._boulders[index].url = result.data.url
    })
  }

  @Prop(Number) competitionId!: number
  @Prop(Number) roundId!: number
  @Prop(Number) groupId!: number
  index = 0

  onChange(value: number) {
    this.index = value
    this.$emit('onChangeBloc', this._boulders[value].id)
  }

  async getPhoto(
    competitionId: number,
    roundId: number,
    groupId: number,
    boulderId: number
  ) {
    try {
      const photos = await ApiHelper.GetBoulderPhoto(
        competitionId,
        roundId,
        groupId,
        boulderId
      )
      console.log('photos', photos)
      return photos.data.url
    } catch (err) {
      console.log('err', err)
      if (err.response?.data?.code === 'BOULDER_HAS_NO_PHOTO') {
        return
      }
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style>
.carousel-slide {
  width: 176px !important;
}
</style>
