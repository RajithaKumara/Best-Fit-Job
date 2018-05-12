<template>
<v-container class="pa-0">
  <v-card color="dark lighten-1 px-2" class="mb-5">
    <v-card-title>
      General Information
    </v-card-title>
    <v-container grid-list-md>
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

        <v-flex xs12 sm6>
          <v-text-field 
            box dark 
            label="Date of birth" 
            v-model="date"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <div class="input-group--text-field-box theme--dark input-group--text-field">
          <v-select
            label="Gender"
            :items="genderItems"
            v-model="gender"
          ></v-select>
          </div>
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
            label="Current Position"
            v-model="currentPosition"
            readonly
          ></v-text-field>
        </v-flex>
        
        <v-flex xs12>
          <v-text-field 
            box dark 
            multi-line 
            label="Summary"
            v-model="summary"
            readonly
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-5">
    <v-card-title>
      Contact Information
    </v-card-title>
    <v-container grid-list-md>
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

  <v-card color="dark lighten-1 px-2" class="mb-5">
    <v-card-title>
      Experience
    </v-card-title>
    <v-container grid-list-md>
      <v-layout row wrap v-for="(experience,index) in experiences" :key="index">
        <v-flex xs12  class="pa-0" v-if="index > 0">
          <hr color="#1976d2"/>
        </v-flex>
        <v-flex xs12 sm6 class="pb-0">
          <v-text-field 
            box dark 
            label="Title" 
            v-model="experiences[index].title"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 class="pb-0">
          <v-text-field 
            box dark 
            label="Company" 
            v-model="experiences[index].company"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12  class="pt-0">
          <v-text-field 
            box dark
            multi-line 
            label="Description"
            v-model="experiences[index].description"
            readonly
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-5">
    <v-card-title>
      Education
    </v-card-title>
    <v-container grid-list-md>
      <v-layout row wrap v-for="(edu,index) in education" :key="index">
        <v-flex xs12  class="pa-0" v-if="index > 0">
          <hr color="#1976d2"/>
        </v-flex>
        <v-flex xs12 sm6 class="pb-0">
          <v-text-field 
            box dark 
            label="School" 
            v-model="education[index].school"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 class="pb-0">
          <v-text-field 
            box dark 
            label="Field of study" 
            v-model="education[index].field"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12  class="pt-0">
          <v-text-field 
            box dark
            multi-line 
            label="Description"
            v-model="education[index].description"
            readonly
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-5">
    <v-card-title>
      Skills & Knowledge
    </v-card-title>
    <v-container grid-list-md>
      <v-layout row wrap v-for="(item,index) in ksao" :key="index">
        <v-flex xs12  class="pa-0" v-if="index > 0">
          <hr color="#1976d2"/>
        </v-flex>
        <v-flex xs12 class="pb-0">
          <v-text-field 
            box dark 
            label="Skill" 
            v-model="ksao[index].name"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12  class="pt-0">
          <v-text-field 
            box dark
            multi-line 
            label="Description"
            v-model="ksao[index].description"
            readonly
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-5">
    <v-card-title>
      Extra activities
    </v-card-title>
    <v-container grid-list-md>
      <v-layout row wrap v-for="(item,index) in extra" :key="index">
        <v-flex xs12  class="pa-0" v-if="index > 0">
          <hr color="#1976d2"/>
        </v-flex>
        <v-flex xs12 class="pb-0">
          <v-text-field 
            box dark 
            label="Extra Activity" 
            v-model="extra[index].name"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12  class="pt-0">
          <v-text-field 
            box dark
            multi-line 
            label="Description"
            v-model="extra[index].description"
            readonly
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>

  <v-card color="dark lighten-1 px-2" class="mb-5">
    <v-card-title>
      Tags
    </v-card-title>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-select
            label="Skill Tags"
            :items="skillTags"
            v-model="tags"
            chips tags
            multiple multi-line
            readonly
          ></v-select>
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
    popBottomSheet: false,
    bottomSheetText: "Fetching profile data...",
    bottomSheetColor: "c-blue",
    refreshBtn: true,
    timer: 2500,
    rootLocation: seekerHomeRoute,
    fetched: false,

    //user identity
    userId: null,
    userToken: null,
    userEmail: null,

    firstName: null,
    lastName: null,
    date: null,
    gender: null,
    country: null,
    currentPosition: null,
    summary: null,
    contacts: [{ type: null, detail: null }],
    experiences: [{ title: null, company: null, description: null }],
    education: [{ school: null, field: null, description: null }],
    ksao: [{ name: null, description: null }],
    extra: [{ name: null, description: null }],
    tags: [],

    //list items
    genderItems: genderList,
    contactItems: contactItems,
    countryList: countryList,
    skillTags: skillTags
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
        .post(rootURL + "/seekers/fetchProfile", {
          userId: userId,
          userEmail: userEmail,
          userToken: this.userToken
        })
        .then(function(response) {
          if (this.$route.path === this.rootLocation + "ViewProfile") {
            let profile = response.body;
            let general = profile.general;
            this.firstName = general.firstName;
            this.lastName = general.lastName;
            this.date = general.dob;
            this.gender = general.gender;
            this.country = general.country;
            this.currentPosition = general.currentPosition;
            this.summary = general.summary;
            this.contacts = profile.contacts;
            this.experiences = profile.experience;
            this.education = profile.education;
            this.ksao = profile.ksao;
            this.extra = profile.extra;
            this.tags = profile.tags;

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
    },
    save(date) {
      //for date picker
      this.$refs.menu.save(date);
    }
  }
};
</script>

<style scoped src="./style.css"></style>

