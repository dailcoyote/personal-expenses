<template>
  <v-layout row wrap justify-center mb-3>
    <v-flex lg6 md-4 sm12 xs12>
      <v-card class="elevation-0">
        <v-card-text class="pa-0">
          <v-list two-line class="pa-0">
            <template>
              <v-list-tile avatar @click="onSearchOpen()">
                <v-list-tile-content color="brown lighten-2">
                  <v-list-tile-sub-title class="subtitle">
                    <span style="padding-left:25px;">Search Filter</span>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon dark color="brown lighten-2">filter_list</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <!--        D I A L O G     -->
    <v-dialog
      v-model="search.dialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay="false"
    >
      <v-card>
        <v-toolbar dark color="#40668e">
          <v-btn icon @click.native="search.dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Search Filter</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="search.dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
      search: {
        dialog: false
      }
  }),
  methods: {
    onSearchOpen: function() {
      this.search.dialog = true;
    }
  }
};
</script>

