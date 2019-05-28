<template>
  <v-card class="px-0">
    <!-- <v-toolbar card dense color="transparent">
      <v-toolbar-title class="pa-4">
        <h4>{{title}}</h4>
      </v-toolbar-title>
    </v-toolbar> -->
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line subheader>
        <v-subheader class="mx-2">{{title}}</v-subheader>
        <template v-for="(item, index) in listOf">
          <v-list-tile :key="index" @click="clickListItemHandler(item)">
            <activity-avatar :activityName="item.text" class="px-2"></activity-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.text" class="px-2"></v-list-tile-title>
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
