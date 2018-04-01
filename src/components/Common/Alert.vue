<template>
  <v-container grid-list-md text-xs-center :class="type">

    <div class="my-2" >
      <v-layout row wrap justify-center align-center>
        <v-flex xs2 sm2>
          <v-icon class="mr-1 i-dark">{{icon}}</v-icon>
        </v-flex>

        <slot name="message"></slot>
        <slot name="action"></slot>
      </v-layout>
    </div>

  </v-container>
</template>

<script>
export default {
  props: ["type"],
  data: () => ({}),
  computed: {
    icon: function() {
      switch (this.type) {
        case "c-red":
          return "error";
        case "c-green":
          return "check_circle";
        case "c-yellow":
          return "warning";
        default:
          return "info";
      }
    }
  }
};
</script>

<style scoped src="./style.css"></style>

