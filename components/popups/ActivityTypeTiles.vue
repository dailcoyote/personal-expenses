<template>
  <v-bottom-sheet v-model="activityTypeSheet">
      <v-list class="scroll-y">
        <v-subheader>Create new activity</v-subheader>
        <v-list-tile v-for="tile in tiles" :key="tile.text" @click="onActivityTypeSelected(tile)">
          <v-list-tile-avatar class="">
            <v-avatar size="32px" :color="tile.color">
              <v-icon dark>{{tile.icon}}</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title class="px-1">{{ tile.text }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
  </v-bottom-sheet>
</template>

<script>
import { mapState } from "vuex";
import { ACTIVITY_TYPES, ACTIVITY_GROUPS } from "@/constants/activityTypes";

export default {
  data: () => ({
    
  }),
  methods: {
    popupClose() {
      this.$store.commit("ACTIVITY_TYPE_SHEET_TOGGLE");
    },
    onActivityTypeSelected(selectedItem) {
      this.popupClose();
      this.$router.push({
        path: "/activities/_new",
        query: { ...selectedItem }
      });
    }
  },
  computed: {
    activityTypeSheet: {
      get() {
        return this.$store.state.activityTypeSheet;
      },
      set(flag) {
        this.popupClose();
      }
    },
    tiles() {
      const listOf = new Array();
      for (let k in ACTIVITY_TYPES) {
        listOf.push(ACTIVITY_TYPES[k]);
      }
      return listOf;
    }
  }
};
</script>
