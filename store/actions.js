import DashboardUtil from "@/util/dashboard";
import ActivityAPI from "@/api/activities";
import Settings from "@/settings";
import { timeout } from "@/util/processHelper";

const actions = {
    async LOAD_DASHBOARD_TOOLS({ commit, state, dispatch }) {
        try {
            commit('DASHBOARD_API_BEGIN_LOADING');
            if (!state.dashboardTools)
                await dispatch('REFRESH_DASHBOARD')
            commit('DASHBOARD_API_DATA_LOADED');
        } catch (e) {
            dispatch('PUSH_ERROR', e.message || e)
        }
    },
    async REFRESH_DASHBOARD({ commit, dispatch, state }) {
        try {
            const activityStore = await ActivityAPI.getActivityStore();
            const dashboard = await DashboardUtil.getDashboard(activityStore)
            commit('DASHBOARD_COMMIT', dashboard)
        } catch (e) {
            throw new Error("Dashboard is not loaded. Perhaps there is no access to api")
        }
    },
    async LOAD_ACTIVITIES({ commit, state, dispatch }) {
        try {
            commit('ACTIVITY_API_BEGIN_LOADING');
            const activities = await ActivityAPI.loadActivities(state.search.activities.filter);
            const offsetNext = state.search.activities.filter.offset + Settings.search.limit
            commit('ACTIVITY_API_OFFSET', offsetNext);
            commit('ACTIVITY_API_DATA_LOADED');
            return activities;
        } catch (e) {
            dispatch('PUSH_ERROR', e.message || e)
        }
    },
    async SEARCH_ACTIVITIES({ commit, state, dispatch }, datePeriod) {
        try {
            const searchFilter = { ...datePeriod, offset: state.search.activities.filter.offset };
            const offsetNext = state.search.activities.filter.offset + Settings.search.limit
            commit('ACTIVITY_API_BEGIN_LOADING');
            commit('ACTIVITY_API_FILTER_MUTATE', searchFilter);
            const activities = await ActivityAPI.search(searchFilter);
            commit('ACTIVITY_API_OFFSET', offsetNext);
            commit('ACTIVITY_API_DATA_LOADED');
            return activities;
        } catch (e) {
            dispatch('PUSH_ERROR', e.message || e)
        }
    },
    SEARCH_FILTER_RESET({ commit }) {
        commit('ACTIVITY_API_FILTER_RESET');
    },
    async TRANSACTION_CREATE({ commit, dispatch, state }, newActivity) {
        try {
            console.log(newActivity)
            const transactionId = await ActivityAPI.save(newActivity);
            commit('ACTIVITY_TRANSACTION_ID_COMMIT', transactionId);
            dispatch('REFRESH_DASHBOARD')
        } catch (e) {
            dispatch('PUSH_ERROR', e.message || e)
        }
    },
    async PUSH_ERROR({ commit }, error) {
        commit('ALERT_COMMIT', error)
        await timeout(Settings.snackbar.timeout);
        commit('ALERT_CLEAR')
    }
}

export default actions;