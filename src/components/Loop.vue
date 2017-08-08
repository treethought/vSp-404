<template>
  <div>
      <button type="button"  v-bind:class="{ active: loopActive }" v-on:click.stop.prevent="clickLoop">
      Loop
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    clickLoop () {
      this.$store.commit('toggleLoop')
    }
  },
  computed: {
    loopActive: function () {
      let currentPad = this.$store.state.currentPad
      if (currentPad) {
        return currentPad.loop
      }
    }
  }
}
</script>

<style>
</style>
