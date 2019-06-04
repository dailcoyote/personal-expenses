<template>
  <v-toolbar color="#40668e" fixed dark app>
    <!-- <v-spacer></v-spacer> -->
    <v-btn icon @click="back()">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-icon class="pl-4">{{activityType.icon}}</v-icon>
    <v-toolbar-title>{{activityType.text}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon :disabled="!activityFormValid" @click="submit()">
      <v-icon>check</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
export default {
    methods: {
        back() {
            this.$router.go(-1);
        },
        submit() {
            this.$store.commit("ACTIVITY_SUBMIT_REQUEST");
        }
    },
    computed: {
        ...mapState(["activityType", "activityFormValid"])
    }
};
</script>
