<template>
  <v-bottom-nav id="appBottonNavigator" app :active.sync="bottomNavSection" 
                :value="true" light fixed>
    <template v-for="(item, index) in menus">
      <v-btn color="#40668e" flat :value="item.name" :key="item.name+index">
        <span>{{item.title}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </template>
  </v-bottom-nav>
</template>

<script>
import menu from "@/api/menu";
import { mapState } from "vuex";

export default {
  data() {
    return {
      menus: menu.filter(r=> !r.header),
      restoreNavigation: false
    };
  },
  mounted() {
    // console.log("Browser href", this.$route.path)
    // console.log("Nav name", this.bottomNavSection)
    let nav = menu.find(r=> this.$route.path===r.href);
    if(nav && nav.name !== this.bottomNavSection) {
      this.restoreNavigation = true;
      this.bottomNavSection = nav.name;
    }
  },
  computed: {
    bottomNavSection: {
      get() {
        return this.$store.getters.bottomNavSection;
      },
      set(nav) {
        let m = menu.find(r=> nav===r.name);
        this.$store.commit("SWITCH_NAVIGATION", nav);
        if(this.restoreNavigation) {
          this.restoreNavigation = !this.restoreNavigation;
          return;
        }
        this.$router.push(m.href)
      }
    }
  }
};
</script>
