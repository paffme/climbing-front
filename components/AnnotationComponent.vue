<template>
  <div>
    <div v-show="!isEdition" class="field">
      <section>
        <div class="block">
          <b-radio
            v-model="climbingHoldType"
            :disabled="!drawing || !annotationLoaded"
            :native-value="typeHolds.START"
            name="name"
            type="is-success"
          >
            Début
          </b-radio>
          <b-radio
            v-model="climbingHoldType"
            :disabled="!drawing || !annotationLoaded"
            :native-value="typeHolds.NORMAL"
            name="name"
            type="is-info"
          >
            Autre
          </b-radio>
          <b-radio
            v-model="climbingHoldType"
            :disabled="!drawing || !annotationLoaded"
            :native-value="typeHolds.ZONE"
            name="name"
            type="is-warning"
          >
            Zone
          </b-radio>
          <b-radio
            v-model="climbingHoldType"
            :disabled="!drawing || !annotationLoaded"
            :native-value="typeHolds.TOP"
            name="name"
            type="is-danger"
          >
            Top
          </b-radio>
          <b-switch
            v-model="deleting"
            :value="false"
            type="is-danger"
            @input="modeDelete"
          >
            Mode Suppression
          </b-switch>
        </div>
      </section>
    </div>
    <div v-if="!annotationLoaded" class="has-text-centered content">
      <b-progress></b-progress>
      <span>Detection des prises...</span>
    </div>
    <div class="annotator">
      <v-annotator
        v-if="holds !== null && img !== null"
        :drawing="drawing && annotationLoaded"
        :height="img && img.height"
        :grid="[0, 0]"
        :width="img && img.width"
        :min-size="[5, 5]"
        :no-interact="noInteract"
        :no-select="false"
        @click.native.ctrl="tryChangeBoxColor"
        @draw-end="drawFinish"
        @select="tryDeleteBox"
        @unselect="unselected"
      >
        <img
          v-if="img !== null"
          id="imgBlock"
          :src="img && img.url"
          draggable="false"
          height="100%"
          width="100%"
        />
        <template v-for="(hold, i) in holds.boundingBoxes">
          <rect
            :id="i"
            :key="i"
            slot="annotation"
            :height="Math.abs(hold.coordinates[2] - hold.coordinates[0])"
            :style="{ cursor: cursor, stroke: getColorFromType(hold.type) }"
            :width="Math.abs(hold.coordinates[3] - hold.coordinates[1])"
            :x="hold.coordinates[1]"
            :y="hold.coordinates[0]"
            fill="none"
          >
          </rect>
        </template>
        <rect
          v-if="holds !== null && !noInteract"
          slot="drawing"
          :stroke="getColorFromType(climbingHoldType)"
        >
        </rect>
      </v-annotator>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VAnnotator from 'vue-annotator'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { APIBoulderPicture, APIHolds, TypeHolds } from '~/definitions'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({ components: { VAnnotator } })
export default class AnnotationComponent extends Vue {
  @Prop(Object) img!: APIBoulderPicture
  @Prop(Number) competitionId!: number
  @Prop(Number) roundId!: number
  @Prop(Number) groupId!: number
  @Prop(Number) boulderId!: number
  @Prop(Boolean) isEdition!: boolean
  @Prop(Boolean) noInteract!: boolean

  typeHolds = TypeHolds

  deleting = false
  drawing = true

  cursor = 'auto'
  climbingHoldType = TypeHolds.START

  holds: APIHolds | null = null
  annotationLoaded = false

  mounted() {
    this.roundId = this.roundId
      ? this.roundId
      : parseInt(this.$route.query.roundId as string, 10)
    this.boulderId = this.boulderId
      ? this.boulderId
      : parseInt(this.$route.query.boulderId as string, 10)
    this.groupId = this.groupId
      ? this.groupId
      : parseInt(this.$route.query.groupId as string, 10)

    this.holdsInterval()
  }

  async tryChangeBoxColor(annotation: any) {
    if (
      this.annotationLoaded &&
      !this.deleting &&
      annotation.toElement.nodeName === 'rect' &&
      this.holds!.boundingBoxes[annotation.target.id].type !==
        this.climbingHoldType
    ) {
      const deletedBox = await this.deleteBox(annotation.target)

      const updateBox: APIHolds = {
        boundingBoxes: [
          {
            coordinates: deletedBox[0].coordinates,
            type: this.climbingHoldType
          }
        ]
      }

      await this.uploadHold(updateBox)
      this.holds!.boundingBoxes.push(updateBox.boundingBoxes[0])
    }
  }

  tryDeleteBox(annotation: any) {
    if (this.deleting) {
      this.deleteBox(annotation.node)
    }
  }

  private deleteBox(box: any): any {
    const deletedBox = this.holds!.boundingBoxes.splice(box.id, 1)

    this.deleteHold({ boundingBoxes: [deletedBox[0]] })

    if (
      box.nextElementSibling !== null &&
      box.nextElementSibling.nodeName === 'g'
    ) {
      document.getElementById(box.nextElementSibling.id)!.remove()
    }

    return deletedBox
  }

  drawFinish(element: any) {
    const newHold: APIHolds = {
      boundingBoxes: [
        {
          coordinates: [
            element.node.y.baseVal.value,
            element.node.x.baseVal.value,
            element.node.y.baseVal.value + element.node.height.baseVal.value,
            element.node.x.baseVal.value + element.node.width.baseVal.value
          ],
          type: this.climbingHoldType
        }
      ]
    }

    this.uploadHold(newHold)
    this.holds!.boundingBoxes.push(newHold.boundingBoxes[0])

    document.getElementById(element.node.id)!.remove()
  }

  unselected(element: any) {
    if (
      element.node.nextElementSibling !== null &&
      element.node.nextElementSibling.nodeName === 'g'
    ) {
      document.getElementById(element.node.nextElementSibling.id)!.remove()
    }
  }

  async getHolds(): Promise<APIHolds | null> {
    try {
      const result = await ApiHelper.GetHolds(
        this.competitionId,
        this.roundId,
        this.groupId,
        this.boulderId
      )

      return result.data
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  async holdsInterval() {
    this.annotationLoaded = false
    const holdList = await this.getHolds()
    const timeout = 5000

    if (holdList && holdList.boundingBoxes) {
      this.holds = holdList
      this.annotationLoaded = true
      return
    }

    const intervalId = setInterval(async () => {
      if (this.holds && this.holds.boundingBoxes) {
        this.annotationLoaded = true
        clearInterval(intervalId)
        return
      }
      this.holds = await this.getHolds()
    }, timeout)
  }

  async uploadHold(holds: APIHolds) {
    try {
      await ApiHelper.PostHolds(
        holds,
        this.competitionId,
        this.roundId,
        this.groupId,
        this.boulderId
      )
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  async deleteHold(holds: APIHolds) {
    try {
      await ApiHelper.DeleteHolds(
        holds,
        this.competitionId,
        this.roundId,
        this.groupId,
        this.boulderId
      )
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  getColorFromType(type: TypeHolds): string {
    switch (type) {
      case TypeHolds.START:
        return '#23d160'
      case TypeHolds.NORMAL:
        return '#209cee'
      case TypeHolds.ZONE:
        return '#ffdd57'
      case TypeHolds.TOP:
        return '#ff3860'
      default:
        return '#209cee'
    }
  }

  modeDelete(mode: boolean) {
    if (mode) {
      this.drawing = false
      this.noInteract = true
      this.cursor = 'crosshair'
    } else {
      this.drawing = true
      this.noInteract = false
      this.cursor = 'auto'
    }
  }
}
</script>

<style scoped lang="scss">
.annotator {
  touch-action: none;
}

rect {
  stroke-width: 2px;
  fill: rgba(205, 212, 214, 0.01);
  touch-action: none;
}

.progress-wrapper {
  margin: 0 !important;
}
</style>
