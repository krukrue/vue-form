<template>
  <select v-model="input">
  <option value="0">CZK</option>
  <option value="1">USD</option>
  <option value="2">EUR</option>
  <option value="3">GBP</option>
</select>
</template>

<script>
  export default{
    data(){
      return{
        input: 0
      }
    },
    watch: {
      input(){
        this.$emit('selectChange', this.input)
      }
    }
  }
</script>