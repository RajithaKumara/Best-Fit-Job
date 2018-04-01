<template>
<v-container fluid fill-height fill-width>
  <v-dialog v-model="dialogLogin" persistent max-width="500px" min-width="400px"> 
    <v-card class="elevation-24">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn
            icon
            large
            v-on:click="cancel()"
            slot="activator"
          >
            <v-icon large>close</v-icon>
          </v-btn>
          <span>Close window</span>
        </v-tooltip>
      </v-toolbar>
      
      <v-card-text>
        <div class="pb-2" v-if="showSuccess">
          <v-alert outline color="success" icon="check_circle" :value="showSuccess">
            {{successMsg}}
          </v-alert>
        </div>
        <div class="pb-2" v-if="showError">
          <v-alert outline color="error" icon="warning" :value="showError">
            {{errorMsg}}
          </v-alert>
        </div>

        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field 
            prepend-icon="email" 
            name="login_name" 
            label="Email" 
            ref='email'
            type="text" 
            @keypress.enter="focusPassword()"
            v-model="userEmail"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field 
            prepend-icon="lock" 
            name="login_email" 
            label="Password" 
            ref='pass'
            v-model="userPassword"
            :rules="passwordRules"
            :append-icon="en ? 'visibility' : 'visibility_off'"
            :append-icon-cb="()=>(en=!en)"
            :type="en ? 'password' : 'text'"
            @keypress.enter="submit()"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="disableBtn || !valid" v-on:click="submit()" color="primary">Login</v-btn>
        <v-btn :disabled="disableBtn" v-on:click="cancel()" color="primary">Cancel</v-btn>
      </v-card-actions>
      <v-progress-linear :indeterminate="true" v-show="progress" class="my-0"></v-progress-linear>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script>
import { rootURL, seekerHomeRoute, employerHomeRoute } from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    userEmail: "",
    userPassword: "",

    //configuration variable
    dialogLogin: true,
    disableBtn: false,
    progress: false,
    showSuccess: false,
    showError: false,
    successMsg: "",
    errorMsg: "",
    valid: true,
    en: true, //show hide password
    seekerHomeRoute: seekerHomeRoute,
    employerHomeRoute: employerHomeRoute,

    //fileds rules
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 25) || "Password must be less than 25 characters"
    ],
    emailRules: [
      v => {
        return !!v || "E-mail is required";
      },
      v =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ]
  }),
  created: function() {
    let user = this.$route.query;
    if (user.email != undefined) {
      this.userEmail = user.email;
      this.$nextTick(() => this.$refs.pass.focus());
    } else {
      this.$nextTick(() => this.$refs.email.focus());
    }
  },
  methods: {
    submit() {
      this.showSuccess = false;
      this.showError = false;
      this.showSnackbar = false;
      if (this.$refs.form.validate()) {
        this.login();
      } else {
        console.log("Email or Password not valid.");
      }
    },
    login() {
      this.disableBtn = true;
      this.progress = true;
      this.$http
        .post(rootURL + "/users/login", {
          userPassword: this.userPassword,
          userEmail: this.userEmail
        })
        .then(function(response) {
          //login successfully
          this.successMsg = "Login successfully.";
          this.showSuccess = true;
          this.progress = false;

          let user = response.body;
          if (user.profile === undefined) {
            user = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              profile: 0
            };
          }

          let userCookie = { auth: user };
          cookie.set("user", userCookie);

          if (cookie.isSet("user")) {
            //2 step check is cookie stored
            let user = cookie.get("user");
            let userRole = user.auth.role;
            if (userRole == "seeker") {
              this.$router.push(this.seekerHomeRoute); //move to job seeker home page
            } else if (userRole == "employer") {
              this.$router.push(this.employerHomeRoute); // move to empolyer home page
            } else {
              console.log("Unauthorized user.");
              this.errorMsg = "Unauthorized user.";
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
    },
    cancel() {
      this.dialogLogin = false;
      this.$router.push("/");
    },
    focusPassword() {
      this.$nextTick(() => this.$refs.pass.focus());
    }
  }
};
</script>

<style scoped>
.card {
  overflow-x: hidden;
}
</style>

