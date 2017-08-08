<template>
  <div>
    <button type="button"  v-bind:class="{ active: recordingArmed }" v-on:click.stop.prevent="clickRecord">
     <!--  <i class="stop icon" v-show="isRecording"></i>
      <i class="record icon" v-show="!isRecording"></i>
      <span v-show="!recordingArmed">Arm recording</span>
      <span v-show="!isRecording"></span>
      <span v-show="isRecording">Stop recording</span> -->
      Record
    </button>
    
  </div>
</template>

<script>
export default {
  props: ['samples'],
  data () {
    return {
      audioRecorder: null,
      recordingData: [],
      stream: [],
      dataUrl: ''

    }
  },
  computed: {
    recordingArmed: function () {
      return this.$store.state.recordingArmed
    },
    isRecording: function () {
      return this.$store.state.isRecording
    }
  },
  watch: {
    isRecording: function () {
      if (this.isRecording) {
        this.record()
      }
      else {
        this.audioRecorder.stop()
      }
    }
  },
  methods: {
    clickRecord () {
      if (!this.recordingArmed) { // arm but dont record
        this.$store.commit('armRecording', true)
      }
      else if (!this.isRecording) { // simply cancel the armed state
        this.$store.commit('armRecording', false)
      }
      else if (this.isRecording) { // end recording and disarm
        this.$store.dispatch('endRecording')
      }
    },
    record () {
      var self = this
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

      navigator.getUserMedia({
        audio: true,
        video: false
      }, function (stream) {
        self.stream = stream
        self.audioRecorder = new MediaRecorder(stream, {
          mimetype: 'audio/ogg',
          audioBitsPerSecond: 96000
        })
        self.audioRecorder.start()
        console.log('Recorder started')
        self.audioRecorder.ondataavailable = function (event) {
          console.log('data available')
          self.recordingData.push(event.data)
        }

        self.audioRecorder.onstop = function (event) {
          console.log('Media Recorder stopped')
          var blob = new Blob(self.recordingData, {type: 'audio/ogg'})
          self.dataUrl = window.URL.createObjectURL(blob)
        }
      }, function (error) {
        alert(JSON.stringify(error))
      })
    },
    togglePlay () {
      var audioElement = document.getElementById('audio')
      if (audioElement.paused === false) {
        audioElement.pause()
      }
      else {
        audioElement.play()
      }
    }
  },
  created () {
    this.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
  }
}
</script>
<style>
  button {
    background-color: #5555;
  }
  button.active {
    background-color: orange;
  }
</style>
