<template>
  <v-card class="elevation-0">
    <v-toolbar card dense color="transparent">
      <v-toolbar-title>
        <h4>{{shortTitle}}</h4>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">
        <template v-for="(item, index) in items">
          <v-list-tile avatar :key="item.title+index" @click="activityDetailView(item)">
            <activity-avatar :activityName="item.title.toString()"></activity-avatar>
            <v-list-tile-content>
              <v-list-tile-sub-title v-html="item.title" class="subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
            <activity-list-item-label :value="item.value" :currency="currency"></activity-list-item-label>
          </v-list-tile>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import Moment from "moment";
import ActivityAvatar from "@/components/list_items/ActivityAvatar";
import ActivityListItemLabel from "@/components/list_items/ActivityListItemLabel";

export default {
  props: {
    title: Date,
    items: Array,
    currency: String
  },
  components: {
    ActivityAvatar,
    ActivityListItemLabel
  },
  computed: {
    shortTitle() {
      return Moment(this.title).format("MMMM Do YYYY");
    }
  },
  methods: {
    activityDetailView(item) {
      this.$store.dispatch("ACTIVITY_DETAIL_OPEN", {
        ...item,
        dateTime: this.title
      });
    }
  }
};
</script>
