function calculateImpact() {
    let customers = Number(document.getElementById("customers").value);
    let orderValue = Number(document.getElementById("orderValue").value);
    let downtimeMinutes = Number(document.getElementById("downtime").value);

    let downtimeHours = downtimeMinutes / 60;
    let revenueLost = customers * orderValue * downtimeHours;

    let impactLevel = "Low";
    if (revenueLost > 200000) impactLevel = "High";
    else if (revenueLost > 80000) impactLevel = "Medium";

    localStorage.setItem("revenue", revenueLost);
    localStorage.setItem("impact", impactLevel);
    localStorage.setItem("customers", customers);
    localStorage.setItem("orderValue", orderValue);
    localStorage.setItem("downtime", downtimeMinutes);

    window.location.href = "result.html";
}


if (window.location.pathname.includes("result.html")) {
    let revenue = localStorage.getItem("revenue");
    let impact = localStorage.getItem("impact");

    document.getElementById("revenue").innerText = "₹ " + Number(revenue).toLocaleString();

    let badge = document.getElementById("impactBadge");
    badge.className = "badge " + impact.toLowerCase();
    badge.innerText = impact + " Impact";

    document.getElementById("customersStat").innerText = localStorage.getItem("customers");
    document.getElementById("orderStat").innerText = "₹ " + localStorage.getItem("orderValue");
    document.getElementById("downtimeStat").innerText = localStorage.getItem("downtime") + " mins";

    let suggestion =
        impact === "High"
            ? "Immediate action required. Improve redundancy and alerting."
            : impact === "Medium"
            ? "Improve monitoring and consider partial redundancy."
            : "Monitor the system and schedule fixes during low traffic hours.";

    document.getElementById("suggestions").innerText = suggestion;
}
