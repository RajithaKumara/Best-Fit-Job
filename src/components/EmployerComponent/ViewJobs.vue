<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 mb-3>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(job,i) in jobs" :key="i">
            <div slot="header">
              <h3 class="subheading">{{job.jobTitle}}</h3>
              <p class="caption">{{validator.getTimestamp(job._id)}}</p>
            </div>
            <v-card>
              <v-card-text>
              <v-layout row wrap mx-2>

                <v-flex xs12>
                  <v-text-field 
                    box dark multi-line 
                    label="Job description" 
                    v-model="job.jobDescription"
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field 
                    box dark 
                    label="Reference URL" 
                    v-model="job.url"
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <div class="input-group--text-field-box theme--dark input-group--text-field">
                    <v-select
                      label="Specialties Tags"
                      :items="skillTags"
                      v-model="job.tags"
                      item-text="text"
                      item-value="value"
                      multiple
                      chips
                      autocomplete
                      readonly
                    >
                      <template slot="selection" slot-scope="data">
                        <v-chip
                          close
                          @input="data.parent.selectItem(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                          :key="JSON.stringify(data.item)"
                        >
                          {{ data.item.text }}
                        </v-chip>
                      </template>
                    </v-select>
                  </div>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-text-field 
                    box dark 
                    label="Salary (Approximately)" 
                    v-model="job.salary"
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-text-field 
                    box dark 
                    label="Number of job opportunities" 
                    v-model="job.offers"
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 pl-5>
                  <v-radio-group v-model="job.online" row>
                    <v-radio 
                      label="Online" 
                      :value="true"
                    ></v-radio>
                    <v-radio 
                      label="Not Online" 
                      :value="false"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex xs12 sm6>
                  <div class="pl-4">
                    <v-switch 
                      label="Enable" 
                      v-model="job.enable"
                      readonly
                    ></v-switch>
                  </div>
                </v-flex>

                <v-flex xs12 sm6>
                  <div class="pl-4">
                    <v-switch 
                      label="Privacy" 
                      v-model="job.privacy"
                      readonly
                    ></v-switch>
                  </div>
                </v-flex>
              </v-layout>

              <v-card-title>
                Contact details
              </v-card-title>

              <v-layout row wrap v-for="(contact,index) in job.contacts" :key="index">
                <v-flex xs12  class="pa-0" v-if="index > 0">
                  <hr color="#1976d2"/>
                </v-flex>
                <v-flex xs12 sm6>
                  <div class="input-group--text-field-box theme--dark input-group--text-field">
                  <v-select
                    label="Contact type"
                    :items="contactItems"
                    v-model="job.contacts[index].type"
                    autocomplete
                    readonly
                  ></v-select>
                  </div>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-text-field 
                    box dark 
                    label="Contact detail" 
                    v-model="job.contacts[index].detail"
                    readonly
                  ></v-text-field>
                </v-flex>

              </v-layout>
              
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>

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
  employerHomeRoute,
  contactItems,
  skillTags,
  companySizeList,
  companyTypeList
} from "../../data/data";
import { cookie } from "../../models/cookie";
import { validator } from "../../models/validator";
import { httpError } from "../../models/errorHandler";

export default {
  props: {
    refresh: String
  },
  data: () => ({
    //configuration variable
    popBottomSheet: false,
    refreshBtn: true,
    bottomSheetText: "Fetching jobs...",
    bottomSheetColor: "c-blue",
    rootLocation: employerHomeRoute,
    timer: 3500,
    fetched: false,
    validator: validator,

    //user identity
    userId: null,
    userEmail: null,

    jobs: [],

    //lists
    skillTags: skillTags,
    contactItems: contactItems
  }),
  created: function() {
    if (cookie.isSet("user")) {
      let user = cookie.get("user");
      this.userId = user.auth.id;
      this.userEmail = user.auth.email;
      this.popBottomSheet = true;
      this.fetchJobs(this.userId, this.userEmail);
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
      if (this.refresh === this.rootLocation + "ViewJobs") {
        this.fetched = false;
        this.refreshBtn = true;
        this.bottomSheetColor = "c-blue";
        this.bottomSheetText = "Fetching jobs...";
        this.popBottomSheet = true;
        this.fetchJobs(this.userId, this.userEmail);
      }
    },
    routeChanges() {
      if (
        this.$route.path === this.rootLocation + "ViewJobs" &&
        !this.fetched
      ) {
        this.refreshBtn = true;
        this.bottomSheetColor = "c-blue";
        this.bottomSheetText = "Fetching jobs...";
        this.popBottomSheet = true;
        this.fetchJobs(this.userId, this.userEmail);
      }
    },
    cancelFetch() {
      if (this.bottomSheetColor === "c-green") {
        this.popBottomSheet = false;
        return;
      }
      this.popBottomSheet = false;
      this.$router.push(this.rootLocation);
    },
    refreshFetch() {
      if (this.bottomSheetColor != "c-green") {
        this.bottomSheetText = "Retrying...";
        this.bottomSheetColor = "c-blue";
        this.refreshBtn = true;
        this.fetchJobs(this.userId, this.userEmail);
      }
    },
    fetchJobs(userId, userEmail) {
      this.$http
        .post(rootURL + "/employers/fetchJobs", {
          userId: userId,
          userEmail: userEmail
        })
        .then(function(response) {
          if (this.$route.path === this.rootLocation + "ViewJobs") {
            this.jobs = response.body;

            this.bottomSheetColor = "c-green";
            this.bottomSheetText = "Jobs loaded successfully...";
            this.popBottomSheet = true;
            this.refreshBtn = false;
            this.fetched = true;
            setTimeout(() => (this.popBottomSheet = false), this.timer);
          }
        })
        .catch(function(error) {
          console.log("Error: ", error);
          console.log("Error code: ", error.status);
          this.bottomSheetText = httpError.getErrorMessage(error);
          this.refreshBtn = false;
          this.bottomSheetColor = "c-red";
        });
    }
  }
};
</script>

<style scoped src="./style.css"></style>

