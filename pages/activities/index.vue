<template>
  <div id="pageActivityList">
    <v-btn color="#40668e" dark fixed right bottom fab :style="addFabBtn" @click="onActivityCreate()">
      <v-icon>add</v-icon>
    </v-btn>
    <v404 v-if="!activities.length"></v404>
    <v-container v-else grid-list-lg fluid>
      <!-- <search-filter :cardListReload="cardListReload" :searchActivities="searchActivities"></search-filter> -->
      <v-layout column wrap v-if="!activitiesLoading && activities">
        <template v-for="(activity, rootIndx) in activities">
          <v-flex md1 my-0 d-flex :key="rootIndx">
            <activity-card-list
              v-bind:title="activity.date"
              v-bind:items="activity.transactions"
              :currency="currency"
            ></activity-card-list>
          </v-flex>
        </template>
      </v-layout>
      <v-layout v-else row wrap align-center justify-center ma-0 pb-4>
        <v-progress-circular :size="60" color="primary" indeterminate ma-auto></v-progress-circular>
      </v-layout>
    </v-container>
    <activity-type-tiles></activity-type-tiles>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Moment from "moment";
import settings from "@/settings";
import V404 from "@/components/info/v404";
import SearchFilter from "@/components/widgets/SearchFilter";
import ActivityCardList from "@/components/widgets/ActivityCardList";
import ActivityTypeTiles from "@/components/popups/ActivityTypeTiles";

export default {
  layout: "dashboard",
  components: {
    V404,
    SearchFilter,
    ActivityCardList,
    ActivityTypeTiles
  },
  data: () => ({
    currency: settings.currency.code,
    bottom: false,
    activities: []
  }),
  created: function() {
    this.loadActivities();
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  mounted: function() {},
  destroyed() {
    this.searchFilterClear();
  },
  methods: {
    onActivityCreate() {
      this.$store.commit("ACTIVITY_TYPE_SHEET_TOGGLE");
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomPage = visible + scrollY >= pageHeight;
      return bottomPage || pageHeight < visible;
    },
    searchFilterClear() {
      this.$store.dispatch("SEARCH_FILTER_RESET");
    },
    cardListReload() {
      this.activities = [];
      this.searchFilterClear();
      this.loadActivities();
    },
    loadActivities() {
      this.$store.dispatch("LOAD_ACTIVITIES").then(chunk => {
        this.activities =
          chunk && Array.isArray(chunk)
            ? [...this.activities, ...chunk]
            : this.activities;
      });
    },
    searchActivities(period) {
      this.searchFilterClear();
      this.$store.dispatch("SEARCH_ACTIVITIES", period).then(activities => {
        this.activities = activities ? activities : [];
      });
    }
  },
  computed: {
    ...mapState(["activitiesLoading"]),
    addFabBtn() {
      return "bottom: 40px; right: 10px;";
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) this.loadActivities();
    }
  }
};
</script>
