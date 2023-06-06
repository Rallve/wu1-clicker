



const clickerButton = document.querySelector('#click');
const moneyTracker = document.querySelector('#money');
const mpsTracker = document.querySelector('#mps'); // money per second
const mpcTracker = document.querySelector('#mpc'); // money per click
const goldTracker = document.querySelector('#gold')
const upgradeList = document.querySelector('#upgradelist');
const msgbox = document.querySelector('#msgbox');


let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let last = 0;

var ogMPS = 0;

let achievementTest = false;


var totalClicks = 0;
clickerButton.addEventListener(
    'click',
    () => {
        // vid click öka score med 1
        totalClicks += 1;
        const slash = document.getElementById("slash");
        slash.style.opacity = 1;
        if (battleReady) {
            money += moneyPerClick;
            xpGain();
            xpSlpash();
            healthCheck();
        }
        const myTimeout = setTimeout(attack, 250);
    },
    false
);

function attack() {
    slash.style.opacity = 0;
}

/* För att driva klicker spelet så kommer vi att använda oss av en metod som heter
 * requestAnimationFrame.
 * requestAnimationFrame försöker uppdatera efter den refresh rate som användarens
 * maskin har, vanligtvis 60 gånger i sekunden.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * funktionen step används som en callback i requestanaimationframe och det är
 * denna metod som uppdaterar webbsidans text och pengarna.
 * Sist i funktionen så kallar den på sig själv igen för att fortsätta uppdatera.
 */
function step(timestamp) {
    moneyTracker.textContent = Math.round(money);
    mpsTracker.textContent = Math.round(moneyPerSecond);
    mpcTracker.textContent = moneyPerClick;
    goldTracker.textContent = gold;

    if (timestamp >= last + 1000) {
        money += moneyPerSecond;
        passiveXP();
        last = timestamp;
    }

    // exempel på hur vi kan använda värden för att skapa tex 
    // achievements. Titta dock på upgrades arrayen och gör något rimligare om du
    // vill ha achievements.
    // på samma sätt kan du även dölja uppgraderingar som inte kan köpas
    if (moneyPerClick == 10 && !achievementTest) {
        achievementTest = true;
        message('You can now crush large rocks!', 'achievement');
    }

    window.requestAnimationFrame(step);
}

/* Här använder vi en listener igen. Den här gången så lyssnar iv efter window
 * objeket och när det har laddat färdigt webbsidan(omvandlat html till dom)
 * När detta har skett så skapar vi listan med upgrades, för detta använder vi
 * en forEach loop. För varje element i arrayen upgrades så körs metoden upgradeList
 * för att skapa korten. upgradeList returnerar ett kort som vi fäster på webbsidan
 * med appendChild.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * Efter det så kallas requestAnimationFrame och spelet är igång.
 */
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    upgrades.forEach((upgrade) => {
        upgradeList.appendChild(createCard(upgrade));
    });
    window.requestAnimationFrame(step);
    battle();
});

/* En array med upgrades. Varje upgrade är ett objekt med egenskaperna name, cost
 * och amount. Önskar du ytterligare text eller en bild så går det utmärkt att
 * lägga till detta.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
 */



upgrades = [
    {
        name: 'Sharper sword',
        cost: 10,
        amount: 1,
        ogAmount: 1,
        num: 0,
    },
    {
        name: 'Martial arts training',
        cost: 100,
        amount: 10,
        ogAmount: 10,
        num: 0,
    },
    {
        name: 'Magic training',
        cost: 1000,
        amount: 100,
        ogAmount: 100,
        num: 0,
    },
];

/* createCard är en funktion som tar ett upgrade objekt som parameter och skapar
 * ett html kort för det.
 * För att skapa nya html element så används document.createElement(), elementen
 * sparas i en variabel så att vi kan manipulera dem ytterligare.
 * Vi kan lägga till klasser med classList.add() och text till elementet med
 * textcontent = 'värde'.
 * Sedan skapas en listener för kortet och i den hittar vi logiken för att köpa
 * en uppgradering.
 * Funktionen innehåller en del strängar och konkatenering av dessa, det kan göras
 * med +, variabel + 'text'
 * Sist så fäster vi kortets innehåll i kortet och returnerar elementet.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 */
function createCard(upgrade) {
    const card = document.createElement('div');
    card.classList.add('card');
    const header = document.createElement('p');
    header.classList.add('title');
    const cost = document.createElement('p');

    header.textContent = `${upgrade.name}, +${upgrade.amount} skill points per second.`;
    cost.textContent = `Buy for ${upgrade.cost} skill points.`;

    myInterval = setInterval(update, 1000);
    function update() {
        header.textContent = upgrade.name + ', +' + (Math.floor(upgrade.amount * 10)/10) + ' skill points per second.';
    }

    card.addEventListener('click', (e) => {
        if (money >= upgrade.cost) {
            buyUpgrade(upgrade, cost, header);
            upgrade.num++;
            message("You've become stronger!", "success");
        } else {
            message("You don't have enough skill points.", "warning");
        }

    });

    card.appendChild(header);
    card.appendChild(cost);
    return card;
}

function buyUpgrade(upgrade, cost, header) {
    moneyPerClick++;
    money -= upgrade.cost;
    upgrade.cost = Math.floor(upgrade.cost * 1.5);
    cost.textContent = 'Buy for ' + upgrade.cost + ' skill points.';
    header.textContent = upgrade.name + ', +' + (Math.floor(upgrade.amount * 10)/10) + ' skill points per second.';
    moneyPerSecond += upgrade.amount;
    ogMPS += upgrade.ogAmount;
}

/* Message visar hur vi kan skapa ett html element och ta bort det.
 * appendChild används för att lägga till och removeChild för att ta bort.
 * Detta görs med en timer.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
function message(text, type) {
    const p = document.createElement('p');
    p.classList.add(type);
    p.textContent = text;
    msgbox.appendChild(p);
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 2000);
}

var elem = document.getElementById("levelBar");   
var XP = 0;
console.log("Code ran!");
var nextLevel = 100;
var level = 1;
var moneyBonus = 1;

function xpGain() {
  setTimeout(frame, 10);
  function frame() {
  	XP += moneyPerClick;
    elem.style.width = ((XP/nextLevel) * 100) + '%';
    elem.textContent = Math.floor(XP) + ' / ' + nextLevel;
    levelUp();
    }
}

function passiveXP() {
    xpPerSecond = moneyPerSecond / 100; 
    XP += xpPerSecond;
    elem.style.width = ((XP/nextLevel) * 100) + '%';
    elem.textContent = Math.floor(XP) + ' / ' + nextLevel;
    levelUp();
}

function levelUp() {
    setInterval(() => {
        if (XP >= nextLevel) {
            XP = XP - nextLevel;
            level += 1;
            nextLevel = Math.floor(nextLevel * 1.5);
            moneyBonus += 0.1;
            elem.style.width = ((XP/nextLevel) * 100) + '%';
            elem.textContent = Math.floor(XP) + ' / ' + nextLevel;
            document.getElementById("text").textContent = "Level: " + level;
            upgrades.forEach(increaseAmount);
            moneyPerSecond = ogMPS * moneyBonus;
            document.getElementById("levelUpText").style.opacity = 1;
            setTimeout(() => {
                document.getElementById("levelUpText").style.opacity = 0;
            }, 2000);
        } else {
            clearInterval(null);
        }
    }, 50)
}

/*
if (XP >= nextLevel) {
    	XP = XP - nextLevel;
        level += 1;
        nextLevel = Math.floor(nextLevel * 1.5);
        moneyBonus += 0.1;
    	elem.style.width = ((XP/nextLevel) * 100) + '%';
        elem.textContent = Math.floor(XP) + ' / ' + nextLevel;
        document.getElementById("text").textContent = "Level: " + level;
        upgrades.forEach(increaseAmount);
        moneyPerSecond = ogMPS * moneyBonus;
        document.getElementById("levelUpText").style.opacity = 1;
        setTimeout(() => {
            document.getElementById("levelUpText").style.opacity = 0;
        }, 2000);
    }
*/

function increaseAmount(upgrade) {
    upgrade.amount = upgrade.ogAmount * moneyBonus;
}

function xpSlpash() {
    const exp = document.createElement("p");
    const xp = document.createTextNode("+" + moneyPerClick + " XP");
    exp.setAttribute("class", "xp");
    exp.appendChild(xp);
    document.getElementById("xpBox").appendChild(exp);

    const xpList = document.querySelectorAll(".xp");
    xpList.forEach(xpStyle);

    function xpStyle(text) {
        text.style.opacity = 1;

        var xpPos = 50;
        setInterval(xpFloat, 5);

        function xpFloat() {
            if (text.style.opacity <= 0) {
                clearInterval(null);
                text.remove();
            } else {
                xpPos--;
                text.style.opacity -= 0.005;
                text.style.top = xpPos + "px";
            }
        }
    }
}

function goldSlpash() {
    const goldP = document.createElement("p");
    const g = document.createTextNode("+" + gold + " Gold!");
    goldP.setAttribute("class", "gp");
    goldP.appendChild(g);
    document.getElementById("goldBox").appendChild(goldP);

    const goldList = document.querySelectorAll(".gp");
    goldList.forEach(goldStyle);

    function goldStyle(text) {
        text.style.opacity = 1;

        var goldPos = 50;
        setInterval(goldFloat, 5);

        function goldFloat() {
            if (text.style.opacity <= 0) {
                clearInterval(null);
                text.remove();
            } else {
                goldPos--;
                text.style.opacity -= 0.005;
                text.style.top = goldPos + "px";
            }
        }
    }
}

//------------------------------------------------------------------

var stats = document.getElementById("stats");
var statBtn = document.getElementById("statsBtn");
var statsClose = document.getElementsByClassName("stats-close")[0];
var statistics = document.getElementById("stats-text");

statBtn.onclick = function() {
    stats.style.display = "block";
    if (req.session.loggedIn) {
        console.log("You are logged in!");
    }
    statistics.innerHTML = 
    "Skill points: " + Math.round(money) + "<br>" + 
    "Epicness: " + ogMPS + " +" + Math.round((moneyBonus - 1) * 100) + "% = " + (Math.floor(moneyPerSecond * 10) / 10) + "<br>" +
    "Epicness bonus: " + Math.round((moneyBonus - 1) * 100) + "% <br>" + 
    "Strength: " + moneyPerClick + "<br>" + 
    "Level: " + level + "<br>" + 
    "Total clicks: " + totalClicks;
}

statsClose.onclick = function() {
    stats.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == stats || event.target == shop || event.target == settings) {
        stats.style.display = "none";
        shop.style.display = "none";
        settings.style.display = "none";
    }
}

//--------------------------------------------------------------------

const shop = document.getElementById("shop");
const shopBtn = document.getElementById("shopBtn");
const shopClose = document.getElementsByClassName("shop-close")[0];
const shopItems = document.getElementById("shop-text");
const strPot = document.getElementById("strPot");

var gold = 0;

shopBtn.onclick = function() {
    shop.style.display = "block";
}

shopClose.onclick = function() {
    shop.style.display = "none";
}

strPot.onclick = function() { //lägg till i en lista istället
    if (gold >= 10) {
        var strEffect = moneyPerClick;
    setTimeout(() => {
        strEffect = 0;
    }, 60000);
    }
}

//-------------------------------------------------------------------

const settings = document.getElementById("settings");
const settingsBtn = document.getElementById("settingsBtn");
const settingsClose = document.getElementsByClassName("settings-close")[0];
const settingsItems = document.getElementById("settings-text");

settingsBtn.onclick = function() {
    settings.style.display = "block";
}

settingsClose.onclick = function() {
    settings.style.display = "none";
}

//-------------------------------------------------------------------

function slimeAnim() {
    document.getElementById("slime").classList.add("slimeAnim");
    setTimeout(() => {
        document.getElementById("slime").classList.remove("slimeAnim");
    }, 1000);
}

enemies = [
    {
        name: "slime",
        health: 300,
        weight: 90,
        goldMin: 1,
        goldMax: 3,
    },
    {
        name: "infernal-slime",
        health: 5000,
        weight: 10,
        goldMin: 15,
        goldMax: 40,
    }
];

var battleReady = false;
var tempHealth = 0;
var enemInd = 0;
const enemy = document.getElementById("enemy");
function battle() {
    enemInd = randomEnemy();
    enemy.style.opacity = 1;
    tempHealth = enemies[enemInd].health;
    enemy.classList.add(enemies[enemInd].name + "-fine")
    enemy.classList.add("enter");
    setTimeout(() => {
        enemy.classList.remove("enter");
        battleReady = true;
    }, 1000);
}

function healthCheck() {
    enemy.classList.add(enemies[enemInd].name + "-hurt");
    enemy.classList.remove(enemies[enemInd].name + "-fine")
    setTimeout(() => {
        enemy.classList.remove(enemies[enemInd].name + "-hurt");
        enemy.classList.add(enemies[enemInd].name + "-fine")
    }, 100);
    if (tempHealth <= 0) {
        death();
    } else {
        tempHealth -= moneyPerClick;
        console.log(tempHealth);
        if (tempHealth <= 0) {
            death();
        }
    }
}

function death() {
    battleReady = false;
    gold += enemies[enemInd].goldMin + Math.floor(Math.random() * (1 + enemies[enemInd].goldMax - enemies[enemInd].goldMin));
    enemy.classList.add("death");
    setTimeout(() => {
        enemy.classList.remove("death");
        enemy.style.opacity = 0;
        enemy.classList.remove(enemies[enemInd].name + "-fine");
        setTimeout(() => {
            battle();
        }, 100);
    }, 500);
}

function randomEnemy() {
    const weightArray = enemies.map(a => a.weight);
    var weightTotal = 0;
    for (let i = 0; i < weightArray.length; i++) {
        weightTotal += weightArray[i];
    }
    var enemRand = Math.ceil(Math.random() * weightTotal);
    for (let i = 0; i < weightArray.length; i++) {
        if (enemRand <= enemies[i].weight) {
            return i;
        } else {
            enemRand -= enemies[i].weight;
        }
    }
}