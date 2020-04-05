var game = {
    money: 0,
    earnedSoFar: 0,
    entireCPS: 0,
    coinsOnClick: 1,
    buildings: [{
        name: "Pit Fire",
        CPS: 0.2,
        ESF: 0,
        owned: 0,
        cost: 16
    }, {
        name: "Anvil",
        CPS: 1,
        ESF: 0,
        owned: 0,
        cost: 140
    }, {
        name: "Smelter",
        CPS: 8,
        ESF: 0,
        owned: 0,
        cost: 1150
    }, {
        name: "Bellows",
        CPS: 14,
        ESF: 0,
        owned: 0,
        cost: 3700
    }, {
        name: "Clay Furnace",
        CPS: 24,
        ESF: 0,
        owned: 0,
        cost: 12000
    }, {
        name: "Well",
        CPS: 45,
        ESF: 0,
        owned: 0,
        cost: 21000
    }, {
        name: "Smithy",
        CPS: 96,
        ESF: 0,
        owned: 0,
        cost: 155000
    }, {
        name: "Trading center",
        CPS: 130,
        ESF: 0,
        owned: 0,
        cost: 940340
    }, {
        name: "Market",
        CPS: 300,
        ESF: 0,
        owned: 0,
        cost: 1690000
    }, {
        name: "Chili",
        CPS: 1000,
        ESF: 0,
        owned: 0,
        cost: 12000000
    }]
    //upgrades: [{
    //    name: "Iron Dagger",
    //    desc: "There's no such thing as a blacksmith who hasn't made too many daggers.",
    //    prerequisiteDesc: "",
    //    addToClick: 0,
    //    multToClick: 0.02,
    //    addToCPS: 0,
    //    multToCPS: 0.02,
    //    discountBuilds: 0,
    //    owned: 0,
    //    limit: -1,
    //    cost: 100,
    //    prerequisite: function() {
    //        var stat = "";
    //        if (this.owned !== 0) {
    //            stat = game.buildings[1].owned + "/" + this.owned * 2 + " needed";
    //        }
    //        return [game.buildings[1].owned >= this.owned * 2, stat];
    //    }
    //}]
};

function toHundredth(num) {
    return parseFloat(Math.round(num * 100) / 100);
}

function calcBuildingCost(ID, speculateOwned = game.buildings[ID].owned) {
    return game.buildings[ID].cost + Math.ceil(0.15 * Math.pow(speculateOwned, 2) * game.buildings[ID].cost * 0.125);
}
//function calcUpgradeCost(ID, speculateOwned = game.upgrades[ID].owned) {
//    return game.buildings[ID].cost + Math.ceil(0.12 * Math.pow(speculateOwned, 2) * game.buildings[ID].cost * 0.4);
//}
function getAmountToBuy() {
    if (!document.getElementById("amountToBuy").value) {
        return 1;
    }
    if (document.getElementById("amountToBuy").value < 1) {
        document.getElementById("amountToBuy").value = 1;
    }
    return document.getElementById("amountToBuy").value;
}

function buildingsCanBuy(ID, amount, would = false) {
    var speculateCanBuy = 0;
    var speculateOwned = game.buildings[ID].owned;
    var totalCost = 0;
    if (!would) {
        var availableMoney = Math.round(game.money);
        for (i = amount; i != 0; i--) {
            if (availableMoney - calcBuildingCost(ID, speculateOwned) >= 0) {
                availableMoney -= calcBuildingCost(ID, speculateOwned);
                totalCost += calcBuildingCost(ID, speculateOwned);
                speculateOwned++;
                speculateCanBuy++;
            }
            else {
                break;
            }
        }
    }
    else {
        for (j = amount; j != 0; j--) {
            totalCost += calcBuildingCost(ID, speculateOwned);
            speculateOwned++;
            speculateCanBuy++;
        }
    }
    return [speculateCanBuy, totalCost];
}

function updateDisplay() {
    document.getElementById("money").textContent = Math.round(game.money);
    document.getElementById("earnedSoFar").textContent = Math.round(game.earnedSoFar);
    document.getElementById("entireCPS").textContent = toHundredth(game.entireCPS);
    for (k = 0; k < game.buildings.length; k++) {
        document.getElementById(k + "name").textContent = game.buildings[k].name;
        document.getElementById(k + "cost").textContent = buildingsCanBuy(k, getAmountToBuy(), true)[1] + " (For " + buildingsCanBuy(k, getAmountToBuy(), true)[0] + ")";
        document.getElementById(k + "owned").textContent = game.buildings[k].owned;
        document.getElementById(k + "CPS").textContent = game.buildings[k].CPS;
        document.getElementById(k + "totalCPS").textContent = toHundredth(game.buildings[k].CPS * game.buildings[k].owned);
        document.getElementById(k + "ESF").textContent = Math.round(game.buildings[k].ESF);
    }
}

function initialize() {
    var coll = document.getElementsByClassName("collapsible");
    for (colID = 0; colID < coll.length; colID++) {
        coll[colID].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display == "block") {
                content.style.display = "none";
            }
            else {
                content.style.display = "block";
            }
        });
    }
}

function tick() {
    game.entireCPS = 0;
    for (e = 0; e < game.buildings.length; e++) {
        game.money += game.buildings[e].owned * game.buildings[e].CPS / 40;
        game.earnedSoFar += game.buildings[e].owned * game.buildings[e].CPS / 40;
        game.buildings[e].ESF += game.buildings[e].owned * game.buildings[e].CPS / 40;
        game.entireCPS += game.buildings[e].owned * game.buildings[e].CPS;
    }
    if (getAmountToBuy() > 100000) {
        document.getElementById("amountToBuy").value = "100000";
    }
    updateDisplay();
}

function gatherMoney() {
    game.money += game.coinsOnClick;
    game.earnedSoFar += game.coinsOnClick;
    updateDisplay();
}

function buyBuilding(ID) {
    if (getAmountToBuy() == 1) {
        document.getElementById("amountToBuy").value = 1;
    }
    var cost = buildingsCanBuy(ID, getAmountToBuy())[1];
    var amnt = buildingsCanBuy(ID, getAmountToBuy())[0];
    game.money -= cost;
    game.buildings[ID].owned += amnt;
    updateDisplay();
}
window.setInterval(function() {
    tick();
}, 25);
