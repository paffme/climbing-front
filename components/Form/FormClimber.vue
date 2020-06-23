<template>
  <div>
    <form @submit.prevent="sendResult">
      <table class="table">
        <thead>
          <tr>
            <th><abbr title="Nom">Nom</abbr></th>
            <th><abbr title="Top">Top</abbr></th>
            <th><abbr title="Try">Try</abbr></th>
            <th><abbr title="Zone">Zone</abbr></th>
            <th><abbr title="Zone">Résultats</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{ climber.firstName }} {{ climber.lastName }}</th>
            <th>
              <FormClimberRadio :data="results.top" @onSelect="selectTop" />
            </th>
            <td>
              <div class="content">
                <b-field>
                  <b-select v-model="results.try">
                    <option
                      v-for="maxTry in maxTries"
                      :key="maxTry"
                      :value="maxTry"
                    >
                      {{ maxTry }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </td>
            <td>
              <FormClimberRadio :data="results.zone" @onSelect="selectZone" />
            </td>
            <td>
              <b-button @click="sendResult">
                Envoyer les résultats
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BoulderingResultWithCredentials, User } from '~/definitions'
import FormClimberRadio from '~/components/Form/FormClimberRadio.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({
  components: { FormClimberRadio }
})
export default class FormClimber extends Vue {
  @Prop(Object) climber!: User
  @Prop(Number) blocId!: number
  @Prop(Number) groupId!: number
  @Prop(Number) roundId!: number
  @Prop(Number) competitionId!: number
  results: BoulderingResultWithCredentials = {
    climberId: this.climber.id,
    top: false,
    zone: false,
    try: 3,
    groupId: this.groupId,
    roundId: this.roundId,
    blocId: this.blocId
  }

  maxTries = 3

  created() {
    console.log('this', this)
    this.fetchClimberResult()
  }

  sendResult() {
    this.$emit('onSendNote', this.results)
  }

  selectTry(value: number) {
    this.results.try = value
  }

  selectZone(value: boolean) {
    console.log('selectZone', value)
    this.results.zone = value
  }

  selectTop(value: boolean) {
    this.results.top = value
    this.selectZone(value)
  }

  async fetchClimberResult() {
    try {
      console.log('this.roundId', this.roundId)
      const result = await ApiHelper.GetResultClimber(
        this.competitionId,
        this.roundId,
        this.groupId,
        this.blocId,
        this.climber.id
      )
      this.setResult(result.data.top, result.data.zone, result.data.tries)
    } catch (err) {
      console.log('err.data', err.response.status)
      if (err.response.status === 404) return
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  setResult(top: boolean, zone?: boolean, tries?: number) {
    this.results.top = top
    this.results.zone = zone || false
    this.results.try = tries || 3
  }
}
</script>

<style scoped>
/************************
Tinder Template by Miami
************************/
.tbg {
  height: 720px;
  width: 400px;
  background-color: #fff;
  margin: 0 auto;
  border: 1px solid #c0c0c0;
}
.tbgwrap {
  padding: 10px;
}
.theader {
  height: 65px;
  border-bottom: 1px solid #c0c0c0;
}
.theader i.fa-comments {
  color: #c0c0c0;
  font-size: 40px;
  display: inline-block;
  float: right;
  padding: 10px 20px;
  position: relative;
}
.theader i.fa-cog {
  color: #c0c0c0;
  font-size: 40px;
  display: inline-block;
  float: left;
  padding: 10px 20px;
  position: relative;
}
.tlogo {
  width: 100px;
  margin: 0 auto;
  padding: 10px;
}
.tlogo img {
  width: 100px;
}
.tphoto {
  width: 350px;
  height: 350px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  top: 15px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;
  border: 1px solid #c0c0c0;
  padding-bottom: 60px;
  background-color: #fff;
  box-shadow: 2px 2px 2px #c0c0c0;
}
.tphoto img {
}
.tname {
  padding: 15px;
  font-size: 20px;
  font-family: 'Helvetica', sans-serif;
  float: left;
}
.tname .age {
  font-weight: 200;
}
.tinfo {
  font-family: 'Helvetica', sans-serif;
}
.tinfo .fa-users,
.tinfo .fa-book {
  color: #c0c0c0;
  float: right;
  position: relative;
  font-size: 24px;
  padding: 12px;
}
.tcontrols {
}
.tno {
  background-color: #fff;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
  position: relative;
  display: inline-block;
  top: 50px;
  left: 25px;
  border: 10px solid #f0f0f0;
}
.customIcon {
  color: #ff695b;
  font-size: 80px;
  padding: 17px 28px;
}
.ti {
  background-color: #fff;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
  position: relative;
  display: inline-block;
  left: 12px;
  top: 30px;
  border: 10px solid #f0f0f0;
}
.ti .fa-info {
  font-size: 23px;
  padding: 15px 20px;
  color: #398beb;
}
.tyes {
  background-color: #fff;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
  position: relative;
  display: inline-block;
  top: 48px;
  left: 0px;
  border: 10px solid #f0f0f0;
}
.tyes i {
  color: #5de19c;
  font-size: 60px;
  padding: 35px 30px;
}
.credit {
  width: 400px;
  height: auto;
  position: relative;
  top: 60px;
  text-align: center;
  background-color: #f0f0f0;
  padding: 2px 0px;
}
.credit a {
  font-size: 7px;
  letter-spacing: 5px;
  color: #c0c0c0;
  text-decoration: none;
  text-transform: uppercase;
  font-family: 'Helvetica', sans-serif;
  font-style: italic;
}
</style>
