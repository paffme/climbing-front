<template>
  <div>
    <template v-if="Boulders && Array.isArray(Boulders) && Boulders.length > 0">
      <p class="subtitle notification has-text-centered">
        Bloc numéro {{ Boulders[index].id }}
      </p>
      <b-carousel :autoplay="false" @change="onChange">
        <template v-for="(boulder, i) in Boulders">
          <b-carousel-item :key="i">
            <template v-if="boulder && boulder.img">
              <AnnotationComponent
                :group-id="groupId"
                :round-id="roundId"
                :boulder-id="boulder.id"
                :competition-id="competitionId"
                :img="boulder.img"
                :is-edition="true"
                :no-interact="true"
              />
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
        </template>
      </b-carousel>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import { APIBoulderPicture, APIBoulders, User } from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import AnnotationComponent from '~/components/AnnotationComponent.vue'

@Component({
  components: { AnnotationComponent }
})
export default class CarousselBoulderImage extends Vue {
  @Prop(Number) competitionId!: number
  @Prop(Number) roundId!: number
  @Prop(Number) groupId!: number
  @Prop(Array) boulders!: {
    id: number
    judges: User[]
    img: APIBoulderPicture
  }[]

  @Watch('boulders', { immediate: true, deep: true })
  async onBoulderFetchPhotos(boulders: APIBoulders[]) {
    this.Boulders = []
    boulders.forEach(async (boulder, index) => {
      try {
        const result = await ApiHelper.GetBoulderPhoto(
          this.competitionId,
          this.roundId,
          this.groupId,
          boulder.id
        )
        this.boulders[index].img = result.data
        this.Boulders.push(this.boulders[index])
      } catch (err) {
        console.log('err', err)
        this.Boulders.push(this.boulders[index])
      }
    })
  }

  Boulders: any = []

  index = 0

  onChange(value: number) {
    this.index = value
    this.$emit('onChangeBloc', this.Boulders[value].id)
  }
}
</script>

<style>
.carousel-slide {
  width: 176px !important;
}
</style>
