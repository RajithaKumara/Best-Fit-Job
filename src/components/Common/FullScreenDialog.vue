<template>
<v-container fluid fill-height fill-width>
  <v-dialog
    v-model="showDialog"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay="false"
    scrollable
  >
    <v-card tile>
      <v-toolbar card dark color="primary">
        <v-btn icon @click.native="showDialog = false" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="toolbar"></slot>
      </v-toolbar>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <div style="flex: 1 1 auto;"/>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script>
export default {
  props: ["showThis", "title"],
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
