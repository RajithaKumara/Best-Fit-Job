<template>
  <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      <div class="ma-1"></div>
      <v-toolbar-title>Best Fit Job</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <section>
            <h3 class="headline mb-2">Automatic redirection failed...</h3>
            
            <p class="subheading mb-2">Please 
              <a href="https://www.bfj.exprograma.com/#/SignUp">Click me</a>
              to redirect SignUp page.</p>
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
import { rootURL, seekerHomeRoute, employerHomeRoute } from "../../data/data";
import { cookie } from "../../models/cookie";
const validator = require("validator");

export default {
  data: () => ({}),
  beforeCreate: function() {
    if (cookie.isSet("user")) {
      //if already user signin
      console.log("user already sign in");

      let signInUser = cookie.get("user");
      if (signInUser.auth.role == "seeker") {
        this.$router.push(seekerHomeRoute);
      } else if (signInUser.auth.role == "employer") {
        this.$router.push(employerHomeRoute);
      } else {
        this.$router.push("/");
      }
      return;
    }

    cookie.remove("authUser"); //remove user cookie if exist in browser

    let user = this.$route.query;
    if (
      user.id != undefined &&
      user.email != undefined &&
      validator.isEmail(user.email)
    ) {
      cookie.set("authUser", user);
      this.$router.push("/SignUp");
    } else {
      this.$router.push("/NotFound");
    }
  },

  methods: {}
};
</script>