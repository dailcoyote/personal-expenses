<template>
  <v-bottom-nav id="appBottonNavigator" app :active.sync="bottomNav" 
                :value="true" light fixed shift>
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
export default {
  data() {
    return {
      menus: menu.filter(r=> !r.header),
      bottomNav: menu[1].name
    };
  },
  watch: {
      bottomNav(name) {
          let m = menu.find(r=> name===r.name);
          this.$router.push(m.href)
      }
  }
};
</script>
