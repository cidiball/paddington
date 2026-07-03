fetch("data.json")
  .then(r => r.json())
  .then(data => {
    console.log("Property data loaded.", data);
  });

fetch("history.json")
  .then(r => r.json())
  .then(history => {
    console.log("History loaded.", history);
  });
