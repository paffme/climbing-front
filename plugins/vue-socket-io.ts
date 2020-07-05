import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO(
      'http://paffme.hdaroit.fr:4000/competitions-ranking',
      {}
    )
  })
)
