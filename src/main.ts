import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Lucas' Kitchen";
const buttonName = "🍲Click to cook!";
const buttons: HTMLButtonElement[] = [];
let increasePerSecond: number = 0; // Number to increase
const buttonItemMap = new Map<HTMLButtonElement, Item>(); // SOURCE: https://howtodoinjava.com/typescript/maps/

document.title = gameName;

// Creating new item interface
interface Item {
  name: string;
  cost: number;
  units_bought: number;
  increase_per: number;
  description: string;
}

// Creating new item array
const availableItems: Item[] = [
  {
    name: "Customer👨🏽",
    cost: 10,
    units_bought: 0,
    increase_per: 0.1,
    description: "Fueling the economy.",
  },
  {
    name: "Chef👨🏿‍🍳",
    cost: 100,
    units_bought: 0,
    increase_per: 2,
    description: "A culinary master.",
  },
  {
    name: "Manager🕴🏻",
    cost: 1000,
    units_bought: 0,
    increase_per: 50,
    description: "Does he actually do any work?",
  },
  {
    name: "Delivery Service🚚",
    cost: 10000,
    units_bought: 0,
    increase_per: 1000,
    description: "Like doordash, but better.",
  },
  {
    name: "Franchising🏪",
    cost: 100000,
    units_bought: 0,
    increase_per: 20000,
    description: "More is better, right?",
  },
];

// GAME TITLE CREATION
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// MEALS CREATED COUNTER CREATION
let total_meals: number = 0;
const count = document.createElement("div");
count.style.fontSize = "2em";
count.innerHTML = total_meals + " Meals Created!";
app.append(count);

// MEALS PER SECOND COUNTER CREATION
const mps_count = document.createElement("div");
mps_count.style.fontSize = "1em";
mps_count.innerHTML = increasePerSecond.toFixed(2) + " meals per second";
app.append(mps_count);

// gain button creation
const button = document.createElement("button");
button.textContent = buttonName;
app.append(button);

// new spacer division
const spacer = document.createElement("div");
spacer.style.clear = "both";
app.append(spacer);

// used on items to create upgrade buttons
function createUpgradeButton(item: Item): void {
  const newButton = document.createElement("button");
  newButton.innerHTML =
    item.name +
    "<br>" +
    item.description +
    "<br><span style='font-size: 0.5em;'>cost: " +
    item.cost.toFixed(2) +
    " | Owned: " +
    item.units_bought +
    " | mps: " +
    item.increase_per +
    "</span>";
  buttonItemMap.set(newButton, item);
  newButton.addEventListener("click", () => {
    total_meals -= item.cost;
    increasePerSecond += item.increase_per;
    item.cost *= 1.15;
    item.units_bought += 1;
    newButton.innerHTML =
      item.name +
      "<br>" +
      item.description +
      "<br><span style='font-size: 0.5em;'>cost: " +
      item.cost.toFixed(2) +
      " | Owned: " +
      item.units_bought +
      " | mps: " +
      item.increase_per +
      "</span>";
    updateCounter();
  });
  app.appendChild(newButton);
  buttons.push(newButton);
}

// create upgrade buttons
availableItems.forEach((item) => {
  createUpgradeButton(item);
});

// counter gain logic/updating
const gain_per_click: number = 1;
button.addEventListener("click", () => {
  updateCounter();
});

// counter updating function
function updateCounter() {
  total_meals += gain_per_click;
  count.innerHTML = total_meals + " Meals Created!";
}
// button update checking function
function updateButtonStates() {
  buttons.forEach((button) => {
    const buttonItem = buttonItemMap.get(button);
    if (buttonItem) {
      if (buttonItem.cost > total_meals) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    }
  });
}
// automatic counter
function automaticCounter() {
  let lastTimestamp = performance.now() / 1000; // Initial timestamp
  function increaseCounter() {
    // hijacking counter to do button enable/disable
    updateButtonStates();
    // and mps counter
    mps_count.innerHTML = increasePerSecond.toFixed(2) + " meals per second";
    const currentTimestamp = performance.now() / 1000; // Latest timestamp
    const deltaTime = currentTimestamp - lastTimestamp; // Difference
    total_meals += increasePerSecond * deltaTime; // Fraction to increase by
    count.innerHTML = total_meals.toFixed(2) + " Meals Created!";
    lastTimestamp = currentTimestamp;
    requestAnimationFrame(increaseCounter);
  }
  requestAnimationFrame(increaseCounter);
}
automaticCounter();
