<template>
  <v-app id="inspire" dark>
    <v-toolbar dark>
      <v-toolbar-title>Create user account</v-toolbar-title>
    </v-toolbar>

    <v-progress-linear :indeterminate="true" v-show="progress" class="my-0"></v-progress-linear>

    <v-container grid-list-md>
      <v-layout row wrap>

        <div class="pb-2" v-if="showError">
          <v-alert outline color="error" icon="warning" :value="showError">
            {{errorMsg}}
          </v-alert>
        </div>

        <v-form class="form" v-model="valid" ref="form" lazy-validation>
        <v-flex xs12>
          <v-text-field
            box dark
            readonly
            label="Email address"
            v-model="email"
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            box dark
            name="signup_pass" 
            label="Create password"
            :rules="passwordRules"
            v-model="createPassword"
            :append-icon="en ? 'visibility' : 'visibility_off'"
            :append-icon-cb="()=>(en=!en)"
            :type="en ? 'password' : 'text'"
            autofocus
            @keypress.enter="focusNext()"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            box dark
            name="signup_conf_pass" 
            label="Confirm password"
            :rules="confirmPasswordRules"
            v-model="confirmPassword"
            :hint="hint"
            :persistent-hint="err"
            :error="err"
            type="password"
            ref="cpass"
            @keypress.enter="submit()"
            required
          ></v-text-field>
        </v-flex>
        </v-form>

        <v-flex  xs12>
          <v-radio-group v-model="role">
            <v-radio
              key="1"
              label="Job Seeker"
              value="seeker"
            ></v-radio>
            <v-radio
              key="2"
              label="Employer"
              value="employer"
            ></v-radio>
          </v-radio-group>
        </v-flex>

        <v-flex  xs12>
          <v-btn 
            :disabled="disableBtn || !valid" 
            v-on:click="submit" 
            color="primary"
          >Create Account</v-btn>
          <v-btn 
            v-on:click="cancel" 
            flat
          >Cancel</v-btn>
        </v-flex>

      </v-layout>
    </v-container>

    <v-footer>
      <app-footer/>
    </v-footer>
  </v-app>
</template>

<script>
import { rootURL, seekerHomeRoute, employerHomeRoute } from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    userId: null,
    email: "",
    createPassword: "",
    confirmPassword: "",
    role: "seeker",

    //configuration variable
    valid: true,
    en: true, //show hide password
    err: false,
    hint: "",
    progress: false,
    showError: false,
    errorMsg: "",
    disableBtn: false,
    seekerHomeRoute: seekerHomeRoute,
    employerHomeRoute: employerHomeRoute,

    //fileds rules
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 25) || "Password must be less than 25 characters",
      v => (v && v.length >= 6) || "Password must be at least 6 characters",
      v =>
        /^(\w*|!|@|#|\$|%|\^|&|\*|-|\+|=)*([a-zA-Z0-9])+(\w*|!|@|#|\$|%|\^|&|\*|-|\+|=)*$/.test(
          v
        ) || "Only !,@,#,$,%,^,&,*,-,+,= special characters are allowed",
      v =>
        /^(\w*|!|@|#|\$|%|\^|&|\*|-|\+|=)*([A-Z])+(\w*|!|@|#|\$|%|\^|&|\*|-|\+|=)*$/.test(
          v
        ) || "Password must contain at least one uppercase character",
      v =>
        /^(\w*|!|@|#|\$|%|\^|&|\*|-|\+|=)*([a-z])+(\w*|!|@|#|\$|%|\^|&|\*|-|\+|=)*$/.test(
          v
        ) || "Password must contain at least one lowercase character",
      v =>
        /^(\w*|!|@|#|\$|%|\^|&|\*|-|\+|=)*([0-9])+(\w*|!|@|#|\$|%|\^|&|\*|-|\+|=)*$/.test(
          v
        ) || "Password must contain at least one number"
    ],
    confirmPasswordRules: [
      v => {
        return !!v || "Password is required";
      }
    ]
  }),
  beforeCreate: function() {
    if (!cookie.isSet("authUser")) {
      this.$router.push("/NotFound");
    }
  },
  created: function() {
    if (cookie.isSet("authUser")) {
      let user = cookie.get("authUser");
      this.email = user.email;
      this.userId = user.id;
    }
  },
  methods: {
    cancel() {
      cookie.remove("authUser");
      this.$router.push("/");
    },
    focusNext() {
      this.$nextTick(() => this.$refs.cpass.focus());
    },
    submit() {
      if (this.$refs.form.validate()) {
        if (this.createPassword != this.confirmPassword) {
          this.hint = "Passwords does not match";
          this.err = true;
        } else {
          this.hint = "";
          this.err = false;
          this.setupPassword();
        }
      } else {
        if (this.createPassword != this.confirmPassword) {
          this.hint = "Passwords does not match";
          this.err = true;
        }
        console.log("Password is not valid.");
      }
    },
    setupPassword() {
      this.showError = false;
      this.disableBtn = true;
      this.progress = true;
      this.$http
        .post(rootURL + "/users/userSignUp", {
          userId: this.userId,
          userEmail: this.email,
          userPassword: this.createPassword,
          userRole: this.role
        })
        .then(function(response) {
          cookie.remove("authUser"); //remove temporary user cookie

          let user = response.body;

          let userCookie = { auth: user };
          cookie.set("user", userCookie);

          if (cookie.isSet("user")) {
            //2 step check is cookie stored
            let user = cookie.get("user");
            let userRole = user.auth.role;
            if (userRole === "seeker") {
              this.$router.push(this.seekerHomeRoute); //move to job seeker home page
            } else if (userRole === "employer") {
              this.$router.push(this.employerHomeRoute); // move to empolyer home page
            } else {
              console.log("Unauthorized user content. Please login manually.");
              this.errorMsg =
                "Unauthorized user content. Please login manually.";
              this.showSuccess = false;
              this.showError = true;
              this.progress = false;
            }
          } else {
            console.log("Please enable cookie in your browser.");
            this.errorMsg = "Please enable cookie in your browser.";
            this.showError = true;
          }
        })
        .catch(function(error) {
          console.log("Error: ", error);
          console.log("Error code: ", error.status);
          this.errorMsg = httpError.getErrorMessage(error);
          this.progress = false;
          this.disableBtn = false;
          this.showError = true;
        });
    }
  }
};
</script>

<style scoped src="./style.css"></style>
