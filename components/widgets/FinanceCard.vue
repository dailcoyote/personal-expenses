<template>
  <v-card class="elevation-6">
    <v-card-text>
      <v-list>
        <template v-for="(item, index) in cards">
          <v-list-tile :key="item.title" two-line class="py-2">
            <v-avatar :tile="true">
              <img :src="item.avatar">
            </v-avatar>
            <v-list-tile-content class="pl-4">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <span
                v-bind:class="indicatorClass(item.indicatorState)"
                v-html="monetary(item.value)"
              ></span>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index < cards.length - 1" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { _format } from "@/util/formatter";

export default {
  props: {
    currency: String,
    cards: Array
  },
  mounted: function() {},
  methods: {
    monetary(value) {
      return _format(value, "0,0") + " " + this.currency;
    },
    indicatorClass: function(indicatorState) {
      let cssClassObj = {
        subheading: true,
        "font-weight-regular": true,
        "green--text": false,
        "red--text": false,
        "grey--text": false
      };
      switch (indicatorState) {
        case "R":
          cssClassObj["red--text"] = true;
          break;
        case "G":
          cssClassObj["green--text"] = true;
          break;
        default:
          cssClassObj["black--text"] = true;
      }
      return cssClassObj;
    }
  },
  computed: {}
};
</script>

