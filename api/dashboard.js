import { _format } from "@/util/formatter"
import { timeout, generateID } from "@/util/processHelper";

const Budget = {
    currentMonth: {
        inStock: 42125,
        inCome: 66230
    }
}

const Dashboard = {
    cards: [
        {
            id: "",
            title: "Budget",
            value: Budget.currentMonth.inStock,
            indicatorState: "A"
        },
        {
            id: "",
            title: "Debt",
            value: 0,
            indicatorState: "A"
        },
        {
            id: "",
            title: "Total Costs",
            value: -756884,
            indicatorState: "A"
        },
        {
            id: "",
            title: "Bank",
            value: 2804,
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
                income: _format(Budget.currentMonth.inCome, "0,0")
            }
        }
    },
    options: {
        currency: "KZT"
    }
}

const Service = {
    calcCostsInPercent() {
        let costs = Budget.currentMonth.inCome - Budget.currentMonth.inStock;
        let percent = (costs * 100) / Budget.currentMonth.inCome;
        return Math.round(percent);
    },
    setUpCards(){
        Dashboard.cards.forEach((item, index) => {
            if (!item.id) item.id = generateID();
            if (item.title != "Total Costs") {
                if (item.value > 0) Dashboard.cards[index]["indicatorState"] = "G";
                else if (item.value < 0) Dashboard.cards[index]["indicatorState"] = "R";
            }
        })
    },
    setUpStat(){
        let costsInPercent = this.calcCostsInPercent(); 
        Dashboard.stat.expenditures.month.percentBalance = costsInPercent;
        Dashboard.stat.expenditures.month.subTitle = costsInPercent + " %";
    },
    async getDashboard() {
        await timeout(); // Response Imitation
        this.setUpCards();
        this.setUpStat();
        return Dashboard;
    }
}

export default Service;