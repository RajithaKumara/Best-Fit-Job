<template>
<v-container class="pa-0">
  <v-stepper v-model="stepper" vertical>

    <v-stepper-step step="1" :complete="stepper > 1">
      General Information
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card color="dark lighten-1 px-2" class="mb-5">
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

            <v-flex xs12 sm6>
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
                  label="Date of birth"
                  v-model="date"
                  readonly
                ></v-text-field>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  @change="save"
                  min="1950-01-01"
                  :max="maxDob"
                ></v-date-picker>
              </v-menu>
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
                required
              ></v-select>
              </div>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                box dark
                label="Current Position"
                v-model="currentPosition"
              ></v-text-field>
            </v-flex>
            
            <v-flex xs12>
              <v-text-field 
                box dark 
                multi-line 
                label="Summary"
                v-model="summary"
              ></v-text-field>
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


    <v-stepper-step step="2" :complete="stepper > 2">
      Contact Information
      <small>Add your contact information to communicate with employers</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-card color="dark lighten-1 px-2" class="mb-5">
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
        :loading="loading2"
        v-on:click="continueStep2()"
        :disabled="loading2"
      >Save & Continue</v-btn>
      <v-btn 
        flat
        v-on:click="cancel()"
        :disabled="loading2"
      >Cancel</v-btn>
    </v-stepper-content>


    <v-stepper-step step="3" :complete="stepper > 3">
      Experience
      <small>Add your work experience</small>
    </v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="dark lighten-1 px-2" class="mb-5">
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
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 class="pb-0">
              <v-text-field 
                box dark 
                label="Company" 
                v-model="experiences[index].company"
              ></v-text-field>
            </v-flex>

            <v-flex xs12  class="pt-0">
              <v-text-field 
                box dark
                multi-line 
                label="Description"
                v-model="experiences[index].description"
              ></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 class="text-xs-right">
              <v-btn fab dark small color="primary" v-on:click="addExperienceField()">
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn
        color="primary"
        :loading="loading3"
        v-on:click="continueStep3()"
        :disabled="loading3"
      >Save & Continue</v-btn>
      <v-btn 
        flat
        v-on:click="cancel()"
        :disabled="loading3"
      >Cancel</v-btn>
    </v-stepper-content>
    

    <v-stepper-step step="4" :complete="stepper > 4">
      Education
      <small>Add your educational qualifications</small>
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="dark lighten-1 px-2" class="mb-5">
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
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 class="pb-0">
              <v-text-field 
                box dark 
                label="Field of study" 
                v-model="education[index].field"
              ></v-text-field>
            </v-flex>

            <v-flex xs12  class="pt-0">
              <v-text-field 
                box dark
                multi-line 
                label="Description"
                v-model="education[index].description"
              ></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 class="text-xs-right">
              <v-btn fab dark small color="primary" v-on:click="addEducationField()">
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn
        color="primary"
        :loading="loading4"
        v-on:click="continueStep4()"
        :disabled="loading4"
      >Save & Continue</v-btn>
      <v-btn 
        flat
        v-on:click="cancel()"
        :disabled="loading4"
      >Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="5" :complete="stepper > 5">
      Skills & Knowledge
      <small>Add your konwledge, skills,attitudes and other attributes</small>
    </v-stepper-step>
    <v-stepper-content step="5">
      <v-card color="dark lighten-1 px-2" class="mb-5">
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
              ></v-text-field>
            </v-flex>

            <v-flex xs12  class="pt-0">
              <v-text-field 
                box dark
                multi-line 
                label="Description"
                v-model="ksao[index].description"
              ></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 class="text-xs-right">
              <v-btn fab dark small color="primary" v-on:click="addKSAOField()">
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn
        color="primary"
        :loading="loading5"
        v-on:click="continueStep5()"
        :disabled="loading5"
      >Save & Continue</v-btn>
      <v-btn 
        flat
        v-on:click="cancel()"
        :disabled="loading5"
      >Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="6" :complete="stepper > 6">
      Extra activities
      <small>Add your extracurricular activities</small>
    </v-stepper-step>
    <v-stepper-content step="6">
      <v-card color="dark lighten-1 px-2" class="mb-5">
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
              ></v-text-field>
            </v-flex>

            <v-flex xs12  class="pt-0">
              <v-text-field 
                box dark
                multi-line 
                label="Description"
                v-model="extra[index].description"
              ></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 class="text-xs-right">
              <v-btn fab dark small color="primary" v-on:click="addExtraField()">
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn
        color="primary"
        :loading="loading6"
        v-on:click="continueStep6()"
        :disabled="loading6"
      >Save & Continue</v-btn>
      <v-btn 
        flat
        v-on:click="cancel()"
        :disabled="loading6"
      >Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="7">
      Tags
      <small>Categorize your skills which are mention Skills & Knowledge section</small>
    </v-stepper-step>
    <v-stepper-content step="7">
      <v-card color="dark lighten-1 px-2" class="mb-5">
        <v-container grid-list-md>
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
        </v-container>
      </v-card>
      <v-btn
        v-if="!homeBtn"
        color="primary"
        :loading="loading7"
        v-on:click="continueStep7()"
        :disabled="loading7"
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
  seekerHomeRoute,
  genderList,
  countryList,
  contactItems,
  skillTags
} from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    //configuration variable
    stepper: 1,
    loading1: false,
    loading2: false,
    loading3: false,
    loading4: false,
    loading5: false,
    loading6: false,
    loading7: false,
    homeBtn: false,
    errorMsg: "Error...",
    showBottomSheet: false,
    bottomSheetText: "Storing profile data...",
    bottomSheetColor: "c-blue",
    rootLocation: seekerHomeRoute,

    //user identity
    userId: null,
    userToken: null,
    userEmail: null,

    //step 1 variables
    firstName: "",
    lastName: "",
    date: null,
    gender: null,
    country: null,
    currentPosition: "",
    summary: "",
    //step 1 configuration variable
    menu: false,

    //step 2 variables
    contacts: [{ type: null, detail: null }],

    //step 3 variables
    experiences: [{ title: null, company: null, description: null }],

    //step 4 variables
    education: [{ school: null, field: null, description: null }],

    //step 5 variables
    ksao: [{ name: null, description: null }],

    //step 6 variables
    extra: [{ name: null, description: null }],

    //step 7 variables
    tags: [],

    //list items
    genderItems: genderList,
    contactItems: contactItems,
    countryList: countryList,
    skillTags: skillTags,

    //fileds rules
    emailRules: [
      v => {
        return !!v || "E-mail is required";
      },
      v =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    passwordRules: [
      v => {
        return !!v || "Password is required";
      },
      v =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "At least 6 characters"
    ],
    confirmPasswordRules: [
      v => {
        return !!v || "Password is required";
      },
      v =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Passwords does not match"
    ]
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
        this.stepper = 7;
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
      let general = {
        firstName: this.firstName,
        lastName: this.lastName,
        dob: this.date,
        gender: this.gender,
        country: this.country,
        currentPosition: this.currentPosition,
        summary: this.summary
      };
      this.sendRequest(1, "general", this.userId, this.userEmail, general);
    },
    continueStep2() {
      this.loading2 = true;
      this.sendRequest(
        2,
        "contacts",
        this.userId,
        this.userEmail,
        this.contacts
      );
    },
    continueStep3() {
      this.loading3 = true;
      this.sendRequest(
        3,
        "experience",
        this.userId,
        this.userEmail,
        this.experiences
      );
    },
    continueStep4() {
      this.loading4 = true;
      this.sendRequest(
        4,
        "education",
        this.userId,
        this.userEmail,
        this.education
      );
    },
    continueStep5() {
      this.loading5 = true;
      this.sendRequest(5, "ksao", this.userId, this.userEmail, this.ksao);
    },
    continueStep6() {
      this.loading6 = true;
      this.sendRequest(6, "extra", this.userId, this.userEmail, this.extra);
    },
    continueStep7() {
      this.loading7 = true;
      this.sendRequest(7, "tags", this.userId, this.userEmail, this.tags);
    },

    addContactField() {
      this.contacts.push({ type: null, detail: null });
    },
    addExperienceField() {
      this.experiences.push({ title: null, company: null, description: null });
    },
    addEducationField() {
      this.education.push({ school: null, field: null, description: null });
    },
    addKSAOField() {
      this.ksao.push({ name: null, description: null });
    },
    addExtraField() {
      this.extra.push({ name: null, description: null });
    },
    cancel() {
      this.$router.push(this.rootLocation);
    },
    falseLodding() {
      this.loading1 = false;
      this.loading2 = false;
      this.loading3 = false;
      this.loading4 = false;
      this.loading5 = false;
      this.loading6 = false;
      this.loading7 = false;
    },
    sendRequest(currentStep, action, userId, userEmail, data) {
      /**
       * ## Action list ##
       *
       * general
       * contacts
       * experience
       * education
       * ksao
       * extra
       * tags
       *
       */
      this.$http
        .post(rootURL + "/seekers/createProfile/" + action, {
          userId: userId,
          userEmail: userEmail,
          userToken: this.userToken,
          action: action,
          data: data
        })
        .then(function(response) {
          this.falseLodding();
          if (currentStep < 7) {
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
            setTimeout(() => (this.showBottomSheet = false), 6000);
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

