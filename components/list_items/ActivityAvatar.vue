<template>
  <v-list-tile-avatar :color="color">
    <v-icon dark>{{icon}}</v-icon>
  </v-list-tile-avatar>
</template>

<script>
import { ACTIVITY_TYPES } from "@/constants/activityTypes";

export default {
    props: {
       activityName: String
    }, 
    data: () => ({}),
    computed: {
        color() {
            if(ACTIVITY_TYPES[this.activityName]){
                return ACTIVITY_TYPES[this.activityName].color
            }
            return undefined;
        },
        icon() {
             if(ACTIVITY_TYPES[this.activityName]){
                return ACTIVITY_TYPES[this.activityName].icon
            }
            return undefined;
        }
    }
};
</script>
