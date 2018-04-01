<template>
<v-container fill-height>
  <v-flex xs12 text-xs-center v-show="notificationEmpty">
    <h1 class="headline grey--text">No notifications to show.</h1>
  </v-flex>

  <v-layout>
    <v-flex xs12>
      <v-card class="mb-3" v-for="(notification,i) in notifications" :key="i">
        <v-card-title>
          <h3 class="subheading">{{notification.title}}</h3>
          <v-spacer/>
          <v-tooltip bottom>
            <v-btn
              icon
              class="ma-0"
              slot="activator"
              v-on:click="navigateTo(notification.navigate)"
            >
              <v-icon>launch</v-icon>
            </v-btn>
            <span>Navigate to</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          {{notification.content}}
        </v-card-text>
        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { rootURL, employerHomeRoute } from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  props: {
    suggestCategories: Array,
    refresh: String
  },
  data: () => ({
    allNotifications: [],
    rootLocation: employerHomeRoute,
    userProfile: null,
    notifications: [],
    notificationEmpty: false
  }),
  created: function() {
    if (cookie.isSet("user")) {
      let user = cookie.get("user");
      this.userProfile = user.auth.profile;
      this.getNotification();

      // if (this.userProfile != "complete" || this.userProfile == undefined) {
      //   //this.$router.push(this.rootLocation+"CreateProfile");
      //   console.log("user profile data not fetched");
      //   //this.fetchingUserProfile(userCookie);
      // } else {
      // }
    } else {
      this.$router.push("/NotFound");
      return;
    }
    this.$emit("notificationSeen");
  },
  watch: {
    refresh: "refreshThis",
    suggestCategories: "getNotification",
    notifications: function() {
      if (this.notifications.length === 0) {
        this.notificationEmpty = true;
      } else {
        this.notificationEmpty = false;
      }
    }
  },
  methods: {
    refreshThis() {
      if (this.refresh === this.rootLocation + "Notification") {
        this.getNotification();
      }
    },
    navigateTo(location) {
      this.$router.push(this.rootLocation + location);
    },
    getNotification() {
      let jobCategories = [];
      this.notifications = [];

      if (this.userProfile != "complete") {
        this.notifications.push({
          title: "About your profile",
          content:
            "Please visit 'Create Profile' page and complete all fields.",
          navigate: "CreateProfile"
        });
      }

      if (Array.isArray(this.suggestCategories)) {
        if (this.suggestCategories.length) {
          jobCategories = this.suggestCategories;
        }
      }

      jobCategories.forEach(item => {
        this.notifications.push({
          title: "Job suggestions",
          content:
            "Your profile match with '" +
            item +
            "' job category. Visit 'View Job Suggestions' page for more details.",
          navigate: "ViewSuggestions?category=" + item
        });
      });
    }
  }
};
</script>

<style scoped src="./style.css"></style>