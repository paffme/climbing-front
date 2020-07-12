<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="notification content is-warning">
        <p>Gestion de l'apercu du bloc</p>
        <ol>
          <li>Uploader la photo</li>
          <li>Une fois uploader la photo les blocs seront reconnus par l'IA</li>
        </ol>
      </div>
    </div>
    <div class="column is-offset-3 is-6 upload">
      <div v-if="picture !== null" class="image">
        <AnnotationComponent
          :boulder-id="boulderId"
          :competition-id="competition.id"
          :group-id="groupId"
          :img="picture"
          :round-id="roundId"
          :no-interact="false"
        />
      </div>
      <div v-if="dropFile !== null" class="tags">
        <span class="tag is-primary">
          {{ dropFile.name }}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFile()"
          ></button>
        </span>
      </div>
      <div>
        <b-field>
          <b-upload
            v-model="dropFile"
            accept="image/jpg,image/jpeg"
            drag-drop
            expanded
            type="file"
          >
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large" />
                </p>
                <p>Ajouter une image ici</p>
              </div>
            </section>
          </b-upload>
        </b-field>
        <b-button
          v-show="dropFile !== null"
          type="is-info"
          icon-left="upload"
          expanded
          @click="uploadPhoto(competition.id, roundId, groupId, boulderId)"
        >
          Uploader
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  APIBoulderingRounds,
  APIBoulderPicture,
  APICompetition,
  APIUserCompetitionRoles
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import AnnotationComponent from '~/components/AnnotationComponent.vue'

@Component({
  components: { AnnotationComponent },
  middleware: ['isAuth', 'setHeader']
})
export default class ImagePage extends Vue {
  @Prop(Object) competition!: APICompetition
  @Prop(Object) role!: APIUserCompetitionRoles
  @Prop(Object) rounds!: APIBoulderingRounds

  picture: APIBoulderPicture | null = null

  roundId: number | null = null
  boulderId: number | null = null
  groupId: number | null = null

  dropFile = null
  isLoading = true

  created() {
    this.isLoading = true
    this.roundId = parseInt(this.$route.query.roundId as string, 10)
    this.boulderId = parseInt(this.$route.query.boulderId as string, 10)
    this.groupId = parseInt(this.$route.query.groupId as string, 10)

    this.getPhoto(
      this.competition.id!,
      this.roundId!,
      this.groupId!,
      this.boulderId!
    )
  }

  async getPhoto(
    competitionId: number,
    roundId: number,
    groupId: number,
    boulderId: number
  ) {
    this.picture = null

    try {
      this.isLoading = true
      const photo = await ApiHelper.GetBoulderPhoto(
        competitionId,
        roundId,
        groupId,
        boulderId
      )
      this.picture = photo.data
      this.isLoading = false

      console.log(photo.data.url)
    } catch (err) {
      this.isLoading = false
      console.log('err', err)
      if (err.response?.data?.code === 'BOULDER_HAS_NO_PHOTO') {
        return
      }
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async uploadPhoto(
    competitionId: number,
    roundId: number,
    groupId: number,
    boulderId: number
  ) {
    try {
      const formData = new FormData()
      formData.append('photo', this.dropFile!)

      await ApiHelper.UpdateBoulderPhoto(
        formData,
        competitionId,
        roundId,
        groupId,
        boulderId
      )

      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Upload Réussis'
      })
      this.dropFile = null

      if (this.competition.id && this.roundId && this.boulderId && this.groupId)
        await this.getPhoto(competitionId, roundId, groupId, boulderId)
    } catch (err) {
      this.$buefy.toast.open({
        type: 'is-danger',
        message: 'Upload Avorté',
        duration: 1000
      })
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  deleteDropFile() {
    this.dropFile = null
  }
}
</script>

<style scoped>
.upload {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
