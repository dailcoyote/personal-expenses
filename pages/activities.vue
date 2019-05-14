<template>
  <div id="pageActivityList">
    <v-container grid-list-lg fluid>
      <v-layout row wrap ma-0 align-center justify-center mb-3
                v-for="(activity, rootIndx) in activities" :key="rootIndx">
        <v-flex lg6 md-4 sm12 xs12>
          <activity-card-list v-bind:title="activity.date" v-bind:items="activity.listOf" 
                              :currency="currency"></activity-card-list>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn color="#40668e" dark fixed bottom right fab :style="moveForFabButtonStyle">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Moment from "moment";
import settings from "@/settings";
import activities from "@/api/activities";
import ActivityCardList from "@/components/widgets/ActivityCardList";

export default {
  layout: "dashboard",
  components: {
    ActivityCardList
  },
  data: () => ({
    activities: activities,
    currency: settings.currency.code
  }),
  methods: {},
  computed: {
    moveForFabButtonStyle() {
      return "bottom: 68px; right: 16px;";
    }
  }
};
</script>
