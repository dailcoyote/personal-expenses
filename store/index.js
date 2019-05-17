import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

const state = () => ({
    dashboardTools: {},
    isLoading: false,
    drawer: true,
    activitiesLoading: false,
    activityStore: [],
    activities: [],
    newActivityItem: {},
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