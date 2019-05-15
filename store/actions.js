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
        const activities = await ActivityAPI.getActivities();
        context.commit('ACTIVITY_API_DATA_LOADED', activities);
    }
}

export default actions;