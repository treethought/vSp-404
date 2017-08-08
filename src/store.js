import Vue from 'vue'
import Vuex from 'vuex'
// import { storage } from './storage'
// import { mapState, mapGetter }

export default new Vuex.Store({
  strict: true,
  state: {
    recordingArmed: false,
    isRecording: false,
    currentPad: null,
    pads: {
      1: {num: 1, playing: false, recording: false, loop: false},
      2: {num: 2, playing: true, recording: false, loop: false},
      3: {num: 3, playing: false, recording: false, loop: false},
      4: {num: 4, playing: false, recording: false, loop: false},
      5: {num: 5, playing: false, recording: false, loop: false},
      6: {num: 6, playing: false, recording: false, loop: false},
      7: {num: 7, playing: false, recording: false, loop: false},
      8: {num: 8, playing: false, recording: false, loop: false},
      9: {num: 9, playing: false, recording: false, loop: false},
      10: {num: 10, playing: false, recording: false, loop: false},
      11: {num: 11, playing: false, recording: false, loop: false},
      12: {num: 12, playing: false, recording: false, loop: false}
    }
  },
  getters: {
    pad: (state) => (num) => {
      return state.pads[num]
      // return state.pads.filter(pad => pad.num === num)
    },
    padIsPlaying: (state, getters) => (num) => {
      return getters.pad(num).playing
      // return getters.pad(num).playing
    },
    padIsLooped: (state, getters) => (num) => {
      return getters.pad(num).loop
    },
    padIsRecording: (state, getters) => (num) => {
      return getters.pad(num).recording
    },
    padsRecording: (state) => {
      var result = []
      for (var i in state.pads) {
        if (state.pads.hasOwnProperty(i) && state.pads[i].recording) {
          result.push(state.pads[i])
        }
      }
      return result
      // return state.pads.filter(pad => pad.recording)
    },
    currentlyPlaying: (state) => {
      var result = []
      for (var i in state.pads) {
        if (state.pads.hasOwnProperty(i) && state.pads[i].playing) {
          result.push(state.pads[i])
        }
      }
      return result
      // return state.pads.filter(pad => pad.playing === true)
    }

  },
  mutations: {
    setCurrentPad (state, pad) {
      state.currentPad = pad
    },
    setPlaying (state, {pad, status}) {
      // console.log('setting pad ' + num + ' as playing')
      Vue.set(pad, 'playing', status)
    },
    setPadRecording (state, {pad, status}) {
      // console.log('setting pad ' + num + ' as playing')
      Vue.set(pad, 'recording', status)
      state.isRecording = true
    },
    armRecording (state, status) {
      state.isRecording = false // recording ends if disarmed, or doesnt start yet if armed
      state.recordingArmed = status
    },
    toggleLoop (state) {
      let currentStatus = state.currentPad.loop
      Vue.set(state.currentPad, 'loop', !currentStatus)
    }
  },
  actions: {
    setCurrentPad (context, num) {
      let pad = context.getters.pad(num)
      context.commit('setCurrentPad', pad)
    },
    play (context, num) {
      let pad = context.getters.pad(num)
      let payload = {pad: pad, status: true}

      context.commit('setPlaying', payload)
    },
    stopPlay (context, num) {
      let pad = context.getters.pad(num)
      let payload = {pad: pad, status: false}

      context.commit('setPlaying', payload)
    },
    // toggleLoop (context) {
    //   let pad = context.getters.pad(num)
    //   let status = !pad.loop
    //   let payload = {pad: pad, status: status}
    //   context.commit('setLoop', payload)
    // },
    record (context, num) {
      let pad = context.getters.pad(num)
      let payload = {pad: pad, status: true}

      context.commit('setPadRecording', payload)
    },
    endRecording (context) {
      // let recPads = context.getters.padsRecording
      let pads = context.state.pads
      for (var i in pads) {
        if (pads.hasOwnProperty(i) && pads[i].recording) {
          console.log('INIT')
          let payload = {pad: pads[i], status: false}
          context.commit('setPadRecording', payload)
        }
      }
      context.commit('armRecording', false)
    }
  }
})
