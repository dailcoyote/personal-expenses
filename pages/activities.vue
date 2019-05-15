<template>
  <div id="pageActivityList">
    <v-container>
      <v-container grid-list-lg fluid v-if="!activitiesLoading && activities">
        <search-filter></search-filter>
        <v-layout
          row
          wrap
          ma-0
          align-center
          justify-center
          mb-3
          v-for="(activity, rootIndx) in activities"
          :key="rootIndx"
        >
          <v-flex lg6 md-4 sm12 xs12>
            <activity-card-list
              v-bind:title="activity.date"
              v-bind:items="activity.listOf"
              :currency="currency"
            ></activity-card-list>
          </v-flex>
        </v-layout>
      </v-container>
      <v-layout v-else row wrap align-center justify-center ma-0 pb-4>
        <v-progress-circular :size="60" color="primary" indeterminate ma-auto></v-progress-circular>
      </v-layout>
      <v-btn color="#40668e" dark fixed bottom right fab :style="moveForFabButtonStyle">
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Moment from "moment";
import settings from "@/settings";
import SearchFilter from "@/components/list/SearchFilter";
import ActivityCardList from "@/components/widgets/ActivityCardList";

export default {
  layout: "dashboard",
  components: {
    SearchFilter,
    ActivityCardList
  },
  data: () => ({
    currency: settings.currency.code
  }),
  created: function() {
    this.$store.dispatch("loadActivities");
  },
  methods: {},
  computed: {
    moveForFabButtonStyle() {
      return "bottom: 68px; right: 16px;";
    },
    ...mapState(["activitiesLoading", "activities"])
  }
};
</script>
