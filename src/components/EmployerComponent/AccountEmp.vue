<template>
  <v-container grid-list-md text-xs-center class="pa-0">
    <v-card class="px-2 pt-3">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <v-avatar
                :tile="false"
                :size="avatarSize"
                class="grey lighten-4"
              >
                <img src="/static/favicon.png" alt="avatar">
              </v-avatar>
            </v-flex>
            
            <v-flex xs12>
              <v-text-field 
                box dark 
                :readonly="!allowChange"
                label="Name" 
                v-model="userName"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                box dark
                :readonly="!allowChange"
                label="Email address"
                v-model="userEmail"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                box dark
                v-if="showChangePassword"
                label="Current Passwod"
                v-model="currentPassword"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                box dark
                v-if="showChangePassword"
                label="New Password"
                v-model="newPassword"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                box dark
                v-if="showChangePassword"
                label="Retype New Password"
                v-model="retypePassword"
                required
              ></v-text-field>
            </v-flex>

            <v-flex  xs12>
              <v-btn 
                v-on:click="updateProfile()" 
                color="primary"
              >Update profile</v-btn>
              <v-btn 
                v-on:click="changePassword()" 
                color="primary"
              >Change Password</v-btn>
              <v-btn 
                v-if="showCancel"
                v-on:click="cancel()" 
                flat
              >Cancel</v-btn>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>
  </v-container>
</template>

<script>
import { rootURL } from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    userName: "",
    userEmail: "",
    userId: null,
    currentPassword: null,
    newPassword: null,
    retypePassword: null,

    //configuration variables
    allowChange: false,
    avSize: 200,
    showCancel: false,
    showChangePassword: false
  }),
  computed: {
    avatarSize() {
      return `${this.avSize}px`;
    }
  },
  created: function() {
    if (cookie.isSet("user")) {
      let user = cookie.get("user");
      this.userName = user.auth.name;
      this.userId = user.auth.id;
      this.userEmail = user.auth.email;
    } else {
      this.$router.push("/NotFound"); //there is no user logging instance
    }
  },
  beforeDestroy: function() {
    this.allowChange = false;
    this.showCancel = false;
    this.showChangePassword = false;
  },
  methods: {
    updateProfile() {
      this.allowChange = true;
      this.showCancel = true;
    },
    changePassword() {
      this.showChangePassword = true;
      this.showCancel = true;
    },
    cancel() {
      this.allowChange = false;
      this.showCancel = false;
      this.showChangePassword = false;
    }
  }
};
</script>

<style scoped src="./style.css"></style>

