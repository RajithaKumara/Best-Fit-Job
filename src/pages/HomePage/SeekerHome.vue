<template>
  <v-app id="inspire" dark>

    <!--Left Navigation bar -->
    <v-navigation-drawer clipped fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile v-on:click="createProfile()" class="mt-4">
          <v-list-tile-action>
            <v-icon>perm_identity</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Create Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

         <v-list-tile v-on:click="editProfile()">
          <v-list-tile-action>
            <v-icon>edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Edit Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="viewProfile()">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>View Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="addSkills()">
          <v-list-tile-action>
            <v-icon>add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add Skills</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="updateSkills()">
          <v-list-tile-action>
            <v-icon>assignment_returned</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Update Skills</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="viewSuggestions()">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>View Job Suggestions</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="searchJobs()">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Search Jobs</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="applyForJob()">
          <v-list-tile-action>
            <v-icon>card_travel</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Apply for a Job</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="makeResume()">
          <v-list-tile-action>
            <v-icon>class</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Make a Resume</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Top Toolbar -->
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">Best Fit Job</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <v-btn
          v-show="refreshBtn"
          icon
          class="mr-2"
          slot="activator"
          v-on:click="refreshActiveComp()"
        >
          <v-icon>refresh</v-icon>
        </v-btn>
        <span>Refresh page</span>
      </v-tooltip>

      <v-badge v-model="notificationShow" left overlap>
        <span slot="badge">{{notificationCount}}</span>
        <v-btn icon class="ma-0" dark v-on:click="notifications()">
          <v-icon>notifications</v-icon>
        </v-btn>
      </v-badge>

      <v-btn flat :ripple="false" small class="ma-0 btnName" dark v-on:click="account()">
        {{userName}}
      </v-btn>

      <v-menu bottom left>
        <v-btn class="ma-0" icon slot="activator" dark>
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in menuItems" :key="item.title" v-on:click="menuItemClick(item.method)">
              <div class="ma-1"></div>
              <v-icon>{{ item.icon }}</v-icon>
              <div class="ma-2"></div>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <div class="ma-2"></div>
          </v-list-tile>
        </v-list>
      </v-menu>

      <div class="ma-2"></div>
    </v-toolbar>

    <!-- Page content , router view -->
    <v-content>
      <v-progress-linear :indeterminate="true" v-show="progress" class="my-0"></v-progress-linear>
      <v-container fluid fill-height pa-3>
        <!-- Chiled complonent -->
        <!-- <v-slide-x-transition> -->
        <keep-alive>
          <router-view 
            @notificationSeen="seenNotifications()"
            :suggestCategories="suggestCategories"
            :refresh="refreshComp"
          ></router-view>
        </keep-alive>
        <!-- </v-slide-x-transition> -->
      </v-container>
    </v-content>

    <v-footer>
      <app-footer/>
    </v-footer>

  </v-app>
</template>

<script>
import { rootURL, seekerHomeRoute } from "../../data/data";
import { cookie } from "../../models/cookie";
//import { validator } from "../../models/validator";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    userName: "",
    userId: null,
    userToken: null,
    userEmail: null,
    userProfile: null,
    userRole: null,

    //configuration variable
    drawer: null,
    progress: false,
    rootLocation: seekerHomeRoute,
    notificationShow: false,
    notificationCount: 0,
    suggestCategories: [],
    refreshComp: "",
    refreshBtn: null,

    showBottomSheet: false,
    msgBottomSheet: "",

    //lists
    menuItems: [
      { title: "Account", icon: "perm_identity", method: "account" },
      { title: "Help", icon: "help_outline", method: "help" },
      { title: "Settings", icon: "settings", method: "settings" },
      { title: "Sign out", icon: "highlight_off", method: "signOut" }
    ]
  }),
  created: function() {
    if (cookie.isSet("user")) {
      let user = cookie.get("user");
      this.userToken = cookie.get("token");
      this.userName = user.auth.name;
      this.userId = user.auth.id;
      this.userEmail = user.auth.email;
      this.userProfile = user.auth.profile;
      this.userRole = user.auth.role;

      if (this.userRole != "seeker") {
        this.$router.push("/NotFound");
        return;
      }

      this.fetchJobSuggestSummary(this.userId, this.userEmail);

      if (this.userProfile != "complete") {
        this.notificationCount += 1;
      }
      this.routeChanges();
    } else {
      this.$router.push("/NotFound");
      return;
    }
  },
  watch: {
    notificationCount: function() {
      if (this.notificationCount > 0) {
        this.notificationShow = true;
      } else {
        this.notificationShow = false;
      }
    },
    $route: "routeChanges"
  },
  methods: {
    routeChanges() {
      if (
        this.$route.path === this.rootLocation + "EditProfile" ||
        this.$route.path === this.rootLocation + "ViewProfile" ||
        this.$route.path === this.rootLocation + "UpdateSkills" ||
        this.$route.path === this.rootLocation + "ViewSuggestions"
      ) {
        this.refreshBtn = true;
      } else {
        this.refreshBtn = false;
      }
    },

    //job seeker use cases
    createProfile() {
      this.$router.push(this.rootLocation + "CreateProfile");
    },
    editProfile() {
      this.$router.push(this.rootLocation + "EditProfile");
    },
    viewProfile() {
      this.$router.push(this.rootLocation + "ViewProfile");
    },
    addSkills() {
      this.$router.push(this.rootLocation + "AddSkills");
    },
    updateSkills() {
      this.$router.push(this.rootLocation + "UpdateSkills");
    },
    viewSuggestions() {
      this.$router.push(this.rootLocation + "ViewSuggestions");
    },
    searchJobs() {
      this.$router.push(this.rootLocation + "SearchJobs");
    },
    applyForJob() {
      this.$router.push(this.rootLocation + "ApplyForJob");
    },
    makeResume() {
      this.$router.push(this.rootLocation + "MakeResume");
    },

    //Menu button functions
    refreshActiveComp() {
      this.refreshComp = this.$route.path;
      this.$nextTick(() => {
        this.refreshComp = "";
      });
    },
    notifications() {
      this.$router.push(this.rootLocation + "Notification");
    },
    account() {
      this.$router.push(this.rootLocation + "Account");
    },
    help() {
      console.log("help");
    },
    settings() {
      console.log("settings");
    },
    signOut() {
      this.$http
        .post(rootURL + "/users/logout", {
          userId: this.userId,
          userEmail: this.userEmail,
          userToken: this.userToken
        })
        .then(function(response) {
          cookie.remove("user");
          cookie.remove("token");
          this.$router.push("/");
        })
        .catch(function(error) {
          console.log("Error: ", error);
          console.log("Error code: ", error.status);
        });
    },
    menuItemClick(method) {
      switch (method) {
        case "account":
          this.account();
          break;
        case "help":
          this.help();
          break;
        case "settings":
          this.settings();
          break;
        case "signOut":
          this.signOut();
          break;
        default:
          console.log(method);
          alert("Application Error.");
      }
    },

    //notifications
    fetchJobSuggestSummary(userId, userEmail) {
      this.$http
        .post(rootURL + "/seekers/getSuggestSummary", {
          userId: userId,
          userToken: this.userToken,
          userEmail: userEmail
        })
        .then(function(response) {
          let responseJobs = response.body;

          if (responseJobs.length != 0) {
            this.notificationCount += responseJobs.length;
            this.suggestCategories = responseJobs;

            let path = this.rootLocation + "Notification";
            let cPath = this.$router.history.current.path;
            if (cPath === path || cPath === this.rootLocation) {
              setTimeout(() => (this.notificationCount = 0), 3000);
            }
          }
        })
        .catch(function(error) {
          console.log("Error: ", error);
          console.log("Error code: ", error.status);
        });
    },
    seenNotifications() {
      setTimeout(() => (this.notificationCount = 0), 3000);
    }
  }
};
</script>

<style scoped src="./style.css"></style>