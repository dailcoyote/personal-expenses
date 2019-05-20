import _ from 'lodash';
import { timeout, generateID } from "@/util/processHelper";
import Settings from "@/settings";

const Service = {
    db: {
        activityStore: [
            {
                date: new Date(2019, 4, 1),
                transactions: [
                    {
                        title: 'Donations',
                        activityGroup: 'R',
                        value: 40000
                    }
                ]
            },
            {
                date: new Date(2019, 3, 15),
                transactions: [
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
            }, {
                date: new Date(2019, 4, 15),
                transactions: [
                    {
                        title: 'Issuance of debt',
                        activityGroup: 'E',
                        value: -1000
                    }
                ]
            },
            {
                date: new Date(2019, 4, 17),
                transactions: [
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
                transactions: [
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
    orderList() {
        this.db.activityStore.sort((prev, current) => {
            if (prev.date.getTime() > current.date.getTime()) return -1
            else if (prev.date.getTime() < current.date.getTime()) return 1;
            else return 0;
        })
    },
    transactionId() {
        return generateID();
    },
    async getActivityStore() {
        this.orderList(this.db.activityStore);
        return this.db.activityStore;
    },
    async loadActivities({ startDate, endDate, offset = 0 }) {
        if (this.db.activityStore.length >= offset) {
            this.orderList(this.db.activityStore);
            if (startDate)
                return this.search({ startDate, offset })
            else
                return [...this.db.activityStore.slice(offset, offset + Settings.search.limit)];
        }
        return false;
    },
    async search({ startDate, offset = 0 }) {
        if (this.db.activityStore.length >= offset) {
            this.orderList(this.db.activityStore);
            const filtered = this.db.activityStore.filter((activity, indx) => {
                return activity.date.getTime() >= startDate.getTime();
            })
            return filtered.slice(offset, offset + Settings.search.limit)
        }
        return false;
    },
    async save(activity) {
        const _now = new Date();
        const transactionId = this.transactionId();
        const indx = _.findIndex(this.db.activityStore, (l) => {
            return l.date.getMonth() == _now.getMonth()
                && l.date.getDate() == _now.getDate()
                && l.date.getFullYear() == _now.getFullYear()
        });
        activity["transactionId"] = transactionId;
        if (indx >= 0) {
            this.db.activityStore[indx]["transactions"].push(activity);
        }
        else {
            const newItem = {
                date: new Date(),
                transactions: []
            };
            newItem.transactions.push(activity);
            this.db.activityStore.push(newItem)
        }
        await timeout();
        return transactionId;
    }
}

export default Service;