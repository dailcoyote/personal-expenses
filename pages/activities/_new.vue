<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid my-2>
      <v-layout row wrap justify-center>
        <v-flex xs10 lg5>
          <!-- <v-card>
          <v-card-text>-->
          <!-- <v-toolbar :color="formColorTheme" dark flat dense cad>
            <v-icon>{{params.icon}}</v-icon>
            <v-toolbar-title class="subheading">{{form.title + " Form"}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>-->
          <span class="title">{{form.title + " Form"}}</span>
          <v-subheader class="pa-0 mt-4 mb-2">Activity Detail</v-subheader>
          <!-- <v-divider></v-divider> -->
          <v-form v-model="valid" class="py-2">
            <div class="d-flex my-2">
              <v-text-field
                :label="formCostLabel"
                :prefix="formCostSigned"
                :suffix="currency"
                mask="#######"
                :rules="[rules.required]"
                :error-messages="errors.collect('value')"
                v-model="form.value"
                data-vv-name="value"
                v-validate="'required'"
                :color="formColorTheme"
              ></v-text-field>
            </div>
            <div class="d-flex my-2">
              <v-textarea
                name="input-7-1"
                label="Activity Description"
                :color="formColorTheme"
                value
                v-model="form.description"
                hint
              ></v-textarea>
            </div>
            <div class="d-flex mt-4 mb-2">
              <v-btn block :color="formColorTheme" dark :disabled="!valid" @click="submit()">Create Activity</v-btn>
            </div>
          </v-form>
          <!-- </v-card-text>
          </v-card>-->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import settings from "@/settings";
import { ACTIVITY_GROUPS } from "@/constants/activityTypes";
import ActivityAPI from "@/api/activities";

export default {
  layout: "dashboard",
  data: () => ({
    dictionary: {
      attributes: {
        //email: "E-mail Address"
        // custom attributes
      },
      custom: {
        value: {
          required: () => "Value can not be empty"
          //   isNumber: value => "Only digits!"
          // custom messages
        }
      }
    },
    rules: {
      required: value => !!value || "Required."
    },
    valid: true,
    form: {
      title: "",
      activityGroup: "",
      value: "",
      description: ""
    }
  }),
  mounted() {
    this.form.title = `${this.$route.query.text}`;
    this.form.activityGroup = this.$route.query.group;
    this.$validator.localize("en", this.dictionary);
  },
  methods: {
    submit() {
      const validatorPromise = this.$validator.validateAll();
      validatorPromise.then(async success => {
        if (success) {
          const cost = parseInt(this.form["value"]);
          const newActivity = {
            ...this.form,
            value:
              this.form.activityGroup === ACTIVITY_GROUPS.E
                ? cost - cost * 2
                : cost
          };
          this.$store.dispatch("TRANSACTION_CREATE", newActivity);
          this.$router.push({ path: "/activities" });
        }
      });
    }
  },
  computed: {
    formCostLabel() {
      return this.$route.query.group === ACTIVITY_GROUPS.R ? "Debit" : "Credit";
    },
    formCostSigned() {
      return this.$route.query.group === ACTIVITY_GROUPS.R ? "+ " : "- ";
    },
    formColorTheme() {
      return this.$route.query.color;
    },
    currency() {
      return settings.currency.name;
    },
    params() {
      return this.$route.query;
    }
  }
};
</script>

