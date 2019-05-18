import DashboardUtil from "@/util/dashboard";
import ActivityAPI from "@/api/activities";
import Settings from "@/settings";

const actions = {
    async LOAD_DASHBOARD_TOOLS({ commit, state, dispatch }) {
        commit('DASHBOARD_API_BEGIN_LOADING');
        if(!state.dashboardTools)
            await dispatch('UPDATE_DASHBOARD')
        commit('DASHBOARD_API_DATA_LOADED');
    },
    async LOAD_ACTIVITIES({ commit }, offset = 0) {
        commit('ACTIVITY_API_BEGIN_LOADING');
        const activities = await ActivityAPI.loadActivities(offset);
        commit('ACTIVITY_API_DATA_LOADED');
        return activities;
    },
    async NEW_TRANSACTION_CREATED({ commit, dispatch, state }, newActivityTransactionId) {
        commit('ACTIVITY_TRANSACTION_ID_COMMIT', newActivityTransactionId);
        dispatch('UPDATE_DASHBOARD')
    },
    async UPDATE_DASHBOARD({ commit, state }){
        const activityStore = await ActivityAPI.getActivityStore();
        const dashboard = await DashboardUtil.getDashboard(activityStore)
        commit('DASHBOARD_COMMIT', dashboard)
    }
}

export default actions;