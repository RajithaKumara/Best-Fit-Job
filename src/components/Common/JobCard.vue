<template>
  <v-card class="elevation-7 my-3">
    <v-card-title class="card-title">
      <h3 class="subheading">{{title}}</h3>
      <v-spacer></v-spacer>
      <p class="caption mt-1 mb-0">{{date}}</p>
    </v-card-title>

    <v-expansion-panel>
      <v-expansion-panel-content>
        <v-layout class="mr-4 mt-2 ex-title" slot="header">
          <h3 class="subheading">{{company.companyName}}</h3>
          <v-spacer></v-spacer>
          <p class="caption">
            {{getCountryName(company.companyCountry)}}
          </p>
        </v-layout>
        <v-card>
          <v-card-text class="pb-1">
            <p class="body-1 des">{{company.aboutCompany}}</p>

            <p>Building: {{company.companyBuilding}}</p>
            <p>Address: {{company.companyAddress}}</p>
            <p>Email: {{company.companyEmail}}</p>
            <p>Website: 
              <a :href="'https://'+company.companyUrl">
                {{company.companyUrl}}
              </a>
            </p>
            <p>Industry: {{getCompanyType(company.companyType)}}</p>
            <p>Employees: {{getCompanySize(company.companySize)}}</p>
            <p>Founded: {{company.date}}</p>
            <v-layout 
              v-for="(contact,i) in company.groups" 
              :key="i" 
              row wrap
            >
              <v-flex xs3>
                <p class="mt-1 mb-0">{{getContactType(contact.type)}} :</p>
              </v-flex>
              <v-flex xs9>
                <p class="mt-1 mb-0">{{contact.detail}}</p>
              </v-flex>
            </v-layout>
          
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-card-text class="pt-1">
      <v-divider class="mb-3"></v-divider>

      <p class="body-1 des">{{description}}</p>

      <v-divider class="mb-2"></v-divider>

      <v-layout row wrap>
        <v-chip 
          color="grey lighten-1" 
          v-for="(chip,i) in getTags" 
          :key="i"
        >{{chip}}</v-chip>
      </v-layout>

      <v-divider class="my-2"></v-divider>

      <v-layout row wrap>
        <v-flex xs6>
          <v-tooltip bottom>
            <v-chip 
              slot="activator"
              color="grey lighten-1"
              v-on:click="web()"
            >
              <v-avatar class="link" color="grey lighten-2">
                <v-icon>language</v-icon>
              </v-avatar>
              Reference
            </v-chip>
            <span>{{url}}</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs6>
          <v-chip color="grey lighten-1" mr-0>
            <v-avatar color="grey lighten-2">
              <v-icon>card_travel</v-icon>
            </v-avatar>
            {{job}}
          </v-chip>
        </v-flex>

        <v-flex xs6>
          <v-chip color="grey lighten-1">
            <v-avatar color="grey lighten-2">
              {{offers}}
            </v-avatar>
            Offers
          </v-chip>
        </v-flex>
        <v-flex xs6>
          <v-chip color="grey lighten-1">
            <v-avatar color="grey lighten-2">
              <v-icon>attach_money</v-icon>
            </v-avatar>
            {{salary}}
          </v-chip>
        </v-flex>
      </v-layout>

      <v-divider class="my-2"></v-divider>

      <v-layout 
        v-for="(contact,i) in contacts" 
        :key="i" 
        row wrap
      >
        <v-flex xs3>
          <p class="mt-1 mb-0">{{getContactType(contact.type)}} :</p>
        </v-flex>
        <v-flex xs9>
          <p class="mt-1 mb-0">{{contact.detail}}</p>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  countryList,
  contactItems,
  skillTags,
  companySizeList,
  companyTypeList
} from "../../data/data";
import { objectId } from "../../models/validator";

export default {
  props: [
    "id",
    "title",
    "description",
    "url",
    "tags",
    "salary",
    "offers",
    "online",
    "contacts",
    "company"
  ],
  data: () => ({
    jobId: this.id
  }),
  computed: {
    date() {
      let timestamp = objectId.getTimestamp(this.id);
      let str = timestamp.toJSON();
      let array = str.split("T");
      return array[0];
    },
    job() {
      if (this.online) {
        return "Online Job";
      } else {
        return "Office";
      }
    },
    getTags() {
      let tagNames = [];
      this.tags.forEach(tag => {
        for (let i = 0; i < skillTags.length; i++) {
          if (skillTags[i].value === tag) {
            tagNames.push(skillTags[i].text);
            break;
          }
        }
      });
      return tagNames;
    }
  },
  methods: {
    web() {
      console.log(this.url);
      window.open(this.url);
    },
    getContactType(type) {
      for (let i = 0; i < contactItems.length; i++) {
        if (contactItems[i].value === type) {
          return contactItems[i].text;
        }
      }
    },
    getCountryName(country) {
      for (let i = 0; i < countryList.length; i++) {
        if (countryList[i].value === country) {
          return countryList[i].text + ", " + country;
        }
      }
    },
    getCompanySize(size) {
      for (let i = 0; i < companySizeList.length; i++) {
        if (companySizeList[i].value === parseInt(size)) {
          return companySizeList[i].text;
        }
      }
    },
    getCompanyType(type) {
      for (let i = 0; i < companyTypeList.length; i++) {
        if (companyTypeList[i].value === parseInt(type)) {
          return companyTypeList[i].text;
        }
      }
    }
  }
};
</script>

<style scoped src="./style.css"></style>