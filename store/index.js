import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

const state = () => ({
    dashboardTools: undefined,
    isLoading: false,
    drawer: true,
    activitiesLoading: false,
    newActivityTransactionId: undefined,
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