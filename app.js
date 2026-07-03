// Property Value Tracker

const money = n => n == null ? "—" : "$" + Number(n).toLocaleString();

async function loadDashboard() {

  const data = await fetch("data.json").then(r => r.json());
  const history = await fetch("history.json").then(r => r.json());

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

  for (const key in labels) {

    const value = data.values[key];

    if (value !== null) {
      total += value;
      count++;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${labels[key]}</td>
      <td>${money(value)}</td>
    `;

    tbody.appendChild(row);

  }

  const average = Math.round(total / count);

  document.getElementById("avg").textContent = money(average);
  document.getElementById("avg2").textContent = money(average);

  if (typeof Chart !== "undefined" && history.length > 0) {

    const ctx = document.getElementById("historyChart");

    new Chart(ctx, {

      type: "line",

      data: {

        labels: history.map(item => item.date),

        datasets: [{

          label: "Average Value",

          data: history.map(item => item.average),

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

loadDashboard().catch(error => {

  console.error(error);

  alert(error);

});
