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
                        group: 'R',
                        value: 40000,
                        transactionId:"c00At9q"
                    }
                ]
            },
            {
                date: new Date(2019, 3, 15),
                transactions: [
                    {
                        title: 'Funds withdrawal',
                        group: 'R',
                        value: 39200,
                        transactionId:"12s6wxxx"
                    },
                    {
                        title: 'Market',
                        group: 'E',
                        value: -12100,
                        transactionId:"QWED233"
                    },
                    {
                        title: 'Basket',
                        group: 'E',
                        value: -4150,
                        transactionId:"320sawW"
                    },
                    {
                        title: 'Stationery',
                        group: 'E',
                        value: -300,
                        transactionId:"cBAAt955"
                    }
                ]
            }, {
                date: new Date(2019, 4, 15),
                transactions: [
                    {
                        title: 'Issuance of debt',
                        group: 'E',
                        value: -1000,
                        transactionId:"322At9q"
                    }
                ]
            },
            {
                date: new Date(2019, 4, 17),
                transactions: [
                    {
                        title: 'Smoke',
                        group: 'E',
                        value: -6900,
                        transactionId:"126tQW"
                    },
                    {
                        title: 'Utilities',
                        group: 'E',
                        value: -6125.22,
                        transactionId:"c66At9q"
                    }
                ]
            },
            {
                date: new Date(2019, 1, 15),
                transactions: [
                    {
                        title: 'Basket',
                        group: 'E',
                        value: -6900,
                        transactionId:"3699At9q"
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