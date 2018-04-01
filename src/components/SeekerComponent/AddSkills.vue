<template>
  <v-container grid-list-md text-xs-center class="pa-0">
    <v-card color="dark lighten-1 px-2" class="mb-3">
      <v-container grid-list-md>
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

        <v-layout row wrap>
          <v-flex xs12 sm6 class="text-xs-left">
            <v-btn
              color="primary"
              :loading="loadingTags"
              v-on:click="addTags()"
              :disabled="loadingTags"
            >Add Skills</v-btn>
            <v-btn 
              flat
              v-on:click="clearTags()"
              :disabled="loadingTags"
            >Clear</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>

    <v-card class="px-2">
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
          <v-flex xs12 sm6 class="text-xs-left">
            <v-btn
              color="primary"
              :loading="loading"
              v-on:click="addSkills()"
              :disabled="loading"
            >Add Skills</v-btn>
            <v-btn 
              flat
              v-on:click="clear()"
              :disabled="loading"
            >Clear</v-btn>
          </v-flex>
          <v-flex xs12 sm6 class="text-xs-right">
            <v-btn 
              fab dark small 
              color="primary" 
              v-on:click="addKSAOField()"
              :disabled="loading"
            ><v-icon dark>add</v-icon></v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

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
import { rootURL, skillTags } from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  data: () => ({
    userId: null,
    userEmail: null,
    ksao: [{ name: null, description: null }],
    tags: [],

    loading: false, //add skill button loading
    loadingTags: false,
    showBottomSheet: false,
    bottomSheetColor: "c-blue",
    bottomSheetText: "Loading your skills...",
    timer: 2000,

    skillTags: skillTags
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
  methods: {
    addKSAOField() {
      this.ksao.push({ name: null, description: null });
    },
    addSkills() {
      let strNull = JSON.stringify({ name: null, description: null });
      //remove null objects from array
      let ksaoArray = [];
      this.ksao.forEach((item, index) => {
        let strItem = JSON.stringify(item);
        if (strItem != strNull) {
          ksaoArray.push(item);
        }
      });
      this.ksao = ksaoArray;

      if (this.ksao.length === 0) {
        this.ksao.push({ name: null, description: null });
        this.bottomSheetColor = "c-yellow";
        this.bottomSheetText = "Skills are not entered.";
        this.showBottomSheet = true;
      } else {
        //send request if array not null
        this.loading = true;
        this.sendRequest(
          this.userId,
          this.userEmail,
          this.ksao,
          "ksao",
          "addSkills"
        );
      }
    },
    clear() {
      this.ksao = [{ name: null, description: null }];
    },
    addTags() {
      //check array is empty?
      if (this.tags.length === 0) {
        this.bottomSheetColor = "c-yellow";
        this.bottomSheetText = "Skill tags are not entered.";
        this.showBottomSheet = true;
      } else {
        this.loadingTags = true;
        this.sendRequest(
          this.userId,
          this.userEmail,
          this.tags,
          "tags",
          "addTags"
        );
      }
    },
    clearTags() {
      this.tags = [];
    },
    sendRequest(userId, userEmail, data, action, path) {
      return new Promise((resolve, reject) => {
        this.$http
          .post(rootURL + "/seekers/" + path, {
            userId: userId,
            userEmail: userEmail,
            action: action,
            data: data
          })
          .then(function(response) {
            if (action === "ksao") {
              this.loading = false;
              this.bottomSheetText = "Your skills added successfully...";
            } else {
              this.loadingTags = false;
              this.bottomSheetText = "Your skill tags added successfully...";
            }
            this.bottomSheetColor = "c-green";
            this.showBottomSheet = true;
            setTimeout(() => (this.showBottomSheet = false), this.timer);
            resolve();
          })
          .catch(function(error) {
            console.log("Error: ", error);
            console.log("Error code: ", error.status);

            this.bottomSheetText = httpError.getErrorMessage(error);
            this.bottomSheetColor = "c-red";
            this.showBottomSheet = true;

            if (action === "ksao") {
              this.loading = false;
            } else {
              this.loadingTags = false;
            }
            reject(error);
          });
      });
    }
  }
};
</script>

<style scoped src="./style.css"></style>

