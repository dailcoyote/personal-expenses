const Dashboard = [
    {
        id: "",
        title: "Budget",
        value: 25666,
        currency: "KZT",
        indicatorState: "A"
    },
    {
        id: "",
        title: "Debt",
        value: -6444,
        currency: "KZT",
        indicatorState: "A"
    },
    {
        id: "",
        title: "Total Costs",
        value: -756884,
        currency: "KZT",
        indicatorState: "A"
    },
    {
        id: "",
        title: "Bank",
        value: 2804,
        currency: "KZT",
        indicatorState: "A"
    }
]

const Service = {
    timeout() {
        return new Promise(resolve => setTimeout(resolve, 900));
    },
    generateID() {
        return Math.random().toString(36).substr(2, 6);
    },
    async getDashboard() {
        await this.timeout(); // Response Imitation 
        Dashboard.forEach((item, index) => {
            if(!item.id) item.id = this.generateID();
            if (item.title != "Total Costs") {
                if (item.value > 0) Dashboard[index]["indicatorState"] = "G";
                else if (item.value < 0) Dashboard[index]["indicatorState"] = "R";
            }
        })
        return Dashboard;
    }
}

export default Service;