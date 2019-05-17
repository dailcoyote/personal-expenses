import _ from 'lodash';
import { timeout } from "@/util/processHelper";


const Service = {
    db: {
        activityList: [
            {
                date: new Date(2019, 4, 1),
                listOf: [
                    {
                        title: 'Donations',
                        activityGroup: 'R',
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
                        value: 39200
                    },
                    {
                        title: 'Market',
                        activityGroup: 'E',
                        value: -12100
                    },
                    {
                        title: 'Basket',
                        activityGroup: 'E',
                        value: -4150
                    },
                    {
                        title: 'Stationery',
                        activityGroup: 'E',
                        value: -300
                    }            
                ]
            },{
                date: new Date(2019, 4, 15),
                listOf: [
                    {
                        title: 'Issuance of debt',
                        activityGroup: 'E',
                        value: -1000
                    }    
                ]
            },
            {
                date: new Date(2019, 4, 17),
                listOf: [
                    {
                        title: 'Smoke',
                        activityGroup: 'E',
                        value: -6900
                    },
                    {
                        title: 'Utilities',
                        activityGroup: 'E',
                        value: -6125.22
                    }    
                ]
            },
            {
                date: new Date(2019, 1, 15),
                listOf: [
                    {
                        title: 'Basket',
                        activityGroup: 'E',
                        value: -6900
                    },
                    {
                        title: 'Basket',
                        activityGroup: 'E',
                        value: -1202
                    }    
                ]
            }
        ]
     },
    orderList(activityList) {
        activityList.sort((prev, current) => {
            if(prev.date.getTime() > current.date.getTime()) return -1
            else if(prev.date.getTime() < current.date.getTime()) return 1;
            else return 0;
        })
    },
    async getActivities() {
        this.orderList(this.db.activityList);
        await timeout();
        return this.db.activityList.slice();
    },
    async save(activity) {
        const _now = new Date();        
        const indx = _.findIndex(this.db.activityList, (l) => {
            return l.date.getMonth() == _now.getMonth()
            && l.date.getDate() == _now.getDate() 
            && l.date.getFullYear() == _now.getFullYear() 
        });
        if(indx >= 0){
            this.db.activityList[indx]["listOf"].push(activity);
        }
        else{
            const newItem = {
                date: new Date(),
                listOf: []
            };
            newItem.listOf.push(activity);
            arr.push(newItem)
        }
        await timeout();
       
    }
}

export default Service;