import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

const state = () => ({
    dashboardTools: undefined,
    isLoading: false,
    drawer: true,
    activitiesLoading: false,
    activityStore: [],
    activities: [],
    newActivityTransactionId: undefined,
    activityPopupForm: {
        isOpen: false
    }
})

export default {
    state,
    actions,
    mutations,
    getters
}