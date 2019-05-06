import DashboardAPI from "@/api/dashboard";

export const state = () => ({
    dashboardTools: [],
    isLoading: false
})

export const mutations = {
    API_DATA_LOADED(state, data) {
        state.dashboardTools = data;
        state.isLoading = !state.isLoading;
    },
    API_BEGIN_LOADING(state){
        state.isLoading = !state.isLoading;
    }
}

export const actions = {
    async loadDashboardTools(context) {
        context.commit('API_BEGIN_LOADING');
        const tools = await DashboardAPI.getDashboard()
        context.commit('API_DATA_LOADED', tools);
    }
}