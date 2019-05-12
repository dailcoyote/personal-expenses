import DashboardAPI from "@/api/dashboard";

const actions = {
    async loadDashboardTools(context) {
        context.commit('DASHBOARD_API_BEGIN_LOADING');
        const tools = await DashboardAPI.getDashboard()
        context.commit('DASHBOARD_API_DATA_LOADED', tools);
    }
}

export default actions;