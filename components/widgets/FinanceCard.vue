<template>
  <v-card max-width="250">
    <div class="layout row ma-0 px-1">
      <div class="text-box align-center justify-space-between">
        <v-card-text>
          <div class="title">{{title}}</div>
        </v-card-text>
        <v-card-text>
          <span v-bind:class="indicatorClass">{{indicator}} {{currency}}</span>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
import { _format } from "@/util/formatter";

export default {
  props: {
    title: String,
    value: Number,
    currency: String,
    indicatorState: String
  },
  computed: {
    indicator: function() {
      return _format(this.value, "0,0");
    },
    indicatorClass: function() {
      let cssClassObj = {
        subheading: true,
        "green--text": false,
        "red--text": false,
        "grey--text": false
      };
      switch (this.indicatorState) {
        case "R":
          cssClassObj["red--text"] = true;
          break;
        case "G":
          cssClassObj["green--text"] = true;
          break;
        default:
          cssClassObj["grey--text"] = true;
      }
      return cssClassObj;
    }
  }
};
</script>

