<template>
  <div id="pageDashboard">
    <v-container grid-list-lg fluid>
      <v-layout v-if="!isLoading && dashboardTools" row wrap ma-2>
        <v-flex v-for="(item) in dashboardTools.cards" v-bind:key="item.id" lg3 sm6 md3>
          <finance-card v-bind="item"></finance-card>
        </v-flex>
        <v-flex lg4 sm12 xs12>
          <circle-statistic
            :title="dashboardTools.stat.expenditures.month.title"
            :sub-title="dashboardTools.stat.expenditures.month.subTitle"
            :caption="dashboardTools.stat.expenditures.month.caption"
            :icon="dashboardTools.stat.expenditures.month.icon"
            :color="dashboardTools.stat.expenditures.month.color"
            :value="dashboardTools.stat.expenditures.month.percentBalance"
            :income="dashboardTools.stat.expenditures.month.income"
            :currency="dashboardTools.options.currency"
          >
          </circle-statistic>
        </v-flex>
      </v-layout>
      <v-layout v-else align-center justify-center ma-0>
        <v-progress-circular :size="90" color="primary" indeterminate ma-auto></v-progress-circular>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Material from "vuetify/es5/util/colors";
import FinanceCard from "@/components/widgets/FinanceCard";
import CircleStatistic from "@/components/widgets/CircleStatistic";

export default {
  layout: "dashboard",
  components: {
    FinanceCard,
    CircleStatistic
  },
  data: () => ({
    color: Material,
    selectedTab: "tab-1"
  }),
  created: function() {
    this.$store.dispatch("loadDashboardTools");
  },
  mounted: function() {
    // this.$store.dispatch("loadDashboardTools");
  },
  computed: {
    ...mapState(["dashboardTools", "isLoading"])
  }
};
</script>


