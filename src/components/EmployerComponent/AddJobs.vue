<template>
  <v-container grid-list-md text-xs-center class="pa-0">
    <v-card color="dark lighten-1" class="mb-4 px-2">
      <v-container grid-list-md>
        <v-layout row wrap>
          
          <v-flex xs12>
            <v-text-field 
              box dark 
              label="Job title" 
              v-model="jobTitle"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field 
              box dark multi-line 
              label="Job description" 
              v-model="jobDescription"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field 
              box dark 
              label="Reference URL" 
              v-model="url"
              required
            ></v-text-field>
          </v-flex>

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

          <v-flex xs12 sm6>
            <v-text-field 
              box dark 
              label="Salary (Approximately)" 
              v-model="salary"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field 
              box dark 
              label="Number of job opportunities" 
              v-model="offers"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 pl-5>
            <v-radio-group v-model="online" row>
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
                v-model="enable"
              ></v-switch>
            </div>
          </v-flex>
          
          <v-flex xs12 sm6>
            <div class="pl-4">
              <v-switch 
                label="Privacy" 
                v-model="privacy"
              ></v-switch>
            </div>
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

    <v-layout row wrap>
      <v-btn
        color="primary"
        :loading="loading"
        v-on:click="submit()"
        :disabled="loading"
      >Save</v-btn>
      <v-btn 
        flat
        v-on:click="reset()"
        :disabled="loading"
      >Reset form</v-btn>
      <v-btn 
        flat
        v-on:click="cancel()"
        :disabled="loading"
      >Cancel</v-btn>
    </v-layout>

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
  contactItems,
  skillTags
} from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    userId: null,
    userToken: null,
    userEmail: null,

    jobTitle: null,
    jobDescription: null,
    url: null,
    tags: [],
    salary: null,
    offers: null,
    online: null,
    enable: true,
    privacy: false,
    contacts: [{ type: null, detail: null }],

    loading: false,
    showBottomSheet: false,
    bottomSheetColor: "c-blue",
    bottomSheetText: "Loading your skills...",
    timer: 3500,

    skillTags: skillTags,
    contactItems: contactItems
  }),
  created: function() {
    if (cookie.isSet("user")) {
      let user = cookie.get("user");
      this.userToken = cookie.get("token");
      this.userId = user.auth.id;
      this.userEmail = user.auth.email;
    } else {
      this.$router.push("/NotFound");
      return;
    }
  },
  methods: {
    addContactField() {
      this.contacts.push({ type: null, detail: null });
    },
    submit() {
      this.loading = true;
      let job = {
        jobTitle: this.jobTitle,
        jobDescription: this.jobDescription,
        contacts: this.contacts,
        tags: this.tags,
        url: this.url,
        online: this.online,
        salary: this.salary,
        offers: this.offers,
        enable: this.enable,
        privacy: this.privacy
      };
      this.sendRequest(this.userId, this.userEmail, job);
    },
    reset() {
      this.jobTitle = null;
      this.jobDescription = null;
      this.url = null;
      this.tags = [];
      this.salary = null;
      this.offers = null;
      this.online = null;
      this.enable = true;
      this.privacy = false;
      this.contacts = [{ type: null, detail: null }];
    },
    cancel() {
      this.$router.push(employerHomeRoute);
    },
    sendRequest(userId, userEmail, data) {
      this.$http
        .post(rootURL + "/employers/addJob", {
          userId: userId,
          userEmail: userEmail,
          userToken: this.userToken,
          data: data
        })
        .then(function(response) {
          this.loading = false;
          this.bottomSheetText = "Job opportunity added successfully...";

          this.bottomSheetColor = "c-green";
          this.showBottomSheet = true;
        })
        .catch(function(error) {
          console.log("Error: ", error);
          console.log("Error code: ", error.status);

          this.bottomSheetText = httpError.getErrorMessage(error);
          this.bottomSheetColor = "c-red";
          this.showBottomSheet = true;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped src="./style.css"></style>

