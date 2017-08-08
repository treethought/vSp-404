<template>
  <div>

   
    <!-- <h1>The count is: {{ count }}</h1> -->
    <div class='container'>
       <h1 class='row justify-center text-secondary'>SP-404sx</h1>
       <div class="row text-secondary row justify-center">
         <record class='text-secondary'></record>
         <loop class='text-secondary'></loop>
       </div>
      
    </div>
   


    <div class="row justify-center">
        <Pad v-for='i in range(1,3)' :num='i' :key='i'></Pad>
    </div>
    <div class="row justify-center">
        <Pad v-for='i in range(4, 6)' :num='i' :key='i'></Pad>
    </div>
    <div class="row justify-center">
        <Pad v-for='i in range(7,9)' :num='i' :key='i'></Pad>
    </div>
    <div class="row justify-center">
        <Pad v-for='i in range(10,12)' :num='i' :key='i'></Pad>
    </div> 


  </div>
</template>

<script>
import Pad from './Pad'
import Record from './Record'
import Loop from './Loop'
import store from '../store'
export default {
  store,
  // props: ['samples'],
  data () {
    return {
      count: store.state.pads
    }
  },
  components: {
    Pad,
    Record,
    Loop
  },
  methods: {
    range (min, max) {
      var array = []
      var j = 0
      for (var i = min; i <= max; i++) {
        array[j] = i
        j++
      }
      return array
    }
  }
}
</script>

<style>
</style>
