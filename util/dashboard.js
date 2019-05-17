import _ from "lodash";
import Settings from "@/settings";
import { ACTIVITY_TYPES, ACTIVITY_GROUPS } from "@/constants/activityTypes";
import { timeout, generateID } from "@/util/processHelper";
import { _format } from "@/util/formatter"

const Dashboard = {
    budget: {
        currentMonth: {
            inStock: 0,
            inCome: 0,
            inCost: 0
        },
        totalCosts: 0,
        debt: 0,
        bank: 0
    },
    dashboard: Settings.dashboard,
    calcCostsInPercent() {
        return Math.round((this.budget.currentMonth.inCost * 100) / this.budget.currentMonth.inCome);
    },
    setUpCards() {
        this.dashboard.cards.forEach((item, index) => {
            if (!item.id) item.id = generateID();
            if (item.title != "Total Costs") {
                if (item.value > 0) this.dashboard.cards[index]["indicatorState"] = "G";
                else if (item.value < 0) this.dashboard.cards[index]["indicatorState"] = "R";
            }
        })
    },
    setUpStat() {
        let costsInPercent = this.calcCostsInPercent();
        this.dashboard.stat.expenditures.month.percentBalance = costsInPercent;
        this.dashboard.stat.expenditures.month.subTitle = costsInPercent + " %";
        this.dashboard.stat.expenditures.month.income = _format(this.budget.currentMonth.inCome, "0,0")
    },
    processing(activities) {
        const now = new Date();
        const beginMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        this.budget = _.reduce(activities, function (accumulator, activity) {
            _.forEach(activity.listOf, function (item) {
                if (item.activityGroup == "E") {
                    accumulator.totalCosts += item.value;
                    if (activity.date.getTime() >= beginMonth.getTime()) {
                        accumulator.currentMonth.inCost -= item.value;
                    }
                    if (item.title === ACTIVITY_TYPES["Issuance of debt"].text)
                        accumulator.debt += item.value;
                    else if (item.title === ACTIVITY_TYPES["Utilities"].text)
                        accumulator.bank += item.value;
                }
                else if (item.activityGroup == "R") {
                    if (activity.date.getTime() >= beginMonth.getTime()) {
                        accumulator.currentMonth.inCome += item.value;
                    }
                    if (item.title === ACTIVITY_TYPES["Deposit Payment"].text)
                        accumulator.bank += item.value;
                }
            })
            if (activity.date.getTime() >= beginMonth.getTime()) {
                accumulator.currentMonth.inStock =
                    accumulator.currentMonth.inCome - accumulator.currentMonth.inCost
            }
            return accumulator;
        }, this.budget)
        this.dashboard.cards[0].value = this.budget.currentMonth.inStock
        this.dashboard.cards[1].value = this.budget.debt
        this.dashboard.cards[2].value = this.budget.totalCosts
        this.dashboard.cards[3].value = this.budget.bank
    },
    async getDashboard(activities) {
        this.processing(activities);
        this.setUpStat();
        this.setUpCards();
        return this.dashboard;
    }
}

export default Dashboard;