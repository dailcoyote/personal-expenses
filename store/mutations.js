import _ from 'lodash';
import { now } from 'moment';
import Settings from "@/settings";

const mutations = {
    TOGGLE_DRAWER(state){
        state.drawer = !state.drawer;
    },
    DRAWER(state, val){
        state.drawer = val;
    },  
    ACTIVITY_POPUP_TOGGLE(state) {
        state.activityPopupForm.isOpen = !state.activityPopupForm.isOpen;
    },
    DASHBOARD_API_BEGIN_LOADING(state){
        state.isLoading = !state.isLoading;
    },
    DASHBOARD_COMMIT(state, dashboard){
        state.dashboardTools = JSON.parse(JSON.stringify(dashboard));
    },
    DASHBOARD_API_DATA_LOADED(state) {
        state.isLoading = !state.isLoading;
    },
    ACTIVITY_API_BEGIN_LOADING(state){
        state.activitiesLoading = !state.activitiesLoading;
    },
    ACTIVITY_API_DATA_LOADED(state){
        state.activitiesLoading = !state.activitiesLoading;
    },
    ACTIVITY_TRANSACTION_ID_COMMIT(state, id){
        state.newActivityTransactionId = id;
    }
}

export default mutations;