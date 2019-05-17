import _ from 'lodash';
import { now } from 'moment';
import Settings from "@/settings";

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
    CREATE_ACTIVITY_STORE(state, data) {
        state.activityStore = data;
    },
    ACTIVITY_STORE_SORT(state, data){
        state.activityStore.sort((prev, current) => {
            if(prev.date.getTime() > current.date.getTime()) return -1
            else if(prev.date.getTime() < current.date.getTime()) return 1;
            else return 0;
        })
        state.activityStore = [...state.activityStore];
    },
    ACTIVITY_API_BEGIN_LOADING(state){
        state.activitiesLoading = !state.activitiesLoading;
    },
    ACTIVITY_API_DATA_LOADED(state, offset){
        state.activities = [...state.activities, ...state.activityStore.slice(offset, offset + Settings.search.limit)];
        console.log(state.activityStore.slice(offset, Settings.search.limit))
        state.activitiesLoading = !state.activitiesLoading;
    },
    DESTROY_ACTIVITIES(state){
        state.activities = [];
    },
    CREATE_ACTIVITY_ITEM(state, activity){
        state.newActivityItem = activity;
    },
    SAVE_ACTIVITY_ITEM(state){
        const _now = new Date(); 
        const newActivity = state.newActivityItem;  
        const activitiesMutated = [...state.activityStore];
        const indx = _.findIndex(activitiesMutated, (l) => {
            return l.date.getMonth() == _now.getMonth()
            && l.date.getDate() == _now.getDate() 
            && l.date.getFullYear() == _now.getFullYear() 
        });
        if(indx >= 0){
            activitiesMutated[indx]["listOf"].push(newActivity);
        }
        else{
            const newItem = {
                date: new Date(),
                listOf: []
            };
            newItem.listOf.push(newActivity);
            activitiesMutated.push(newItem)
        }
        state.activityStore = [...activitiesMutated];
    }
}

export default mutations;