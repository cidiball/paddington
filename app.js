// Property Value Tracker

const money = n => n == null ? "—" : "$" + Number(n).toLocaleString();

async function loadDashboard() {

    try {

        const data = await fetch("./data.json").then(r => r.json());
        const history = await fetch("./history.json").then(r => r.json());

        document.getElementById("address").textContent =
            `${data.property.name}, ${data.property.city}, ${data.property.state}`;

        document.getElementById("updated").textContent =
            `Last Updated: ${data.lastUpdated}`;

        const labels = {
            realtor: "Realtor.com",
            redfin: "Redfin",
            zillow: "Zillow",
            trulia: "Trulia",
            homes: "Homes.com"
        };

        const tbody = document.getElementById("rows");
        tbody.innerHTML = "";

        let total = 0;
        let count = 0;

        for (const key of Object.keys(labels)) {

            const value = data.values[key];

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${labels[key]}</td>
                <td>${money(value)}</td>
            `;

            tbody.appendChild(tr);

            if (value != null) {
                total += value;
                count++;
            }

        }

        const average = Math.round(total / count);

        document.getElementById("avg").textContent = money(average);
        document.getElementById("avg2").textContent = money(average);

        // Summary cards

        document.getElementById("purchasePrice").textContent =
            money(data.purchasePrice);

        document.getElementById("mortgage").textContent =
            money(data.mortgageBalance);

        const equity = average - data.mortgageBalance;

        document.getElementById("equity").textContent =
            money(equity);

        const firstValue = history[0].average;

        const growth = ((average - firstValue) / firstValue) * 100;

        document.getElementById("growth").textContent =
            growth.toFixed(1) + "%";

        // Chart

        new Chart(document.getElementById("historyChart"), {

            type: "line",

            data: {

                labels: history.map(h => h.date),

                datasets: [{

                    data: history.map(h => h.average),

                    borderWidth: 3,

                    tension: .35,

                    fill: false

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        display: false

                    }

                }

            }

        });

    }

    catch (err) {

        console.error(err);
        alert(err.message);

    }

}

loadDashboard();
