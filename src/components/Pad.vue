<template>
  <div class='col'>
  <!-- <h3>{{getAudioSrc()}}</h3> -->
      <button><img :src='picUrl' @click.stop.prevent='clickPad'></button>
      <audio class='hidden' ref='padAudio' :src='audioSrc' :loop='looping' @ended='togglePlay'></audio>
      <!-- <button type="button" class="primary">{{num}}</button> -->
  </div>


</template>

<script>
import {storage} from '../storage'
// import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

export default {
  props: ['num'],
  methods: {
    clickPad () {
      this.$store.dispatch('setCurrentPad', this.num)
      if (this.$store.state.recordingArmed) {
        this.recordtoPad()
      }
      else {
        this.togglePlay()
      }
    },
    togglePlay () {
      if (this.active) {
        // this.active = false
        this.$store.dispatch('stopPlay', this.num)
        this.$refs.padAudio.pause()
      }
      else {
        this.$store.dispatch('play', this.num)
        this.$refs.padAudio.play()
      }
    },
    recordtoPad () {
      console.log('record to pad')
      this.$store.dispatch('record', this.num)
    }
  },
  computed: {
    picUrl: function () {
      if (this.active) {
        return require('../assets/images/' + this.num + '_on.png')
      }
      else if (!this.active) {
        return require('../assets/images/' + this.num + '_off.png')
      }
    },
    audioSrc () {
      let fileName = 'samples/' + this.num + '.wav'
      let sampleRef = storage.child(fileName)
      // console.log(sampleRef.getDownloadURL())
      sampleRef.getDownloadURL().then(url => {
        this.$refs.padAudio.src = url
      })
    },
    active () {
      return this.$store.getters.padIsPlaying(this.num) || this.$store.getters.padIsRecording(this.num)
    },
    looping () {
      return this.$store.getters.padIsLooped(this.num)
    }
  },
  data () {
    return {
      // pathRef: this.samples.child('samples/' + this.num + '.wav')

      // audioSrc: this.samples
    }
  },
  created () {
    console.log('pad ' + this.num + 'created')
    // this.getAudioSrc()
  }
}
</script>

<style>
</style>
