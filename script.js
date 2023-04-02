var countdownNumberEl = document.getElementById("countdown-number");
var countdown = 60;

countdownNumberEl.textContent = countdown;

setInterval(function () {
  countdown = --countdown <= 0 ? 60 : countdown;

  countdownNumberEl.textContent = countdown;
}, 1000);

function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}

(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
    document.getElementById("slider").checked = false;
  } else {
    setTheme("theme-light");
    document.getElementById("slider").checked = true;
  }
})();

let tableElement = document.getElementsByClassName("table");
tableElement = tableElement[0];

(async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/");
    if (response.status === 400) {
      throw new Error("Could not fetch");
    }
    const data = await response.json();
    let sno = 1;
    data.map((row) => {
      let rowEle = document.createElement("tr");
      rowEle.setAttribute("scope", "row");
      let text = `<td>${sno++}</td><td>${row["name"]}</td><td>₹ ${
        row["buy"]
      }</td><td>₹ ${row["sell"]}</td><td>₹ ${row["last"]}</td><td>${
        row["volume"]
      }</td><td>${row["base_unit"]}</td>`;
      rowEle.innerHTML = text;
      tableElement.appendChild(rowEle);
    });
  } catch (error) {
    console.log(error.message);
  }
})();
