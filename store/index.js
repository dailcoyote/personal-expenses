import mutations from "@/store/mutations";
import actions from "@/store/actions";

const state = () => ({
    dashboardTools: {},
    isLoading: false,
    drawer: true
})

export default {
    state,
    actions,
    mutations
}