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
    },
    CREATE_ACTIVITY_ITEM(state, activity){
        state.newActivityItem = activity;
    },
    SAVE_ACTIVITY_ITEM(state){
        const _now = new Date(); 
        const newActivity = state.newActivityItem;  
        const activitiesFromPrevState = [...state.activities];
        const indx = _.findIndex(activitiesFromPrevState, (l) => {
            return l.date.getMonth() == _now.getMonth()
            && l.date.getDate() == _now.getDate() 
            && l.date.getFullYear() == _now.getFullYear() 
        });
        if(indx >= 0){
            activitiesFromPrevState[indx]["listOf"].push(newActivity);
        }
        else{
            const newItem = {
                date: new Date(),
                listOf: []
            };
            newItem.listOf.push(newActivity);
            activitiesFromPrevState.push(newItem)
        }
        state.activities = activitiesFromPrevState;
    }
}

export default mutations;