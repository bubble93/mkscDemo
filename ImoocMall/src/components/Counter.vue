<template>
  <div>
    <button @click="increment">+</button>
    <button v-on:click="decrement">-</button>
    <p><span>{{num}}</span></p>
  </div>
</template>
<script>
export default {
  props:["num"],  
  data(){
    return {
      num:0,
      msg: 'hello vue'
    }
  },
  methods:{
    increment(){
      this.$emit("incre");
    },
    decrement(){
      this.$emit("decre");
    }
  }
}
</script>