<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
        
    </v-container>
  </div>
</template>

<script>
import Material from "vuetify/es5/util/colors";

export default {
  layout: "dashboard",
  data: () => ({
    color: Material,
    selectedTab: "tab-1"
  })
};
</script>
