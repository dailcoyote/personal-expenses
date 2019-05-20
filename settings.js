export default {
    currency: {
        code: "&#x20B8",
        name: "KZT"
    },
    search: {
        limit: 4
    },
    dashboard: {
        cards: [
            {
                id: "S",
                title: "Budget",
                value: 0,
                indicatorState: "A"
            },
            {
                id: "D",
                title: "Debt",
                value: 0,
                indicatorState: "A"
            },
            {
                id: "TC",
                title: "Total Costs",
                value: 0,
                indicatorState: "A"
            },
            {
                id: "B",
                title: "Bank",
                value: 0,
                indicatorState: "A"
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