import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

const state = () => ({
    dashboardTools: undefined,
    isLoading: false,
    drawer: true,
    activitiesLoading: false,
    newActivityTransactionId: undefined,
    activitySubmitRequest: false,
    activityFormValid: false,
    activity: {
        title: "",
        group: "",
        value: "",
        description: ""
    },
    activityType: {
        group: "",
        color: "",
        icon: "",
        text: ""
    },
    search: {
        activities: {
            filter: {
                offset: 0,
                startDate: undefined,
                endDate: undefined
            },
            loaded: false
        }
    },
    activityTypeSheet: false,
    alert: {
        message: "",
        color: "error",
        show: false
    }
})

export default {
    state,
    actions,
    mutations,
    getters
}