export const state = () => ({
    dashboardTools: {},
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
    loadDashboardTools(context) {
        context.commit('API_BEGIN_LOADING');
        setTimeout(() => {
            context.commit('API_DATA_LOADED', {
                foo:1, bar:1
            })
        },1200)
    }
}