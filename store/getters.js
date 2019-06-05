import _ from 'lodash';
import settings from "@/settings";

const getters = {
    getActivities: state => (offset = 0) => {
        return state.activities.slice(offset,settings.search.limit);
    },
    activity: state => {
        return {...state.activity};
    },
    filterChip: state => state.search.activities.chip,
    activitySubmitRequest: state => state.activitySubmitRequest,
    searchDialog: state => state.search.dialog
}

export default getters;