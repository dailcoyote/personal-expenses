<template>
  <div id="pageActivityList">
    <v-btn color="#40668e" dark fixed top right fab :style="moveForFabButtonStyle">
      <v-icon>add</v-icon>
    </v-btn>
    <v404 v-if="!activities.length"></v404>
    <v-container v-else grid-list-lg fluid ma-2>
      <search-filter></search-filter>
      <v-layout column wrap ma-0 v-if="!activitiesLoading && activities">
        <template v-for="(activity, rootIndx) in activities">
          <v-flex md1 d-flex mb-2 :key="rootIndx">
            <activity-card-list
              v-bind:title="activity.date"
              v-bind:items="activity.listOf"
              :currency="currency"
            ></activity-card-list>
          </v-flex>
        </template>
      </v-layout>
      <v-layout v-else row wrap align-center justify-center ma-0 pb-4>
        <v-progress-circular :size="60" color="primary" indeterminate ma-auto></v-progress-circular>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Moment from "moment";
import settings from "@/settings";
import V404 from "@/components/notifications/v404";
import SearchFilter from "@/components/list/SearchFilter";
import ActivityCardList from "@/components/widgets/ActivityCardList";

export default {
  layout: "dashboard",
  components: {
    V404,
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
      return "top: 98px; right: 15px;";
    },
    ...mapState(["activitiesLoading", "activities"])
  }
};
</script>
