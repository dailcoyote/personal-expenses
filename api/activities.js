import { timeout } from "@/util/processHelper";

const activities = [
    {
        date: new Date(2019, 4, 1),
        listOf: [
            {
                title: 'Donations',
                activityGroup: 'R',
                type: 'Debit',
                value: 40000
            }    
        ]
    },
    {
        date: new Date(2019, 3, 15),
        listOf:[
            {
                title: 'Funds withdrawal',
                activityGroup: 'R',
                type: 'Debit',
                value: 39200
            },
            {
                title: 'Market',
                activityGroup: 'E',
                type: 'Credit',
                value: -12100
            },
            {
                title: 'Basket',
                activityGroup: 'E',
                type: 'Credit',
                value: -4150
            },
            {
                title: 'Stationery',
                activityGroup: 'E',
                type: 'Credit',
                value: -300
            }            
        ]
    },{
        date: new Date(2019, 4, 15),
        listOf: [
            {
                title: 'Issuance of debt',
                activityGroup: 'E',
                type: 'Credit',
                value: -1000
            }    
        ]
    },
    {
        date: new Date(2019, 5, 6),
        listOf: [
            {
                title: 'Smoke',
                activityGroup: 'E',
                type: 'Credit',
                value: -6900
            },
            {
                title: 'Utilities',
                activityGroup: 'E',
                type: 'Credit',
                value: -6125.22
            }    
        ]
    }
]

const Service = {
    async getActivities() {
        await timeout();
        return activities;
    }
}

export default Service;