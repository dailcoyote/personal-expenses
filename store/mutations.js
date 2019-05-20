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
    ALERT_COMMIT(state, msg) {
        state.alert.message = msg;
        state.alert.show = true;
    },
    ALERT_CLEAR(state) {
        state.alert.message = "";
        state.alert.show = false;
    },
    ACTIVITY_POPUP_TOGGLE(state) {
        state.activityPopupForm.isOpen = !state.activityPopupForm.isOpen;
    },
    ACTIVITY_API_OFFSET(state, offset) {
        state.search.activities.filter.offset = offset;
    },
    ACTIVITY_API_FILTER_RESET(state) {
        state.search.activities.filter.offset = 0;
        state.search.activities.filter.startDate = undefined;
        state.search.activities.filter.endDate = undefined;
    },
    ACTIVITY_API_FILTER_MUTATE(state, filter) {
        state.search.activities.filter.offset = filter.offset;
        state.search.activities.filter.startDate = filter.startDate;
        state.search.activities.filter.endDate = filter.endDate;
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