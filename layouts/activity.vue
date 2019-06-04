<template>
  <div id="activityRoot">
    <template>
      <v-app id="ainspire" class="app">
        <activity-toolbar></activity-toolbar>
        <v-content>
          <div class="page-wrapper">
            <nuxt/>
          </div>
        </v-content>
      </v-app>
    </template>
  </div>
</template>

<script>
import ActivityToolbar from "@/components/ActivityToolbar";
export default {
  components: {
    ActivityToolbar
  }
};
</script>

