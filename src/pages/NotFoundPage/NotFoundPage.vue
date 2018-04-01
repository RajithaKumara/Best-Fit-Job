<template>
  <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title class="ml-4">Best Fit Job</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <section>
            <h1 class="display-1 mb-2">404 - Not Found</h1>
            <h3 class="headline mb-2">Oops! It seems that this page does not exist.</h3>
            <p class="subheading mb-2">Please check URL is correct or go to <router-link :to="{path:'/'}">Home</router-link>.</p>
          </section>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer>
      <app-footer/>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  beforeCreate: function() {
    this.$router.push("/NotFound");
  }
};
</script>

<style scoped src="./style.css"></style>
