<template>
  <v-toolbar color="#40668e" fixed dark app>
    <!-- <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
    </v-toolbar-title>-->
    <v-spacer></v-spacer>
    <!-- FILTER COMPONENT -->
    <v-menu
      offset-y
      origin="center center"
      :close-on-content-click="false"
      :nudge-right="140"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" v-show="toolbar.on">
          <v-icon>filter_list</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-text class="pa-0">
          <v-flex xs12>
            <v-list two-line class="pa-2">
              <template v-for="(item, index) in filterByGroup">
                <v-list-tile :key="index" @click="onFilterSelected(index)">
                  <v-list-tile-content class="px-3">
                    <v-list-tile-sub-title v-html="item.label" class="subtitle"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="pl-3">
                    <v-checkbox v-model="searchFilter.selected" :value="item.label" color="#40668e"></v-checkbox>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-menu>
    <v-btn icon href="https://github.com/dailcoyote/MyExpenses">
      <v-icon>fa-2x fa-github</v-icon>
    </v-btn>
    <v-menu
      offset-y
      origin="center center"
      :nudge-right="140"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <v-btn icon large flat slot="activator">
        <v-avatar size="40px">
          <img src="../static/avatar/man_5.jpg" alt="Dail Coyote">
        </v-avatar>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile
          v-for="(item,index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="index"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
import settings from "@/settings";

export default {
  name: "app-toolbar",
  data: () => ({
    items: [
      {
        icon: "account_circle",
        href: "#",
        title: "Profile",
        click: e => {
          console.log(e);
        }
      },
      {
        icon: "fullscreen_exit",
        href: "#",
        title: "Logout",
        click: e => {
          // this.$router.push('/logout')
        }
      }
    ],
    filterByGroup: [...settings.search.filter.filterByGroup],
    searchFilter: {
      selected: ""
    }
  }),
  mounted() {
  },
  computed: {
    ...mapState(["toolbar"]),
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    },
    toolbarFilter: {
      get() {
        return this.$store.getters.toolbarFilter;
      }
    }
  },
  watch: {
    toolbarFilter(f) {
      if(!f){
        this.searchFilter.selected = "";
      }
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("TOGGLE_DRAWER");
    },
    onFilterSelected(indx) {
      const filter = {
        offset: 0,
        startDate: this.filterByGroup[indx].startDate,
        endDate: undefined
      };
      const chip = { label: this.searchFilter.selected, active: true };     
      this.$store.dispatch("SEARCH_ACTIVITIES", {
        filter,
        chip
      });
    }
  }
};
</script>
