<template>
<v-container class="pa-0">
  <v-card class="elevation-24 my-3 pa-4" color="cyan" dark>
    Company Owner Information
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-4">
    <v-container grid-list-md>
      <v-card-title>
        General information
      </v-card-title>

      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field 
            box dark 
            label="First Name" 
            v-model="firstName"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field 
            box dark 
            label="Last Name" 
            v-model="lastName"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <div class="input-group--text-field-box theme--dark input-group--text-field">
          <v-select
            label="Country"
            :items="countryList"
            v-model="country"
            autocomplete
            readonly
          ></v-select>
          </div>
        </v-flex>
        
        <v-flex xs12>
          <v-text-field 
            box dark 
            multi-line 
            label="About you"
            v-model="summary"
            readonly
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-4">
    <v-container grid-list-md>
      <v-card-title>
        Contact information
      </v-card-title>

      <v-layout row wrap v-for="(contact,index) in contacts" :key="index">
        <v-flex xs12  class="pa-0" v-if="index > 0">
          <hr color="#1976d2"/>
        </v-flex>
        <v-flex xs12 sm6>
          <div class="input-group--text-field-box theme--dark input-group--text-field">
          <v-select
            label="Contact type"
            :items="contactItems"
            v-model="contacts[index].type"
            autocomplete
            readonly
          ></v-select>
          </div>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field 
            box dark 
            label="Contact detail" 
            v-model="contacts[index].detail"
            readonly
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>

  <v-card class="elevation-24 mb-3 mt-5 pa-4"  color="cyan">
    Company Information
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-3">
    <v-container grid-list-md>
      <v-card-title>
        General information
      </v-card-title>

      <v-layout row wrap>
        
        <v-flex xs12>
          <v-text-field 
            box dark 
            label="Company Name" 
            v-model="companyName"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field 
            box dark 
            label="Website URL" 
            v-model="companyUrl"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field 
            box dark 
            label="Year founded" 
            v-model="date"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            box dark
            label="Company email address"
            v-model="companyEmail"
            readonly
          ></v-text-field>
        </v-flex>
        
        <v-flex xs12>
          <v-text-field 
            box dark 
            multi-line 
            label="About company"
            v-model="aboutCompany"
            readonly
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-3">
    <v-container grid-list-md>
      <v-card-title>
        More
      </v-card-title>

      <v-layout row wrap pl-5>
        <v-radio-group v-model="jobType" row>
          <v-radio 
            label="Online" 
            value="online" 
          ></v-radio>
          <v-radio 
            label="Not Online" 
            value="not-online"
          ></v-radio>
          <v-radio 
            label="Both" 
            value="both"
          ></v-radio>
        </v-radio-group>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <div class="input-group--text-field-box theme--dark input-group--text-field">
            <v-select
            :items="companySizeList"
            item-text="text"
            item-value="value"
            v-model="companySize"
            label="Company size"
            readonly
            ></v-select>
          </div>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <div class="input-group--text-field-box theme--dark input-group--text-field">
            <v-select
            :items="companyTypeList"
            item-text="text"
            item-value="value"
            v-model="companyType"
            label="Industry type"
            autocomplete
            readonly
            ></v-select>
          </div>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <div class="input-group--text-field-box theme--dark input-group--text-field">
            <v-select
              label="Specialties Tags"
              :items="skillTags"
              v-model="tags"
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
      </v-layout>
    </v-container>
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-3">
    <v-container grid-list-md>
      <v-card-title>
        Location
      </v-card-title>

      <v-layout row wrap>
        
        <v-flex xs12>
          <v-text-field 
            box dark 
            label="Building Name" 
            v-model="companyBuilding"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field 
            box dark 
            label="Exact Address" 
            v-model="companyAddress"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <div class="input-group--text-field-box theme--dark input-group--text-field">
          <v-select
            label="Headquarters"
            :items="countryList"
            v-model="companyCountry"
            autocomplete
            readonly
          ></v-select>
          </div>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-3">
    <v-container grid-list-md>
      <v-card-title>
        Public groups/ Hotlines
      </v-card-title>

      <v-layout row wrap v-for="(group,index) in groups" :key="index">
        <v-flex xs12  class="pa-0" v-if="index > 0">
          <hr color="#1976d2"/>
        </v-flex>
        
        <v-flex xs12 sm6>
          <div class="input-group--text-field-box theme--dark input-group--text-field">
          <v-select
            label="Contact type"
            :items="contactItems"
            v-model="groups[index].type"
            autocomplete
            readonly
          ></v-select>
          </div>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field 
            box dark 
            label="Contact detail" 
            v-model="groups[index].detail"
            readonly
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>


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
  genderList,
  countryList,
  contactItems,
  skillTags,
  companySizeList,
  companyTypeList
} from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  props: {
    refresh: String
  },
  data: () => ({
    //configuration variable
    popBottomSheet: false,
    refreshBtn: true,
    bottomSheetText: "Fetching profile data...",
    bottomSheetColor: "c-blue",
    rootLocation: employerHomeRoute,
    timer: 3500,
    fetched: false,

    //user identity
    userId: null,
    userToken: null,
    userEmail: null,

    //step 1 variables
    firstName: null,
    lastName: null,
    country: null,
    summary: null,
    contacts: [{ type: null, detail: null }],

    //step 2 variables
    companyName: null,
    companyUrl: null,
    date: null,
    companyEmail: null,
    aboutCompany: null,

    jobType: null,
    companySize: null,
    companyType: null,
    tags: [],

    companyBuilding: null,
    companyAddress: null,
    companyCountry: null,

    groups: [{ type: null, detail: null }],

    //list items
    contactItems: contactItems,
    countryList: countryList,
    skillTags: skillTags,
    companySizeList: companySizeList,
    companyTypeList: companyTypeList
  }),
  created: function() {
    if (cookie.isSet("user")) {
      let user = cookie.get("user");
      this.userToken = cookie.get("token");
      this.userId = user.auth.id;
      this.userEmail = user.auth.email;
      this.popBottomSheet = true;
      this.fetchProfile(this.userId, this.userEmail);
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
      if (this.refresh === this.rootLocation + "ViewProfile") {
        this.fetched = false;
        this.refreshBtn = true;
        this.bottomSheetColor = "c-blue";
        this.bottomSheetText = "Fetching profile data...";
        this.popBottomSheet = true;
        this.fetchProfile(this.userId, this.userEmail);
      }
    },
    routeChanges() {
      if (
        this.$route.path === this.rootLocation + "ViewProfile" &&
        !this.fetched
      ) {
        this.refreshBtn = true;
        this.bottomSheetColor = "c-blue";
        this.bottomSheetText = "Fetching profile data...";
        this.popBottomSheet = true;
        this.fetchProfile(this.userId, this.userEmail);
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
        this.fetchProfile(this.userId, this.userEmail);
      }
    },
    fetchProfile(userId, userEmail) {
      this.$http
        .post(rootURL + "/employers/fetchProfile", {
          userId: userId,
          userEmail: userEmail,
          userToken: this.userToken
        })
        .then(function(response) {
          if (this.$route.path === this.rootLocation + "ViewProfile") {
            let profile = response.body;

            this.firstName = profile.firstName;
            this.lastName = profile.lastName;
            this.country = profile.country;
            this.summary = profile.summary;
            this.contacts = profile.contacts;

            this.companyName = profile.companyName;
            this.companyUrl = profile.companyUrl;
            this.date = profile.date;
            this.companyEmail = profile.companyEmail;
            this.aboutCompany = profile.aboutCompany;
            this.jobType = profile.jobType;
            this.companySize = profile.companySize;
            this.companyType = profile.companyType;
            this.tags = profile.tags;
            this.companyBuilding = profile.companyBuilding;
            this.companyAddress = profile.companyAddress;
            this.companyCountry = profile.companyCountry;
            this.groups = profile.groups;

            this.bottomSheetColor = "c-green";
            this.bottomSheetText = "Your profile loaded successfully...";
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

