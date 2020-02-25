var iteration = window.setInterval(function () {
    tick()
}, 40);
var money = 0;
var earnedSoFar = 0;
var entireCPS = 0;

//To add another building, you MUST add another building data set into the buildings array with its stats. This can simply be done by copying an object {...} below and editing the stats. See the JSON to add in said building's place in the table on the site.
var buildings = [{
        name: "Novice Forge",
        CPS: 0.2,
        ESF: 0,
        owned: 0,
        cost: 10
    }, {
        name: "Adept Forge",
        CPS: 3,
        ESF: 0,
        owned: 0,
        cost: 100,
    }, {
        name: "Great Forge",
        CPS: 12,
        ESF: 0,
        owned: 0,
        cost: 220
    }, {
        name: "Diehard Forge",
        CPS: 30,
        ESF: 0,
        owned: 0,
        cost: 590
    }
];

function correctRound(num) {
    return parseFloat(Math.round(num * 100) / 100);
}

function updateDisplay() {
    document.getElementById("money").innerHTML = Math.round(money);
    document.getElementById("earnedSoFar").innerHTML = Math.round(earnedSoFar);
    document.getElementById("entireCPS").innerHTML = correctRound(entireCPS);
    for (i = 0; i <= buildings.length - 1; i++) {
        document.getElementById(i + "name").innerHTML = buildings[i].name;
        document.getElementById(i + "cost").innerHTML = "(Costs " + findAmountCanBuy(parseInt(i), getAmountToBuy(), true)[1] + " for " + findAmountCanBuy(parseInt(i), getAmountToBuy(), true)[0] + ")";
        document.getElementById(i + "owned").innerHTML = buildings[i].owned;
        document.getElementById(i + "CPS").innerHTML = buildings[i].CPS;
        document.getElementById(i + "totalCPS").innerHTML = correctRound(buildings[i].CPS * buildings[i].owned);
        document.getElementById(i + "ESF").innerHTML = Math.round(buildings[i].ESF);
    }
}

function findCost(ID) {
    return buildings[ID].cost + Math.ceil((0.15 * Math.pow(buildings[ID].owned, 2)) * (buildings[ID].cost / 8));
}

function getAmountToBuy() {
    if (!document.getElementById("amountToBuy").value) {
        return 1;
    }
    if (isNaN(parseInt(document.getElementById("amountToBuy").value))) {
        return 1;
    } else {
        return parseInt(document.getElementById("amountToBuy").value)
    }
}

function findAmountCanBuy(ID, amount, would) {
    var amountSoFar = 0;
    var speculateOwned = buildings[ID].owned;
    var monie = Math.round(money);
    var totalCost = 0;
    if (!would) {
        for (j = amount; j > 0; j--) {
            if (monie - (buildings[ID].cost + Math.ceil((0.15 * Math.pow(speculateOwned, 2)) * (buildings[ID].cost / 8))) >= 0) {
                monie -= buildings[ID].cost + Math.ceil((0.15 * Math.pow(speculateOwned, 2)) * (buildings[ID].cost / 8));
                totalCost += buildings[ID].cost + Math.ceil((0.15 * Math.pow(speculateOwned, 2)) * (buildings[ID].cost / 8));
                speculateOwned++;
                amountSoFar++;
            } else {
                break;
            }
        }
    } else {
        for (j = amount; j > 0; j--) {
            totalCost += buildings[ID].cost + Math.ceil((0.15 * Math.pow(speculateOwned, 2)) * (buildings[ID].cost / 8));
            speculateOwned++;
            amountSoFar++;
        }
    }
    return [amountSoFar, totalCost];
}

function initialize() {
    money = 0;
    updateDisplay();
}

function tick() {
    entireCPS = 0;
    for (i = 0; i < buildings.length; i++) {
        money += buildings[i].owned * buildings[i].CPS / 25;
        earnedSoFar += buildings[i].owned * buildings[i].CPS / 25;
        entireCPS += buildings[i].owned * buildings[i].CPS;
        buildings[i].ESF += buildings[i].owned * buildings[i].CPS / 25;
    }
    if (getAmountToBuy() > 100000)
        document.getElementById("amountToBuy").value = "1000";
    updateDisplay();
}

function gatherMoney() {
    money += 1;
    earnedSoFar += 1;
    updateDisplay();
}

function buyAcquisition(ID) {
    if (getAmountToBuy(ID, getAmountToBuy()) == 1) {
        document.getElementById("amountToBuy").value = "1";
    }
    buildings[ID].owned += findAmountCanBuy(ID, getAmountToBuy(), false)[0];
    money -= findAmountCanBuy(ID, getAmountToBuy(), false)[1];
    updateDisplay();
}
