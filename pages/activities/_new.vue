<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid my-2>
      <v-layout row wrap justify-center>
        <v-flex xs10 lg5>
          <v-subheader class="pa-0 mt-4 mb-2">Activity Detail</v-subheader>
          <!-- <v-divider></v-divider> -->
          <v-form ref="form" v-model="valid" class="py-2">
            <div class="d-flex my-2">
              <v-text-field
                :label="formCostLabel"
                :prefix="formCostSigned"
                :suffix="currency"
                type="number"
                :rules="[rules.required]"
                v-model="activity.value"
                @input="onValueChange"
                :error-messages="errors.collect('value')"
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
                v-model="activity.description"
                hint
              ></v-textarea>
            </div>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import settings from "@/settings";
import { ACTIVITY_GROUPS } from "@/constants/activityTypes";
import ActivityAPI from "@/api/activities";

export default {
  layout: "activity",
  data: () => ({
    dictionary: {
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
    valid: true
  }),
  created() {},
  mounted() {
    this.activity.title = this.activity.title || this.activityType.text;
    this.activity.group = this.activity.group || this.activityType.group;
  },
  destroyed() {
    this.$store.commit("ACTIVITY_SUBMIT_RESET");
    this.$store.commit("ACTIVITY_FORM_VALID", false);
  },
  methods: {
    onValueChange(val) {
      let valueCheck = false;
      if (val && /^[0-9]*$/gm.test(val)) 
        valueCheck = true;
      this.$store.commit("ACTIVITY_FORM_VALID", valueCheck);
    },
    async submit() {
      const validatorResult = await this.$validator.validateAll();
      if (validatorResult) {
        this.activity.value =
          this.activityType.group === ACTIVITY_GROUPS.E
            ? parseInt(this.activity.value - this.activity.value * 2)
            : parseInt(this.activity.value);
        this.$store.dispatch("TRANSACTION_CREATE", { ...this.activity });
        this.$router.push({ path: "/activities" });
      }
    }
  },
  computed: {
    ...mapState(["activitySubmitRequest", "activityType"]),
    activity: {
      get: function() {
        return this.$store.getters.activity;
      }
    },
    formCostLabel() {
      return this.activityType.group === ACTIVITY_GROUPS.R ? "Debit" : "Credit";
    },
    formCostSigned() {
      return this.activityType.group === ACTIVITY_GROUPS.R ? "+ " : "- ";
    },
    formColorTheme() {
      return this.activityType.color;
    },
    currency() {
      return settings.currency.name;
    }
  },
  watch: {
    activitySubmitRequest(val) {
      if(val) this.submit();
    }
  }
};
</script>

