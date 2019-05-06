<template>
  <div id="pageDashboard">
    <v-container grid-list-lg fluid>
      <v-layout v-if="!isLoading" row wrap ma-2>
        <!-- <v-flex lg12 sm12>
          <h3>My Expenses</h3>
        </v-flex>-->
        <v-flex v-for="(item) in dashboardTools" v-bind:key="item.id" lg3 sm6 md3>
          <finance-card v-bind="item"></finance-card>
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

export default {
  layout: "dashboard",
  components: {
    FinanceCard
  },
  data: () => ({
    color: Material,
    selectedTab: "tab-1"
  }),
  created: function() {},
  mounted: function() {
    this.$store.dispatch("loadDashboardTools");
  },
  computed: {
    ...mapState(["dashboardTools", "isLoading"])
    // ...mapActions(['getDashboardTools'])
    // ...Vuex.mapGetters(['dashboardTools'])
  }
};
</script>


