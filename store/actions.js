import DashboardAPI from "@/api/dashboard";
import ActivityAPI from "@/api/activities";

const actions = {
    async loadDashboardTools({commit, state}) {
        commit('DASHBOARD_API_BEGIN_LOADING');
        const tools = await DashboardAPI.getDashboard()
        commit('DASHBOARD_API_DATA_LOADED', tools);
    },
    async loadActivities({commit, state}) {
        commit('ACTIVITY_API_BEGIN_LOADING');
        const activities = !state.activities.length 
                           ? await ActivityAPI.getActivities()
                           : state.activities;
        commit('ACTIVITY_API_DATA_LOADED', [...activities]);
    },
    async SAVE_ACTIVITY({commit, state}, newActivity) {
        commit('CREATE_ACTIVITY_ITEM', newActivity);
        commit('SAVE_ACTIVITY_ITEM');
    }
}

export default actions;