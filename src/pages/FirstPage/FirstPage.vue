<template>
  <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      
      <v-toolbar-title class="hidden-xs-only ml-4">Best Fit Job</v-toolbar-title>
      <v-spacer class="hidden-xs-only"></v-spacer>
      <v-text-field
        light solo clearable
        prepend-icon="search"
        placeholder="Search"
        ref='search'
        class="search-bar"
        v-model.trim="searchText"
        :rules="rule"
        @keypress.enter="search()"
      ></v-text-field>

        <v-spacer class="hidden-sm-and-up"></v-spacer>
        <v-menu bottom left class="mr-1">
            <v-btn icon slot="activator" dark>
              <v-icon>more_vert</v-icon>
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
    </v-toolbar>

    <v-content>
      <section>
        <v-parallax src="/static/img/top.jpg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="/static/favicon.png" alt="BFJ" height="200">
            <h1 class="white--text my-5 display-1 text-xs-center">Best Fit Job</h1>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way to search your job</h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">card_travel</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Job Market</div>
                    </v-card-title>
                    <v-card-text v-text="dummyText">
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">face</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Job Seekers vs Employers</div>
                    </v-card-title>
                    <v-card-text v-text="dummyText">
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">language</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Completely Open Sourced</div>
                    </v-card-title>
                    <v-card-text v-text="dummyText">
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="/static/img/bottom.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">The best way to search your job</div>
            <em>Get started today</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/#/Register"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text v-text="dummyText">
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Feel free to contact us
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Mobile No</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Sri Lanka</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>email@gmail.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <v-container>
        <router-view/>
      </v-container>
      
      <!-- Search results -->
      <app-dialog-full 
        :showThis.sync="showDialog" 
        title="Search results"
        v-show="showDialog"
      >
        <div slot="toolbar">
        <v-text-field
          light solo clearable
          prepend-icon="search"
          placeholder="Search"
          ref='search'
          autofocus
          v-model.trim="searchText"
          :rules="rule"
          @keypress.enter="search()"
        ></v-text-field>
        </div>

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

        <!-- Bottom sheet -->
        <app-bottom-sheet :showThis.sync="showBottomSheet">
          <v-progress-linear 
            height="4" 
            :indeterminate="true" 
            class="my-0"
            v-if="loading"
          ></v-progress-linear>
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

      </app-dialog-full>
    </v-content>

    <v-footer>
      <app-footer/>
    </v-footer>
  </v-app>
</template>

<script>
import { rootURL } from "../../data/data";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    loading: false,
    showDialog: false,
    showBottomSheet: false,
    bottomSheetText: "Seaching...",
    bottomSheetColor: "c-blue",
    timer: 3500,

    searchText: "",
    jobs: [],

    rule: [
      v => /^(\w*[\- ]*\w*)*$/.test(v) || "Input must be valid",
      v => (v && v.length <= 25) || "Input must be less than 25 characters"
    ],

    //lists
    menuItems: [
      { title: "Features", icon: "featured_play_list", method: "features" },
      { title: "Marketplace", icon: "card_travel", method: "marketPlace" },
      { title: "Sign in", icon: "face", method: "login" },
      { title: "Sign up", icon: "account_circle", method: "register" }
    ],

    // lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    dummyText: `This project makes a platform for job seekers to find jobs and employers to offer jobs easily. In order to fulfil this task, this system has portals for job seekers and people who offer jobs. Job seekers are able to add their knowledge, skills, attitudes and other extra attributes to their account. On the other hand, employers can add their job opportunities with expected skills. The output of this system is matching job opportunities with job seekers profiles and sending notifications to both parties.`
  }),
  methods: {
    login: function() {
      this.$router.push("/Login");
    },
    register: function() {
      this.$router.push("/Register");
    },
    marketPlace: function() {
      console.log("marketPlace");
    },
    features: function() {
      console.log("features");
    },
    menuItemClick(method) {
      switch (method) {
        case "login":
          this.login();
          break;
        case "register":
          this.register();
          break;
        case "marketPlace":
          this.marketPlace();
          break;
        default:
          console.log(method);
      }
    },
    search() {
      if (this.searchText === "" || this.searchText === null) {
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
        this.loading = true;
        this.showDialog = true;
        this.showBottomSheet = true;

        let searchArray = this.searchText.split(" ");
        let data = [];
        searchArray.forEach((item, index) => {
          if (item != "") {
            data.push(item);
          }
        });
        let str = data.join("|");
        this.sendRequest(str);
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
    sendRequest(data) {
      return new Promise((resolve, reject) => {
        this.$http
          .post(rootURL + "/users/searchJobs", {
            data: data
          })
          .then(function(response) {
            let responseJobs = response.body;

            if (responseJobs.length === 0) {
              this.loading = false;
              this.bottomSheetColor = "c-yellow";
              this.bottomSheetText =
                "No suggestions found. Please try another text.";
              this.showBottomSheet = true;
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

              console.log(this.jobs);

              this.loading = false;
              this.bottomSheetColor = "c-green";
              this.bottomSheetText = "Search completed successfully...";
              this.showBottomSheet = false;
            }
            resolve();
          })
          .catch(function(error) {
            console.log("Error: ", error);
            console.log("Error code: ", error.status);

            this.bottomSheetText = httpError.getErrorMessage(error);
            this.bottomSheetColor = "c-red";
            this.loading = false;
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
