<template>
  <v-card width="250">
    <div class="layout row ma-0 px-1">
      <div class="text-box align-center justify-space-between">
        <v-card-text>
          <div class="title">{{title}}</div>
        </v-card-text>
        <v-card-text>
          <span v-bind:class="indicatorClass" v-html="monetary"></span>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
import { _format } from "@/util/formatter";

export default {
  props: {
    // card: Object
    title: String,
    value: Number,
    currency: String,
    indicatorState: String
  },
  mounted: function() {},
  methods: {
    moneyFormat: function() {
      return _format(this.value, "0,0");
    }
  },
  computed: {
    monetary() {
      return this.moneyFormat() + " " + this.currency;
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

