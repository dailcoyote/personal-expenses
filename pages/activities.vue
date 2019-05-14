<template>
  <div id="pageActivityList">
    <v-container grid-list-lg fluid>
      <v-layout></v-layout>
    </v-container>

    <v-btn color="#40668e" dark fixed bottom right 
           fab :style="moveForFabButtonStyle">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  computed: {
      moveForFabButtonStyle(){
          return "bottom: 90px; right: 18px;";
      }
  }
};
</script>
