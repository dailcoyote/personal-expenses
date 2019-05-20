<template>
  <v-container mb-2>
    <v-layout row wrap justify-center>
      <v-flex lg7 md9 sm12 xs12>
        <v-card class="elevation-0">
          <v-card-text class="pa-0">
            <v-list two-line class="pa-0">
              <template>
                <v-list-tile avatar @click="onDialogOpen()">
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
              <v-btn dark flat @click="resetFilter()">Reset</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="pa-0">
            <v-container grid-list-md>
              <v-layout wrap justify-center>
                <v-flex xs12 sm12 md9 lg7 my-3>
                  <v-list two-line class="pa-0">
                    <template v-for="(item, index) in filterByGroup">
                      <v-list-tile :key="index" @click="onFilterSelected(index)">
                        <v-list-tile-content>
                          <v-list-tile-sub-title v-html="item.label" class="subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-checkbox
                            v-model="search.filterItemLabel"
                            :value="item.label"
                            color="#40668e"
                          ></v-checkbox>
                        </v-list-tile-action>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-flex>
              </v-layout>
              <v-layout row justify-center>
                <v-flex xs12 sm12 md6 my-3 row>
                  <v-btn block v-if="search.filterChipEnabled" color="#40668e" dark @click="onSearch()">Apply</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row wrap justify-center>
      <div slot="widget-content" lg6 md-4 sm12 xs12>
        <div class="text-sm-left text-lg-left">
          <v-chip
            close
            v-model="search.filterChipEnabled"
            color="teal"
            text-color="white"
            @input="onFilterItemRemoved()"
          >
            <v-avatar>
              <v-icon>check_circle</v-icon>
            </v-avatar>
            {{search.filterChipLabel}}
          </v-chip>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import Moment from "moment";
import settings from "@/settings";

export default {
  props: {
    searchActivities: Function,
    reload: Function
  },
  data: () => ({
    filterByGroup: [...settings.search.filter.filterByGroup],
    search: {
      dialog: false,
      filterChipEnabled: false,
      filterChipLabel: "",
      filterItemLabel: "",
      filterItemStartDate: undefined
    }
  }),
  methods: {
    onDialogOpen: function() {
      this.search.dialog = true;
    },
    onFilterSelected: function(indx) {
      this.search.filterItemLabel = this.filterByGroup[indx].label;
      this.search.filterItemStartDate = this.filterByGroup[indx].startDate;
      this.search.filterChipEnabled = true;
      this.search.filterChipLabel = this.search.filterItemLabel.substring();
    },
    resetFilter: function() {
      this.search.filterItemLabel = "";
      this.search.filterItemStartDate = undefined;
      this.search.filterChipEnabled = false;
    },
    onFilterItemRemoved: function() {
      this.resetFilter();
      this.reload();
    },
    onSearch: function() {
      this.search.dialog = !this.search.dialog;
      this.searchActivities({
        startDate: this.search.filterItemStartDate,
        endDate: undefined
      });
    }
  }
};
</script>

