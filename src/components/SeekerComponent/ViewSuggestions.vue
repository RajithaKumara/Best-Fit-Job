<template>
<v-container grid-list-md text-xs-center class="pa-0 mt-2">

  <app-job-card 
    v-for="(job,i) in jobs" 
    :key="i"
    :id="job._id"
    :title="job.jobTitle"
    :description="job.jobDescription"
    :url="job.url"
    :tags="job.tags"
    :salary="job.salary"
    :offers="job.offers"
    :online="job.online"
    :contacts="job.contacts"
    :company="job.company"
  ></app-job-card>

  <app-bottom-sheet :showThis.sync="showBottomSheet">
      <app-alert :type="bottomSheetColor">
        <v-flex xs8 sm8 slot="message">
          {{bottomSheetText}}
        </v-flex>
        <v-flex xs2 sm2 slot="action">
          <v-btn flat icon class="i-dark"
            v-on:click="showBottomSheet = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-flex>
      </app-alert>
  </app-bottom-sheet>

  <app-bottom-sheet-pop :showThis.sync="popBottomSheet">
    <v-progress-linear 
      height="4" 
      :indeterminate="true" 
      class="my-0"
      v-if="refreshBtn"
    ></v-progress-linear>

    <app-alert :type="bottomSheetColor">
      <v-flex xs7 sm7 slot="message">
        {{bottomSheetText}}
      </v-flex>

      <v-flex xs3 sm3 slot="action">
        <v-btn flat icon class="i-dark"
          :disabled="refreshBtn"
          v-on:click="refreshFetch()">
          <v-icon>cached</v-icon>
        </v-btn>
        <v-btn flat icon class="i-dark"
          v-on:click="cancelFetch()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
    </app-alert>
  </app-bottom-sheet-pop>
  
</v-container>
</template>

<script>
import {
  rootURL,
  seekerHomeRoute,
  genderList,
  countryList,
  contactItems,
  skillTags
} from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  props: {
    refresh: String
  },
  data: () => ({
    //configuration variable
    refreshBtn: true,
    showBottomSheet: false,
    popBottomSheet: false,
    bottomSheetText: "Retrive suggestions...",
    bottomSheetColor: "c-blue",
    rootLocation: seekerHomeRoute,
    timer: 3500,

    //user identity
    userId: null,
    userToken: null,
    userEmail: null,
    category: null,

    jobs: []
  }),
  created: function() {
    if (cookie.isSet("user")) {
      let user = cookie.get("user");
      this.userToken = cookie.get("token");
      this.userId = user.auth.id;
      this.userEmail = user.auth.email;
      this.popBottomSheet = true;

      let query = this.$route.query;
      this.category = query.category;
      if (this.category === undefined) {
        this.fetchJobSuggestions(this.userId, this.userEmail, null);
      } else {
        this.fetchJobSuggestions(this.userId, this.userEmail, this.category);
      }
    } else {
      this.$router.push("/NotFound");
      return;
    }
  },
  watch: {
    $route: "routeChanges",
    refresh: "refreshThis"
  },
  methods: {
    refreshThis() {
      if (this.refresh === this.rootLocation + "ViewSuggestions") {
        this.jobs = [];
        this.refreshBtn = true;
        this.bottomSheetText = "Retrive suggestions...";
        this.bottomSheetColor = "c-blue";
        this.popBottomSheet = true;
        if (this.category === undefined) this.category = null;
        this.fetchJobSuggestions(this.userId, this.userEmail, this.category);
      }
    },
    routeChanges() {
      if (this.$route.path === this.rootLocation + "ViewSuggestions") {
        let query = this.$route.query;
        if (this.category != query.category) {
          this.category = query.category;
          this.jobs = [];
          this.refreshBtn = true;
          this.bottomSheetText = "Retrive suggestions...";
          this.bottomSheetColor = "c-blue";
          this.popBottomSheet = true;
          if (this.category === undefined) this.category = null;
          this.fetchJobSuggestions(this.userId, this.userEmail, this.category);
        }
      }
    },
    cancelFetch() {
      if (this.bottomSheetColor === "c-green") {
        this.popBottomSheet = false;
        return;
      }
      this.popBottomSheet = false;
      this.$router.go(-1);
    },
    refreshFetch() {
      if (this.bottomSheetColor != "c-green") {
        this.refreshBtn = true;
        this.bottomSheetText = "Retrying...";
        this.bottomSheetColor = "c-blue";
        this.fetchJobSuggestions(this.userId, this.userEmail, this.category);
      }
    },
    fetchJobSuggestions(userId, userEmail, category) {
      this.$http
        .post(rootURL + "/seekers/getSuggestions", {
          userId: userId,
          userEmail: userEmail,
          userToken: this.userToken,
          category: category
        })
        .then(function(response) {
          let responseJobs = response.body;

          if (responseJobs.jobs === undefined) {
            this.refreshBtn = false;
            this.bottomSheetColor = "c-yellow";
            this.bottomSheetText = "No suggestions found.";
          } else {
            //suggestions fetch successfully
            let jobArray = responseJobs.jobs;
            let companyArray = responseJobs.companies;

            this.jobs = [];
            jobArray.forEach((job, index) => {
              let companyId = job.id.toString();
              for (let i = 0; i < companyArray.length; i++) {
                let id = companyArray[i]._id.toString();
                if (companyId === id) {
                  this.jobs.push(this.mergeJSON(job, companyArray[i]));
                  break;
                }
              }
            });

            this.refreshBtn = false;
            this.bottomSheetColor = "c-green";
            this.bottomSheetText = "Search completed successfully...";
            setTimeout(() => (this.popBottomSheet = false), 500);
          }
        })
        .catch(function(error) {
          console.log("Error: ", error);
          console.log("Error code: ", error.status);

          this.bottomSheetText = httpError.getErrorMessage(error);
          this.bottomSheetColor = "c-red";
          this.refreshBtn = false;
        });
    },
    mergeJSON(obj1, obj2) {
      let str1 = JSON.stringify(obj1);
      let str2 = JSON.stringify(obj2);
      str1 = str1.substring(0, str1.length - 1);
      return JSON.parse(str1 + ',"company":' + str2 + "}");
    }
  }
};
</script>

<style scoped src="./style.css"></style>

