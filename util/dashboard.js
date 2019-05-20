import _ from "lodash";
import Settings from "@/settings";
import { ACTIVITY_TYPES, ACTIVITY_GROUPS } from "@/constants/activityTypes";
import { timeout, generateID } from "@/util/processHelper";
import { _format } from "@/util/formatter"

const Dashboard = {
    dashboard: Settings.dashboard,
    budgetBlank: {
        totalCosts: 0,
        debt: 0,
        bank: 0,
        monthlyProfit: 0,
        monthlyInCome: 0,
        monthlyExpenses: 0
    },
    calcCostsInPercent(budget) {
        return Math.round((budget.monthlyExpenses * 100) / budget.monthlyInCome);
    },
    generateCards(stat) {
        this.dashboard.cards.forEach((item, index) => {
            if (!item.id) item.id = generateID();
            switch (index) {
                case 0:
                    this.dashboard.cards[0].value = stat.monthlyProfit;
                    break;
                case 1:
                    this.dashboard.cards[1].value = stat.debt;
                    break;
                case 2:
                    this.dashboard.cards[2].value = stat.totalCosts;
                    break;
                case 3:
                    this.dashboard.cards[3].value = stat.bank;
                    break;
            }
            if (item.title != "Total Costs") {
                if (item.value > 0) this.dashboard.cards[index]["indicatorState"] = "G";
                else if (item.value < 0) this.dashboard.cards[index]["indicatorState"] = "R";
            }
        })
    },
    generateStatistic(stat) {
        let costsInPercent = this.calcCostsInPercent(stat);
        this.dashboard.stat.expenditures.month.percentBalance = costsInPercent;
        this.dashboard.stat.expenditures.month.subTitle = costsInPercent + " %";
        this.dashboard.stat.expenditures.month.income = _format(stat.monthlyInCome, "0,0")
        this.dashboard.stat.expenditures.month.expenses = _format(stat.monthlyExpenses - (stat.monthlyExpenses * 2), "0,0")
    },
    processing(activities) {
        const now = new Date();
        const beginMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        console.log("processing", activities)
        const stat = _.reduce(activities, function (accumulator, activity) {
            console.log("activity", activity, "accumulator", JSON.stringify(accumulator))
            _.forEach(activity.transactions, function (item) {
                if (item.activityGroup == ACTIVITY_GROUPS.E) {
                    accumulator.totalCosts += item.value;
                    if (activity.date.getTime() >= beginMonth.getTime())
                        accumulator.monthlyExpenses -= item.value;
                    if (item.title === ACTIVITY_TYPES["Issuance of debt"].text)
                        accumulator.debt -= -item.value;
                    else if (item.title === ACTIVITY_TYPES["Utilities"].text)
                        accumulator.bank -= -item.value;
                }
                else if (item.activityGroup == ACTIVITY_GROUPS.R) {
                    if (activity.date.getTime() >= beginMonth.getTime())
                        accumulator.monthlyInCome += item.value;
                    if (item.title === ACTIVITY_TYPES["Debt coming"].text)
                        accumulator.debt += item.value;
                    if (item.title === ACTIVITY_TYPES["Deposit Payment"].text)
                        accumulator.bank += item.value;
                }
            })
            if (activity.date.getTime() >= beginMonth.getTime()) {
                accumulator.monthlyProfit =
                    accumulator.monthlyInCome - accumulator.monthlyExpenses
            }
            console.log(accumulator)
            return accumulator;
        }, Object.assign({}, this.budgetBlank))
        this.generateStatistic(stat);
        this.generateCards(stat);
    },
    async getDashboard(activities) {
        this.processing(activities);
        return { ...this.dashboard };
    }
}

export default Dashboard;