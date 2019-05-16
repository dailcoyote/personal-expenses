<template>
  <v-card class="px-3">
    <v-toolbar card dense color="transparent">
      <v-toolbar-title>
        <h4>{{title}}</h4>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">
        <template v-for="(item, index) in listOf">
          <v-list-tile :key="index" @click="clickListItemHandler(item)">
            <activity-avatar :activityName="item.text"></activity-avatar>
            <v-list-tile-content>
              <v-list-tile-sub-title v-html="item.text" class="subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon dark color="grey darken-3">chevron_right</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import ActivityAvatar from "@/components/list/ActivityAvatar";

export default {
  components: {
    ActivityAvatar
  },
  props: {
    title: String,
    listOf: Array,
    clickListItemHandler: Function
  }
};
</script>
