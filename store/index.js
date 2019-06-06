import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";
import menu from "@/api/menu";

const state = () => ({
    dashboardTools: undefined,
    isLoading: false,
    drawer: true,
    bottomNavSection: menu[1].name,
    toolbar: {
        filter: false,
        on: false
    },
    activitiesLoading: false,
    newActivityTransactionId: undefined,
    activitySubmitRequest: false,
    activityFormValid: false,
    activityDetailOpen: false,
    activities: [],
    activity: {
        dateTime: undefined,
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
            chip: {
                label: "",
                active: false
            },
            loaded: false
        },
        dialog: false
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