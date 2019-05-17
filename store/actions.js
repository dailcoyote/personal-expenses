import DashboardAPI from "@/api/dashboard";
import ActivityAPI from "@/api/activities";
import Settings from "@/settings";

const actions = {
    async loadDashboardTools({ commit, state }) {
        commit('DASHBOARD_API_BEGIN_LOADING');
        const tools = await DashboardAPI.getDashboard()
        commit('DASHBOARD_API_DATA_LOADED', tools);
    },
    async loadActivities({ commit, state }, offset = 0) {
        commit('ACTIVITY_API_BEGIN_LOADING');
        state.activityStore.length || commit('CREATE_ACTIVITY_STORE', await ActivityAPI.getActivities());
        if ((state.activityStore.length - (offset + Settings.search.limit)) + Settings.search.limit > 0) {
            commit('ACTIVITY_STORE_SORT');
            commit('LOAD_ACTIVITYIES', offset);
        }
        commit('ACTIVITY_API_DATA_LOADED');
    },
    async SAVE_ACTIVITY({ commit, state }, newActivity) {
        commit('CREATE_ACTIVITY_ITEM', newActivity);
        commit('SAVE_ACTIVITY_ITEM');
    }
}

export default actions;