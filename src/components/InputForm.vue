<template>
  <label class="input-form" for="text"
    ><input
      v-model.lazy="inputData"
      :placeholder="`Enter your ` + placehold"
      
      type="text"
  /></label>
</template>

<script>
export default {
  props: ["vmodel", "placehold"],
  data() {
    return {
      inputData: null,
    };
  },
  watch: {
    inputData() {
      this.$emit("changeInput", this.vmodel, this.inputData);
    },
  },
};
</script>
