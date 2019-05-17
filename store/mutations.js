import _ from 'lodash';
import { now } from 'moment';

const mutations = {
    toggleDrawer(state){
        state.drawer = !state.drawer;
    },
    drawer(state, val){
        state.drawer = val;
    },  
    activityPopupToggle(state) {
        state.activityPopupForm.isOpen = !state.activityPopupForm.isOpen;
    },
    DASHBOARD_API_BEGIN_LOADING(state){
        state.isLoading = !state.isLoading;
    },
    DASHBOARD_API_DATA_LOADED(state, data) {
        state.dashboardTools = data;
        state.isLoading = !state.isLoading;
    },
    ACTIVITY_API_BEGIN_LOADING(state){
        state.activitiesLoading = !state.activitiesLoading;
    },
    ACTIVITY_API_DATA_LOADED(state, activities){
        state.activities = activities;
        state.activitiesLoading = !state.activitiesLoading;
    }
}

export default mutations;