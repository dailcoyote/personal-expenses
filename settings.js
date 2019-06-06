import moment from "moment";

export default {
    heads: {
        dashboard: `MyExpenses | Dashboard`,
        activities: `MyExpenses | Activities`,
        newActivity: `MyExpenses | New Activity Form`
    },
    snackbar: {
        timeout: 6500
    },
    currency: {
        code: "&#x20B8",
        name: "KZT"
    },
    search: {
        limit: 4,
        filter: {
            filterByGroup: [
                { label: "Last Week", startDate: moment().day(-7).toDate() },
                { label: "Last Month", startDate: moment().day(-30).toDate() },
                { label: "Last 3 Months", startDate: moment().day(-(30*3)).toDate() },
                { label: "Last 6 Months", startDate: moment().day(-(30*6)).toDate() }                
            ]
        }
    },
    dashboard: {
        cards: [
            {
                id: "S",
                title: "Budget",
                value: 0,
                indicatorState: "A",
                backgroundColor: "#ffcb9e"
            },
            {
                id: "D",
                title: "Debt",
                value: 0,
                indicatorState: "A",
                backgroundColor: "#d9ddf7"
            },
            {
                id: "TC",
                title: "Total Costs",
                value: 0,
                indicatorState: "A",
                backgroundColor: "#fff"
            },
            {
                id: "B",
                title: "Bank",
                value: 0,
                indicatorState: "A",
                backgroundColor: "#e0bd73"
            }
        ],
        stat: {
            expenditures: {
                month: {
                    title: "Budget expenditures",
                    subTitle: "%",
                    caption: "Spent a month",
                    icon: "trending_up",
                    color: "success",
                    percentBalance: 0,
                    income: 0,
                    expenses: 0
                }
            }
        }
    }
}