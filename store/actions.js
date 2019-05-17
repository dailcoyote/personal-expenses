import DashboardAPI from "@/api/dashboard";
import ActivityAPI from "@/api/activities";

const actions = {
    async loadDashboardTools(context) {
        context.commit('DASHBOARD_API_BEGIN_LOADING');
        const tools = await DashboardAPI.getDashboard()
        context.commit('DASHBOARD_API_DATA_LOADED', tools);
    },
    async loadActivities(context) {
        context.commit('ACTIVITY_API_BEGIN_LOADING');
        const activities = !context.state.activities.length 
                           ? await ActivityAPI.getActivities()
                           : context.state.activities;
        context.commit('ACTIVITY_API_DATA_LOADED', [...activities]);
    },
    async SAVE_ACTIVITY({commit, state}, activity) {
        // await ActivityAPI.save({...activity});
        commit('CREATE_ACTIVITY_ITEM', activity);
        commit('SAVE_ACTIVITY_ITEM');
    }
}

export default actions;