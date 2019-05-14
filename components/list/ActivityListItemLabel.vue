<template>
  <v-list-tile-action>
    <span v-bind:class="color" v-html="monetary"></span>
  </v-list-tile-action>
</template>

<script>
import { ACTIVITY_TYPES } from "@/constants/activityTypes";
import { _format } from "@/util/formatter";

export default {
  props: {
    value: Number,
    currency: String
  },
  methods: {
    format() {
      return _format(this.value, "0,0");
    }
  },
  computed: {
    monetary() {
      return this.format() + " " + this.currency;
    },
    color() {
      if (this.value > 0) return "green--text";
      else if (this.value < 0) return "red--text";
      return "grey--text";
    }
  }
};
</script>
