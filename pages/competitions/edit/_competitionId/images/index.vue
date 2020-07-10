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
      <div v-if="blocId" class="image">
        <AnnotationComponent :dimImg="{height: 444, width: 840}"/>
      </div>
      <div class="tags">
        <span
          v-for="(file, index) in dropFiles"
          :key="index"
          class="tag is-primary"
        >
          {{ file.name }}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFile(index)"
          ></button>
        </span>
      </div>
      <div>
        <b-field>
          <b-upload v-model="dropFiles" multiple expanded drag-drop>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large" />
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>
        <b-button
          v-show="dropFiles && Array.isArray(dropFiles) && dropFiles.length > 0"
          type="is-info"
          icon-left="upload"
          expanded
          @click="uploadPhoto(competition.id, roundId, groupId, blocId)"
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
  APICompetition,
  APIUserCompetitionRoles
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import AnnotationComponent from "~/components/AnnotationComponent.vue";

@Component({
  components: { AnnotationComponent },
  middleware: ['isAuth', 'setHeader']
})
export default class ImagePage extends Vue {
  @Prop(Object) competition!: APICompetition
  @Prop(Object) role!: APIUserCompetitionRoles
  @Prop(Object) rounds!: APIBoulderingRounds

  picture: API

  roundId: number | null = null
  blocId: number | null = null
  groupId: number | null = null

  hasUploadedPhoto = false

  dropFiles = []

  created() {
    this.roundId = parseInt(this.$route.query.roundId as string, 10)
    this.blocId = parseInt(this.$route.query.boulderId as string, 10)
    this.groupId = parseInt(this.$route.query.groupId as string, 10)

    if (this.competition.id && this.roundId && this.blocId && this.groupId)
      this.getPhoto(
        this.competition.id,
        this.roundId,
        this.groupId,
        this.blocId
      )
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
      return photos
    } catch (err) {
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
      console.log('dropFiles', this.dropFiles)
      const formData = new FormData()

      formData.append('photo', this.dropFiles[0])
      await ApiHelper.UpdateBoulderPhoto(
        formData,
        competitionId,
        roundId,
        groupId,
        boulderId
      )
      this.hasUploadedPhoto = true
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  deleteDropFile(index: number) {
    this.dropFiles.splice(index, 1)
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
