<template>
  <div id="appRoot">
    <template>
      <v-app id="inspire" class="app">
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <page-header></page-header>
          <div class="page-wrapper">
            <nuxt/>
          </div>
          <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <v-icon color="pink" small>favorite</v-icon>
          </v-footer>
        </v-content>
      </v-app>
    </template>
  </div>
</template>

<script>
import AppToolbar from "@/components/AppToolbar";
import PageHeader from "@/components/PageHeader";

export default {
  components: {
    AppToolbar,
    PageHeader
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: "",
      color: ""
    }
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
