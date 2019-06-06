<template>
  <div id="appRoot">
    <template>
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <app-bottom-navigator v-if="screen.width<screen.mobileBreakPoint"></app-bottom-navigator>
        <v-content>
          <!-- Page Header -->
          <!-- <page-header></page-header> -->
          <div class="page-wrapper">
            <nuxt/>
          </div>
          <snackbar :show="show" :text="snackbarMessage" :color="snackbarColor"></snackbar>
        </v-content>
        <!-- App Navigation Bottom -->
        <!-- <app-bottom-navigator fixed v-if="screen.width<screen.mobileBreakPoint"></app-bottom-navigator> -->
      </v-app>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppBottomNavigator from "@/components/AppBottomNavigator";
// import PageHeader from "@/components/PageHeader";
import Snackbar from "@/components/widgets/Snackbar";

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppBottomNavigator,
    // PageHeader,
    Snackbar
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    screen: {
      width: 0,
      mobileBreakPoint: 1264
    }
  }),
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      this.screen.width = window.innerWidth;
      if (this.screen.width < this.screen.mobileBreakPoint)
        this.$store.commit("DISABLE_DRAWER");
    }
  },
  computed: mapState({
    snackbarMessage(state) {
      return state.alert.message.substr();
    },
    snackbarColor(state) {
      return state.alert.color.substr();
    },
    show: state => state.alert.show
  })
};
</script>

<style lang="stylus" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
  margin-bottom: 50px;
}

.app--footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
