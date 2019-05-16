import mutations from "@/store/mutations";
import actions from "@/store/actions";

const state = () => ({
    dashboardTools: {},
    isLoading: false,
    drawer: true,
    activitiesLoading: false,
    activities: [],
    activityPopupForm: {
        isOpen: false
    }
})

export default {
    state,
    actions,
    mutations
}