<template>
<v-container fluid fill-height fill-width>
  <v-dialog v-model="dialogRegister" persistent max-width="500px" min-width="400px"> 
    <v-card class="elevation-24">
      <v-toolbar dark color="primary">
        <v-toolbar-title>SignUp</v-toolbar-title>
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
            prepend-icon="person" 
            name="r_name" 
            label="Name" 
            type="text" 
            ref="name"
            v-model="userName"
            :rules="nameRules"
            @keypress.enter="focusEmail()"
            autofocus
            required
          ></v-text-field>
          <v-text-field 
            prepend-icon="email" 
            name="r_email" 
            label="Email" 
            type="text" 
            ref="email"
            v-model="userEmail"
            :rules="emailRules"
            @keypress.enter="submit()"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="disableBtn || !valid" v-on:click="submit()" color="primary">SignUp</v-btn>
        <v-btn :disabled="disableBtn" v-on:click="cancel()" color="primary">Cancel</v-btn>
      </v-card-actions>
      <v-progress-linear :indeterminate="true" v-show="progress" class="my-0"></v-progress-linear>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script>
import { rootURL } from "../../data/data";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    userName: "",
    userEmail: "",

    //configuration variable
    dialogRegister: true,
    disableBtn: false,
    progress: false,
    showSuccess: false,
    showError: false,
    successMsg: "",
    errorMsg: "",
    valid: true,

    //fileds rules
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 25) || "Name must be less than 25 characters",
      v => (v && v.length >= 2) || "Name must be greater than 2 characters",
      v => /^[a-zA-Z]+([ ]?[a-zA-Z]+)*$/.test(v) || "Name must be valid"
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
    this.$nextTick(() => this.$refs.name.focus());
  },
  methods: {
    submit() {
      this.showSuccess = false;
      this.showError = false;
      if (this.$refs.form.validate()) {
        this.register();
      } else {
        console.log("Name or Email is not valid.");
      }
    },
    register() {
      this.disableBtn = true;
      this.progress = true;
      this.$http
        .post(rootURL + "/users/register", {
          userName: this.userName,
          userEmail: this.userEmail
        })
        .then(function(response) {
          this.successMsg =
            "Please check your email and verifiy email address.";
          this.showSuccess = true;
          this.progress = false;
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
      this.dialogRegister = false;
      this.$router.push("/");
      this.$destroy(); //self destroy this component
    },
    focusEmail() {
      this.$nextTick(() => this.$refs.email.focus());
    }
  }
};
</script>

<style scoped>
.card {
  overflow-x: hidden;
}
</style>
