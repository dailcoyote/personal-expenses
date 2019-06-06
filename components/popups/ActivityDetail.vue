<template>
  <v-dialog v-model="popup" persistent>
    <v-card>
      <v-btn icon color="" @click="closePopup()">
          <v-icon>close</v-icon>
        </v-btn>
      <card-text>
        <span class="title grey--text">{{activity.title}}</span>
      </card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <!-- <v-layout row class="pa-4"> -->
          <div class="d-flex my-2">
            <span class="subtitle grey--text">Debit / Credit</span>
          </div>
          <div class="d-flex my-2">
            <span class="display-1 font-weight-light" v-html="monetary"></span>
          </div>
          <!-- </v-layout> -->
          <v-divider></v-divider>
          <v-layout row justify-center class="mt-3 py-1">
            <v-flex xs5 lg2>
              <span class="grey--text">Transaction iD</span>
            </v-flex>
            <v-flex xs7 lg6>
              <span>{{activity.transactionId}}</span>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs5 lg2>
              <span class="grey--text">Created At</span>
            </v-flex>
            <v-flex xs7 lg6>
              <span>{{dateFormat}}</span>
            </v-flex>
          </v-layout>
          <v-layout row justify-center v-if="activity.description">
            <v-flex xs5 lg2>
              <span class="grey--text">Description</span>
            </v-flex>
            <v-flex xs7 lg6>
              <span>{{activity.description}}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Moment from "moment";
import { mapState } from "vuex";
import { _format } from "@/util/formatter";
import settings from "@/settings";

export default {
  data: () => ({}),
  computed: {
    ...mapState(["activity"]),
    popup: {
      get() {
        return this.$store.getters.activityDetailOpen;
      }
    },
    monetary() {
      return _format(this.activity.value, "0,0") + " " + settings.currency.code;
    },
    dateFormat() {
      return Moment(this.activity.dateTime).format("DD.MM.YYYY HH:mm:ss");
    }
  },
  methods: {
      closePopup() {
        this.$store.commit("ACTIVITY_DETAIL_CLOSE");
      }
  }
};
</script>

