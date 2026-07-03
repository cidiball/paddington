fetch("data.json")
.then(r => r.json())
.then(data => {

    const fmt = n => n == null ? "—" : "$" + n.toLocaleString();

    document.getElementById("address").textContent =
        `${data.property.name}, ${data.property.city}, ${data.property.state}`;

    document.getElementById("updated").textContent =
        "Last Updated: " + data.lastUpdated;

    const names = {
        realtor: "Realtor.com",
        redfin: "Redfin",
        zillow: "Zillow",
        trulia: "Trulia",
        homes: "Homes.com"
    };

    let total = 0;
    let count = 0;

    const tbody = document.getElementById("rows");
    tbody.innerHTML = "";

    Object.keys(names).forEach(key => {

        const value = data.values[key];

        if (value != null) {
            total += value;
            count++;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${names[key]}</td>
            <td>${fmt(value)}</td>
        `;

        tbody.appendChild(row);

    });

    const average = Math.round(total / count);

    document.getElementById("avg").textContent = fmt(average);
    document.getElementById("avg2").textContent = fmt(average);

});
