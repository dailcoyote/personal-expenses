const mutations = {
    toggleDrawer(state){
        state.drawer = !state.drawer;
    },
    drawer(state, val){
        state.drawer = val;
    },
    DASHBOARD_API_DATA_LOADED(state, data) {
        state.dashboardTools = data;
        state.isLoading = !state.isLoading;
    },
    DASHBOARD_API_BEGIN_LOADING(state){
        state.isLoading = !state.isLoading;
    }
}

export default mutations;