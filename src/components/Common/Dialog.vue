<template>
<v-container fluid fill-height fill-width>
  <v-layout row justify-center>
    <v-dialog v-model="showDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>{{text}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot></slot>
          <v-btn color="green darken-1" flat v-on:click="showDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</v-container>
</template>

<script>
export default {
  props: ["showThis", "text", "title"],
  data: () => ({
    showDialog: this.showThis
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