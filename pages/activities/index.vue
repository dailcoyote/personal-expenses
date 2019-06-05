<template>
  <div id="pageActivityList" v-scroll="onScroll">
    <v-btn
      color="#40668e"
      dark
      fixed
      right
      bottom
      fab
      :style="addFabBtn"
      @click="onActivityCreate()"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v404 v-if="!activities.length"></v404>
    <v-container v-else grid-list-lg fluid>
      <v-layout row wrap justify-center>
        <div slot="widget-content" lg6 md-4 sm12 xs12>
          <div class="text-sm-left text-lg-left">
            <v-chip v-model="searchFilterChip.active" color="teal" text-color="white">
              <v-avatar>
                <v-icon>check_circle</v-icon>
              </v-avatar>
              {{searchFilterChip.label}}
            </v-chip>
          </div>
        </div>
      </v-layout>
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
import ActivityCardList from "@/components/widgets/ActivityCardList";
import ActivityTypeTiles from "@/components/popups/ActivityTypeTiles";

export default {
  layout: "dashboard",
  components: {
    V404,
    ActivityCardList,
    ActivityTypeTiles
  },
  data: () => ({
    currency: settings.currency.code,
    bottom: false
  }),
  created: function() {
    this.loadActivities();
  },
  mounted: function() {},
  destroyed() {
    this.searchFilterClear();
    this.activitiesClearFromStore();
  },
  methods: {
    onActivityCreate() {
      this.$store.commit("ACTIVITY_TYPE_SHEET_TOGGLE");
    },
    bottomVisible(scrollingElement) {
      const scrollY = window.scrollY;
      const visible = scrollingElement.clientHeight;
      const pageHeight = scrollingElement.scrollHeight;
      const bottomPage = visible + scrollY >= pageHeight;
      return bottomPage || pageHeight < visible;
    },
    cardListReload() {
      // this.activities = [];
      this.searchFilterClear();
      this.loadActivities();
    },
    activitiesClearFromStore() {
      this.$store.commit("ACTIVITIES_CLEAR");
    },
    loadActivities() {
      this.$store.dispatch("LOAD_ACTIVITIES");
    },
    searchFilterClear() {
      this.$store.dispatch("SEARCH_FILTER_RESET");
    },
    searchActivities() {
      this.searchFilterClear();
      this.$store.dispatch("SEARCH_ACTIVITIES")
    },
    onScroll(e) {
      this.bottom = this.bottomVisible(e.target.scrollingElement);
    }
  },
  computed: {
    ...mapState(["activitiesLoading", "activities"]),
    addFabBtn() {
      return "bottom: 40px; right: 10px;";
    },
    searchFilterChip: {
      get() {
        return this.$store.getters.filterChip;
      }
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) this.loadActivities();
    }
  }
};
</script>
