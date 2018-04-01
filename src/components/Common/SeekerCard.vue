<template>
  <v-card class="elevation-7 my-3">
    <v-card-title class="card-title">
      <h3 class="subheading">{{general.firstName+" "+general.lastName}}</h3>
      <v-spacer></v-spacer>
      <p class="caption">
        {{getCountryName(general.country)}}
      </p>
    </v-card-title>

    <v-card-text class="pt-2 pb-0">
      <v-layout row wrap>
        <v-flex xs6>
          <p class="mt-1 mb-0">{{general.gender}}</p>
        </v-flex>
        <v-flex xs6>
          <p class="mt-1 mb-0">{{general.currentPosition}}</p>
        </v-flex>
      </v-layout>

      <v-divider class="my-2"></v-divider>

      <p class="body-1 des">{{general.summary}}</p>

      <v-divider class="mb-2"></v-divider>

      <v-layout row wrap>
        <v-chip 
          color="grey lighten-1" 
          v-for="(chip,i) in getTags" 
          :key="i"
        >{{chip}}</v-chip>
      </v-layout>

      <v-divider class="my-2"></v-divider>
    </v-card-text>

    <v-expansion-panel>
      <v-expansion-panel-content>
        <v-layout slot="header">
          <h3 class="subheading">More...</h3>
        </v-layout>

        <v-card>
          <v-card-text class="pt-0">
            <v-divider class="my-2"></v-divider>

            <v-layout 
              v-for="experienceItem in experience" 
              :key="experienceItem.title" 
              row wrap
            >
              <v-flex xs6>
                <p class="mt-1 mb-0">{{experienceItem.title}} :</p>
              </v-flex>
              <v-flex xs6>
                <p class="mt-1 mb-0">{{experienceItem.company}}</p>
              </v-flex>
              <v-flex xs12>
                <p class="mt-1 mb-0">{{experienceItem.description}}</p>
              </v-flex>
            </v-layout>
            <v-divider class="my-2"></v-divider>

            <v-layout 
              v-for="educationItem in education" 
              :key="educationItem.school" 
              row wrap
            >
              <v-flex xs6>
                <p class="mt-1 mb-0">{{educationItem.school}} :</p>
              </v-flex>
              <v-flex xs6>
                <p class="mt-1 mb-0">{{educationItem.field}}</p>
              </v-flex>
              <v-flex xs12>
                <p class="mt-1 mb-0">{{educationItem.description}}</p>
              </v-flex>
            </v-layout>
            <v-divider class="my-2"></v-divider>

            <v-layout 
              v-for="ksaoItem in ksao" 
              :key="ksaoItem.name" 
              row wrap
            >
              <v-flex xs3>
                <p class="mt-1 mb-0">{{ksaoItem.name}} :</p>
              </v-flex>
              <v-flex xs9>
                <p class="mt-1 mb-0">{{ksaoItem.description}}</p>
              </v-flex>
            </v-layout>
            <v-divider class="my-2"></v-divider>

            <v-layout 
              v-for="extraItem in extra" 
              :key="extraItem.name" 
              row wrap
            >
              <v-flex xs3>
                <p class="mt-1 mb-0">{{extraItem.name}} :</p>
              </v-flex>
              <v-flex xs9>
                <p class="mt-1 mb-0">{{extraItem.description}}</p>
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
      </v-expansion-panel-content>
    </v-expansion-panel>
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
    "general",
    "experience",
    "education",
    "ksao",
    "extra",
    "tags",
    "contacts"
  ],
  data: () => ({
    seekerId: this.id
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
    }
  }
};
</script>

<style scoped src="./style.css"></style>