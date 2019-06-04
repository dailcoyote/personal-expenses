import _ from 'lodash';
import settings from "@/settings";

const getters = {
    getActivities: state => (offset = 0) => {
        return state.activities.slice(offset,settings.search.limit);
    },
    activity: state => {
        return {...state.activity};
    },
    activitySubmitRequest: state => state.activitySubmitRequest
}

export default getters;