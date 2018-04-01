<template>
<v-container grid-list-md text-xs-center class="pa-0 mt-2">
  
  <v-card class="elevation-24 pl-3 pr-3 py-2 searchBar">
    <v-layout row wrap>
      <v-flex xs10 sm11 my-2>
        <v-text-field
          light solo clearable
          prepend-icon="search"
          placeholder="Search"
          ref='search'
          autofocus
          v-model.trim="searchText"
          :rules="rule"
          @keypress.enter="search('all')"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs2 sm1>
        <v-btn flat icon v-on:click="search()">
          <v-icon>search</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card>

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

  <app-bottom-sheet-per :showThis.sync="popBottomSheet">
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
          v-on:click="refresh()">
          <v-icon>cached</v-icon>
        </v-btn>
        <v-btn flat icon class="i-dark"
          v-on:click="cancelSearch()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
    </app-alert>
  </app-bottom-sheet-per>
  
</v-container>
</template>

<script>
import { rootURL, seekerHomeRoute } from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    //configuration variable
    refreshBtn: true,
    showBottomSheet: false,
    popBottomSheet: false,
    bottomSheetText: "Seaching...",
    bottomSheetColor: "c-blue",
    rootLocation: seekerHomeRoute,
    timer: 3500,

    //user identity
    userId: null,
    userEmail: null,

    searchText: "",
    jobs: [],

    rule: [
      v => /^(\w*[\- ]*\w*)*$/.test(v) || "Input must be valid",
      v => (v && v.length <= 25) || "Input must be less than 25 characters"
    ]
  }),
  created: function() {
    if (cookie.isSet("user")) {
      let user = cookie.get("user");
      this.userId = user.auth.id;
      this.userEmail = user.auth.email;
    } else {
      this.$router.push("/NotFound");
      return;
    }
  },
  watch: {
    searchText: function() {
      if (this.searchText === null) {
        this.searchText = "";
      }
    }
  },
  methods: {
    search() {
      if (this.searchText === "") {
        this.popWarn("Please enter what do you want to search.");
      } else if (this.searchText.length > 25) {
        this.popWarn(
          "Please search simply. Input must be less than 25 characters."
        );
      } else if (!this.isValidText(this.searchText)) {
        this.popWarn("Please don't use special characters for search.");
      } else {
        this.bottomSheetColor = "c-blue";
        this.bottomSheetText = "Seaching...";
        this.popBottomSheet = true;
        this.refreshBtn = true;

        let searchArray = this.searchText.split(" ");
        let data = [];
        searchArray.forEach((item, index) => {
          if (item != "") {
            data.push(item);
          }
        });
        let str = data.join("|");
        this.sendRequest(this.userId, this.userEmail, str);
        this.jobs = [];
      }
    },
    popWarn(str) {
      this.bottomSheetColor = "c-yellow";
      this.bottomSheetText = str;
      this.showBottomSheet = true;
      this.$nextTick(() => this.$refs.search.focus());
      setTimeout(() => (this.showBottomSheet = false), this.timer);
    },
    isValidText(str) {
      let exp = /[`|~|!|@|#|\$|%|^|&|\*|\(|\)|_|\+|=|{|}|\[|\]|:|\"|;|'|,|.|<|>|?|/|\\]/;
      if (str.match(exp)) {
        return false;
      }
      return true;
    },
    cancelSearch() {
      this.popBottomSheet = false;
      this.$nextTick(() => this.$refs.search.focus());
    },
    refresh() {
      this.search();
    },
    sendRequest(userId, userEmail, data) {
      return new Promise((resolve, reject) => {
        this.$http
          .post(rootURL + "/seekers/searchJobs", {
            userId: userId,
            userEmail: userEmail,
            data: data
          })
          .then(function(response) {
            let responseJobs = response.body;

            if (responseJobs.length === 0) {
              this.refreshBtn = false;
              this.bottomSheetColor = "c-yellow";
              this.bottomSheetText =
                "No suggestions found. Please try another text.";
            } else {
              //results found for text
              let jobArray = responseJobs[0];
              let companyArray = responseJobs[1];

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
              this.popBottomSheet = false;
            }
            resolve();
          })
          .catch(function(error) {
            console.log("Error: ", error);
            console.log("Error code: ", error.status);

            this.bottomSheetText = httpError.getErrorMessage(error);
            this.bottomSheetColor = "c-red";
            this.refreshBtn = false;
            reject(error);
          });
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

