const ACTIVITY_GROUPS = {
    "R": "Replenishment", "E": "Expense"
}

const ACTIVITY_TYPES = {
    "Funds withdrawal": {
        color: 'light-green',
        icon: 'payment',
        text: "Funds withdrawal"
    },
    "Debt coming": {
        color: 'green',
        icon: 'assignment_returned',
        text: "Debt coming"
    },
    "Donations": {
        color: 'orange accent-1',
        icon: 'monetization_on',
        text: "Debt coming"
    },
    "Market": {
        color: 'light-blue lighten-3',
        icon: 'shopping_cart',
        text: "Market"
    },
    "Basket": {
        color: 'blue-grey darken-2',
        icon: 'shopping_cart',
        text: "Basket"
    },
    "Stationery": {
        color: 'brown lighten-2',
        icon: 'book',
        text: "Stationery"
    },
    "Smoke": {
        color: 'blue grey darken-2',
        icon: 'smoking_rooms',
        text: "Smoke"
    },
    "Issuance of debt": {
        color: 'deep orange lighten-2',
        icon: 'assignment_late',
        text: "Issuance of debt"
    },
    "Deposit Payment":{
        color: 'green darken-2',
        icon: 'card_travel',
        text: "Deposit Payment"
    },
    "Utilities":{
        color: 'blue grey darken-3',
        icon: 'home',
        text: "Utilities"
    }
}

export {
    ACTIVITY_GROUPS,
    ACTIVITY_TYPES
}