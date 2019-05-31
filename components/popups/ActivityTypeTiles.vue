<template>
  <v-bottom-sheet v-model="activityTypeSheet">
    <v-card>
      <v-card-text>
         Create new activity
      </v-card-text>
      <v-divider></v-divider>
      <v-layout row wrap py-4>
        <v-flex v-for="tile in tiles" :key="tile.text" 
                @click="onActivityTypeSelected(tile)" class="card_clickable" xs4 lg3>
          <v-layout column align-center class="text-xs-center">
            <v-avatar size="32px" :color="tile.color">
              <v-icon dark>{{tile.icon}}</v-icon>
            </v-avatar>
            <v-card-text>{{ tile.text }}</v-card-text>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { mapState } from "vuex";
import { ACTIVITY_TYPES, ACTIVITY_GROUPS } from "@/constants/activityTypes";

export default {
  data: () => ({}),
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

<style scoped>
.card_clickable {
  cursor: pointer;
}
</style>

