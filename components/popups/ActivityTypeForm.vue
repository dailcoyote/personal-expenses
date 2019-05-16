<template>
  <v-dialog
    v-model="activityPopupForm.isOpen"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay="false"
  >
    <v-card>
      <v-toolbar dark color="#40668e">
        <v-btn icon @click="onPopupClose()" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Activity</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="pa-0">
        <!-- Replenishment -->
        <v-layout wrap>
          <v-flex xs12 sm12 md12 mb-3>
            <activity-type-form-list
              title="Replenishment"
              :listOf="activitiesOfReplenishment"
              :clickListItemHandler="onActivityTypeSelected.bind(this)"
            ></activity-type-form-list>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <activity-type-form-list
              title="Expenses"
              :listOf="activitiesOfExpenses"
              :clickListItemHandler="onActivityTypeSelected.bind(this)"
            ></activity-type-form-list>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import { ACTIVITY_TYPES, ACTIVITY_GROUPS } from "@/constants/activityTypes";
import ActivityTypeFormList from "@/components/list/ActivityTypeFormList";

export default {
  components: {
    ActivityTypeFormList
  },
  data: () => ({}),
  methods: {
    popupClose() {
      this.$store.commit("activityPopupToggle");
    },
    onPopupClose() {
      this.popupClose();
    },
    onActivityTypeSelected(selectedItem) {
      this.popupClose();
      this.$router.push({path: "/activities/_new", query: {...selectedItem} })
    }
  },
  computed: {
    ...mapState(["activityPopupForm"]),
    activitiesOfReplenishment() {
      const listOf = new Array();
      for (let k in ACTIVITY_TYPES) {
        if (ACTIVITY_TYPES[k].group === ACTIVITY_GROUPS.R)
          listOf.push(ACTIVITY_TYPES[k]);
      }
      return listOf;
    },
    activitiesOfExpenses() {
      const listOf = new Array();
      for (let k in ACTIVITY_TYPES) {
        if (ACTIVITY_TYPES[k].group === ACTIVITY_GROUPS.E)
          listOf.push(ACTIVITY_TYPES[k]);
      }
      return listOf;
    }
  }
};
</script>
