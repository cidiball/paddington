// Property Value Tracker

const money = n => n == null ? "—" : "$" + Number(n).toLocaleString();

async function loadDashboard() {

    try {

        const dataResponse = await fetch("./data.json");
        if (!dataResponse.ok) throw new Error("Unable to load data.json");
        const data = await dataResponse.json();

        const historyResponse = await fetch("./history.json");
        if (!historyResponse.ok) throw new Error("Unable to load history.json");
        const history = await historyResponse.json();

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

            if (value !== null && value !== undefined) {
                total += Number(value);
                count++;
            }

        }

        const average = Math.round(total / count);

        document.getElementById("avg").textContent = money(average);
        document.getElementById("avg2").textContent = money(average);

        if (typeof Chart !== "undefined" && Array.isArray(history) && history.length > 0) {

            const canvas = document.getElementById("historyChart");

            new Chart(canvas, {
                type: "line",
                data: {
                    labels: history.map(h => h.date),
                    datasets: [{
                        label: "Average Value",
                        data: history.map(h => h.average),
                        borderWidth: 3,
                        tension: 0.35,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });

        }

    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }

}

loadDashboard();
