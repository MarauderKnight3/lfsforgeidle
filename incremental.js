//Money 

var money = 0;
var timer = window.setInterval(function () { tick() }, 1000);

function gatherMoney() {
    money = money + 1;
    document.getElementById("money").innerHTML = money;
}

function tick() {
    money++;
    document.getElementById("money").innerHTML = money;
    money = money + (building1Qty * building1PerSec);
}

//Buildings

var building1Name = "Novice Forge"
var building1Cost = 50;
var building1PerSec = 10;
var building1Qty = 0;

var building2Name = "Adept Forge"
var building2Cost = 100;
var building2PerSec = 50;
var building2Qty = 0;

//NoviceForge

function buyNoviceForge() {
    if (money >= building1Cost) {
        money = money - building1Cost;
        building1Qty = building1Qty + 1;
        document.getElementById("money").innerHTML = money;
        document.getElementById("building1Qty").innerHTML = building1Qty;
    }
}

//Adept Forge

function buyAdeptForge() {
    if (money >= building2Cost) {
        money = money - building1Cost;
        building2Qty = building2Qty + 1;
        document.getElementById("money").innerHTML = money;
        document.getElementById("building2Qty").innerHTML = building2Qty;
    }
}
