const ACTIVITY_GROUPS = {
    R: "R", E: "E"
}

const ACTIVITY_TYPES = {
    "Funds withdrawal": {
        group: ACTIVITY_GROUPS.R,
        color: 'light-green',
        icon: 'payment',
        text: "Funds withdrawal"
    },
    "Debt coming": {
        group: ACTIVITY_GROUPS.R,
        color: 'green',
        icon: 'assignment_returned',
        text: "Debt coming"
    },
    "Deposit Payment":{
        group: ACTIVITY_GROUPS.R,
        color: 'green darken-2',
        icon: 'card_travel',
        text: "Deposit Payment"
    },
    "Donations": {
        group: ACTIVITY_GROUPS.R,
        color: 'orange accent-1',
        icon: 'monetization_on',
        text: "Donations"
    },
    "Market": {
        group: ACTIVITY_GROUPS.E,
        color: 'light-blue lighten-3',
        icon: 'shopping_cart',
        text: "Market"
    },
    "Basket": {
        group: ACTIVITY_GROUPS.E,
        color: 'blue-grey darken-2',
        icon: 'shopping_basket',
        text: "Basket"
    },
    "Stationery": {
        group: ACTIVITY_GROUPS.E,
        color: 'brown lighten-2',
        icon: 'book',
        text: "Stationery"
    },
    "Smoke": {
        group: ACTIVITY_GROUPS.E,
        color: 'blue grey darken-2',
        icon: 'smoking_rooms',
        text: "Smoke"
    },
    "Issuance of debt": {
        group: ACTIVITY_GROUPS.E,
        color: 'deep orange lighten-2',
        icon: 'assignment_late',
        text: "Issuance of debt"
    },    
    "Utilities":{
        group: ACTIVITY_GROUPS.E,
        color: 'blue grey darken-3',
        icon: 'home',
        text: "Utilities"
    }
}

export {
    ACTIVITY_GROUPS,
    ACTIVITY_TYPES
}