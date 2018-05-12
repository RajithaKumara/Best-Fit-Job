<template>
<v-container class="pa-0">
  <v-stepper v-model="stepper" vertical>
    <v-stepper-step step="1" :complete="stepper > 1">
      Owner Information
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card color="dark lighten-1 px-2" class="mb-4">
        <v-container grid-list-md>
          <v-layout row wrap>
            
            <v-flex xs12 sm6>
              <v-text-field 
                box dark 
                label="First Name" 
                v-model="firstName"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field 
                box dark 
                label="Last Name" 
                v-model="lastName"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <div class="input-group--text-field-box theme--dark input-group--text-field">
              <v-select
                label="Country"
                :items="countryList"
                v-model="country"
                autocomplete
                required
              ></v-select>
              </div>
            </v-flex>
            
            <v-flex xs12>
              <v-text-field 
                box dark 
                multi-line 
                label="About you"
                v-model="summary"
              ></v-text-field>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>

      <v-card color="dark lighten-1 px-2" class="mb-4">
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
              ></v-select>
              </div>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field 
                box dark 
                label="Contact detail" 
                v-model="contacts[index].detail"
              ></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 class="text-xs-right">

              <v-tooltip left>
                <v-btn 
                  fab dark small 
                  color="primary" 
                  v-on:click="addContactField()"
                  slot="activator"
                ><v-icon dark>add</v-icon></v-btn>
                <span>Add Contact Field</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

      <v-btn
        color="primary"
        :loading="loading1"
        v-on:click="continueStep1()"
        :disabled="loading1"
      >Save & Continue</v-btn>
      <v-btn 
        flat
        v-on:click="cancel()"
        :disabled="loading1"
      >Cancel</v-btn>
    </v-stepper-content>


    <v-stepper-step step="2">
      Company Information
    </v-stepper-step>
    <v-stepper-content step="2">
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
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field 
                box dark 
                label="Website URL" 
                v-model="companyUrl"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
              >
                <v-text-field
                  box dark
                  slot="activator"
                  label="Year founded"
                  v-model="date"
                  readonly
                ></v-text-field>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  type="month"
                  @change="save"
                  min="1950-01-01"
                  :max="maxDob"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                box dark
                label="Company email address"
                v-model="companyEmail"
                required
              ></v-text-field>
            </v-flex>
            
            <v-flex xs12>
              <v-text-field 
                box dark 
                multi-line 
                label="About company"
                v-model="aboutCompany"
                required
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
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field 
                box dark 
                label="Exact Address" 
                v-model="companyAddress"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <div class="input-group--text-field-box theme--dark input-group--text-field">
              <v-select
                label="Headquarters"
                :items="countryList"
                v-model="companyCountry"
                autocomplete
                required
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
              ></v-select>
              </div>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field 
                box dark 
                label="Contact detail" 
                v-model="groups[index].detail"
              ></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 class="text-xs-right">

              <v-tooltip left>
                <v-btn 
                  fab dark small 
                  color="primary" 
                  v-on:click="addGroupField()"
                  slot="activator"
                ><v-icon dark>add</v-icon></v-btn>
                <span>Add Contact Field</span>
              </v-tooltip>
              <!-- <v-btn fab dark small color="primary" v-on:click="addContactField()">
                <v-icon dark>add</v-icon>
              </v-btn> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      
      <v-btn
        v-if="!homeBtn"
        color="primary"
        :loading="loading2"
        v-on:click="continueStep2()"
        :disabled="loading2"
      >Save & Finish</v-btn>
      <v-btn 
        color="primary"
        v-if="homeBtn"
        v-on:click="cancel()"
      >Go Home</v-btn>
    </v-stepper-content>

  </v-stepper>

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
  
</v-container>
</template>

<script>
import {
  rootURL,
  employerHomeRoute,
  countryList,
  contactItems,
  skillTags,
  companySizeList,
  companyTypeList
} from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    //configuration variable
    stepper: 1,
    loading1: false,
    loading2: false,
    homeBtn: false,
    menu: false,
    showBottomSheet: false,
    bottomSheetText: "Storing profile data...",
    bottomSheetColor: "c-blue",
    rootLocation: employerHomeRoute,
    timer: 3500,

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
  watch: {
    menu(val) {
      //date picker listener
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  created: function() {
    if (cookie.isSet("user")) {
      //get userID and user email from cookie
      let user = cookie.get("user");
      this.userToken = cookie.get("token");
      this.userId = user.auth.id;
      this.userEmail = user.auth.email;

      let step = user.auth.profile;
      if (step == "complete") {
        this.stepper = 2;
        this.homeBtn = true;
        this.bottomSheetColor = "c-blue";
        this.bottomSheetText = "Your profile already completed...";
        setTimeout(() => (this.showBottomSheet = true), 500);
      } else if (step == undefined || step == null || step == "") {
        this.stepper = 1;
      } else {
        setTimeout(() => (this.stepper = parseInt(step) + 1), 500);
        this.stepper = parseInt(step) + 1;
      }
    } else {
      this.$router.push("/NotFound");
      return;
    }
  },
  computed: {
    maxDob() {
      return new Date().toISOString().substr(0, 10);
    }
  },
  methods: {
    continueStep1() {
      this.loading1 = true;
      let owner = {
        firstName: this.firstName,
        lastName: this.lastName,
        country: this.country,
        summary: this.summary,
        contacts: this.contacts
      };
      this.sendRequest(1, "owner", this.userId, this.userEmail, owner);
    },
    continueStep2() {
      this.loading2 = true;
      let company = {
        companyName: this.companyName,
        companyUrl: this.companyUrl,
        date: this.date,
        companyEmail: this.companyEmail,
        aboutCompany: this.aboutCompany,
        jobType: this.jobType,
        companySize: this.companySize,
        companyType: this.companyType,
        tags: this.tags,
        companyBuilding: this.companyBuilding,
        companyAddress: this.companyAddress,
        companyCountry: this.companyCountry,
        groups: this.groups
      };
      this.sendRequest(2, "company", this.userId, this.userEmail, company);
    },
    addContactField() {
      this.contacts.push({ type: null, detail: null });
    },
    addGroupField() {
      this.groups.push({ type: null, detail: null });
    },
    cancel() {
      this.$router.push(this.rootLocation);
    },
    falseLodding() {
      this.loading1 = false;
      this.loading2 = false;
    },
    sendRequest(currentStep, action, userId, userEmail, data) {
      /**
       * ## Action list ##
       *
       * owner
       * company
       *
       */
      this.$http
        .post(rootURL + "/employers/createProfile/" + action, {
          userId: userId,
          userEmail: userEmail,
          userToken: this.userToken,
          action: action,
          data: data
        })
        .then(function(response) {
          this.falseLodding();
          if (currentStep === 1) {
            if (cookie.isSet("user")) {
              let user = cookie.get("user");
              user["auth"]["profile"] = currentStep;
              cookie.set("user", user);
            } else {
              //if user cookie does not exist
              this.bottomSheetColor = "c-yellow";
              this.bottomSheetText =
                "User cookie damaged, but data stored successfully.";
              this.showBottomSheet = true;
            }

            this.stepper = currentStep + 1; //move to next step
          } else {
            let user = cookie.get("user");
            user["auth"]["profile"] = "complete";
            cookie.set("user", user);

            this.homeBtn = true;
            this.bottomSheetColor = "c-green";
            this.bottomSheetText = "Your profile saved successfully...";
            this.showBottomSheet = true;
            setTimeout(() => (this.showBottomSheet = false), this.timer);
          }
        })
        .catch(function(error) {
          console.log("Error: ", error);
          console.log("Error code: ", error.status);

          this.bottomSheetText = httpError.getErrorMessage(error);
          this.bottomSheetColor = "c-red";
          this.falseLodding();
          this.showBottomSheet = true;
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

