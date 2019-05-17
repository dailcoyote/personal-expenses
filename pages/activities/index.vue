<template>
  <div id="pageActivityList">
    <v-btn color="#40668e" small dark fixed top right fab :style="moveForFabButtonStyle" @click="onActivityCreate()">
      <v-icon>add</v-icon>
    </v-btn>
    <v404 v-if="!activities.length"></v404>
    <v-container v-else grid-list-lg fluid my-2>
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
    <activity-type-form></activity-type-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Moment from "moment";
import settings from "@/settings";
import V404 from "@/components/notifications/v404";
import SearchFilter from "@/components/list/SearchFilter";
import ActivityCardList from "@/components/widgets/ActivityCardList";
import ActivityTypeForm from "@/components/popups/ActivityTypeForm";

export default {
  layout: "dashboard",
  components: {
    V404,
    SearchFilter,
    ActivityCardList,
    ActivityTypeForm
  },
  data: () => ({
    currency: settings.currency.code
  }),
  created: function() {
    this.$store.dispatch("loadActivities");
  },
  methods: {
    onActivityCreate() {
      this.$store.commit("activityPopupToggle")
    }
  },
  computed: {
    activities(){
      return this.getActivities();
    },
    moveForFabButtonStyle() {
      return "top: 98px; right: 15px;";
    },
    ...mapState(["activitiesLoading"]),
    ...mapGetters(["getActivities"])
  }
};
</script>
