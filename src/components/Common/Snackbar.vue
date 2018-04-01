<template>

    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

</template>

<script>
export default {
  props: ["text", "showThis"],
  data: () => ({
    snackbar: this.showThis, //initiate v-model using prop value
    y: "top",
    x: null,
    mode: "multi-line",
    timeout: 6000
    //text: 'Hello, I\'m a snackbar'
  }),
  watch: {
    snackbar: function() {
      //emit update when changing v-model
      this.$emit("update:showThis", this.snackbar);
    },
    showThis: function() {
      //change v-model when changing prop
      this.snackbar = this.showThis;
    }
  }
};
</script>

<style scoped src="./style.css"></style>