<template>
  <v-container grid-list-md text-xs-center class="pa-0">
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
                v-on:click="updateSkills()"
                :disabled="loading"
              >Update Skills</v-btn>
              <v-btn 
                flat
                v-on:click="cancel()"
                :disabled="loading"
              >Cancel</v-btn>
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
import { rootURL, seekerHomeRoute } from "../../data/data";
import { cookie } from "../../models/cookie";
import { httpError } from "../../models/errorHandler";

export default {
  props: {
    refresh: String
  },
  data: () => ({
    userId: null,
    userToken: null,
    userEmail: null,
    ksao: [{ name: null, description: null }],
    oldksao: [],

    loading: false,
    popBottomSheet: false,
    showBottomSheet: false,
    refreshBtn: true,
    bottomSheetColor: "c-blue",
    bottomSheetText: "Loading your skills...",
    timer: 2000,
    rootLocation: seekerHomeRoute,
    fetched: false
  }),
  created: function() {
    if (cookie.isSet("user")) {
      let user = cookie.get("user");
      this.userToken = cookie.get("token");
      this.userId = user.auth.id;
      this.userEmail = user.auth.email;
      this.popBottomSheet = true;
      this.fetchSkills(this.userId, this.userEmail);
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
      if (this.refresh === this.rootLocation + "UpdateSkills") {
        this.oldksao = [];
        this.ksao = [{ name: null, description: null }];
        this.fetched = false;
        this.refreshBtn = true;
        this.bottomSheetColor = "c-blue";
        this.bottomSheetText = "Loading your skills...";
        this.popBottomSheet = true;
        this.fetchSkills(this.userId, this.userEmail);
      }
    },
    routeChanges() {
      if (
        this.$route.path === this.rootLocation + "UpdateSkills" &&
        !this.fetched
      ) {
        this.refreshBtn = true;
        this.bottomSheetColor = "c-blue";
        this.bottomSheetText = "Loading your skills...";
        this.popBottomSheet = true;
        this.fetchSkills(this.userId, this.userEmail);
      }
    },
    updateSkills() {
      let currentKsao = JSON.stringify(this.oldksao);
      let newKsao = JSON.stringify(this.ksao);
      if (currentKsao == newKsao) {
        this.bottomSheetText = "Skills are not updated...";
        this.bottomSheetColor = "c-yellow";
        this.showBottomSheet = true;
        setTimeout(() => (this.showBottomSheet = false), this.timer);
      } else {
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
          this.sendRequest(this.userId, this.userEmail, this.ksao);
        }
      }
    },
    addKSAOField() {
      this.ksao.push({ name: null, description: null });
    },
    cancel() {
      this.ksao = [{ name: null, description: null }];
      this.fetched = false;
      this.$router.push(this.rootLocation);
    },
    cancelFetch() {
      if (
        this.bottomSheetColor == "c-yellow" ||
        this.bottomSheetColor == "c-green"
      ) {
        this.popBottomSheet = false;
      } else {
        this.$router.push(this.rootLocation);
      }
    },
    refreshFetch() {
      this.bottomSheetColor = "c-blue";
      this.bottomSheetText = "Loading your skills...";
      this.refreshBtn = true;
      this.fetchSkills(this.userId, this.userEmail);
    },
    fetchSkills(userId, userEmail) {
      this.$http
        .post(rootURL + "/seekers/fetchSkills", {
          userId: userId,
          userEmail: userEmail,
          userToken: this.userToken,
          action: "ksao"
        })
        .then(function(response) {
          let responseData = JSON.stringify(response.body);
          if (this.$route.path === this.rootLocation + "UpdateSkills") {
            this.oldksao = JSON.parse(responseData);
            if (this.oldksao.length != 0) {
              this.ksao = JSON.parse(responseData);
              this.bottomSheetColor = "c-green";
              this.bottomSheetText = "Skills loaded successfully...";
            } else {
              this.bottomSheetColor = "c-yellow";
              this.bottomSheetText = "Your skills are not entered before.";
            }
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
    sendRequest(userId, userEmail, data) {
      this.$http
        .post(rootURL + "/seekers/updateProfile/ksao", {
          userId: userId,
          userEmail: userEmail,
          userToken: this.userToken,
          action: "ksao",
          data: data
        })
        .then(function(response) {
          //without doing this both arrays take as same
          let updatedksao = JSON.stringify(this.ksao);
          this.oldksao = JSON.parse(updatedksao);

          this.bottomSheetColor = "c-green";
          this.bottomSheetText = "Your skills updated successfully...";
          this.showBottomSheet = true;
          this.loading = false;
          setTimeout(() => (this.showBottomSheet = false), this.timer);
        })
        .catch(function(error) {
          console.log("Error: ", error);
          console.log("Error code: ", error.status);

          this.bottomSheetText = httpError.getErrorMessage(error);
          this.bottomSheetColor = "c-red";
          this.loading = false;
          this.showBottomSheet = true;
        });
    }
  }
};
</script>

<style scoped src="./style.css"></style>

