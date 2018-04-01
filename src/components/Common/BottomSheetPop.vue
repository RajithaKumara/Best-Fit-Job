<template>
  <div class="text-xs-center">
    <v-bottom-sheet inset persistent v-model="showDialog">
      <v-card dark>
        <slot></slot>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: ["showThis"],
  data: () => ({
    showDialog: true
  }),
  watch: {
    showDialog: function() {
      //emit update when changing v-model
      this.$emit("update:showThis", this.showDialog);
    },
    showThis: function() {
      //change v-model when changing prop
      this.showDialog = this.showThis;
    }
  }
};
</script>

<style scoped src="./style.css"></style>