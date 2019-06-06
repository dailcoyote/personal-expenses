import _ from 'lodash';
import settings from "@/settings";

const getters = {
    getActivities: state => (offset = 0) => {
        return state.activities.slice(offset,settings.search.limit);
    },
    activity: state => {
        return {...state.activity};
    },
    toolbarFilter: state => state.toolbar.filter,
    filterChip: state => state.search.activities.chip,
    activitySubmitRequest: state => state.activitySubmitRequest,
    searchDialog: state => state.search.dialog,
    bottomNavSection: state => state.bottomNavSection
}

export default getters;