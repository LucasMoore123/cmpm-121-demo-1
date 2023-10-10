import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Lucas' Kitchen";
const buttonName = "🍲";
const upgrade_one = "Customer👨🏽(+1 meal per second)";
let increasePerSecond: number = 0; // Number to increase

document.title = gameName;

// header creation
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// counter creation
let total_meals: number = 0;
const count = document.createElement("div");
count.style.fontSize = "2em";
count.innerHTML = total_meals + " Meals Created!";
app.append(count);

// gain button creation
const button = document.createElement("button");
button.textContent = buttonName;
app.append(button);

// upgrade button creation
const upgrade_button_one = document.createElement("button");
upgrade_button_one.textContent = upgrade_one;
app.append(upgrade_button_one);

// upgrade button onClick event
upgrade_button_one.disabled = true;
upgrade_button_one.addEventListener("click", () => {
  total_meals -= 10;
  increasePerSecond += 1;
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

// automatic counter
function automaticCounter() {
  let lastTimestamp = performance.now() / 1000; // Initial timestamp
  function increaseCounter() {
    if (total_meals < 10) {
      upgrade_button_one.disabled = true;
    } else {
      upgrade_button_one.disabled = false;
    }
    const currentTimestamp = performance.now() / 1000; // Latest timestamp
    const deltaTime = currentTimestamp - lastTimestamp; // Difference
    total_meals += increasePerSecond * deltaTime; // Fraction to increase by
    count.innerHTML = total_meals.toFixed(3) + " Meals Created!";
    lastTimestamp = currentTimestamp;
    requestAnimationFrame(increaseCounter);
  }
  requestAnimationFrame(increaseCounter);
}
automaticCounter();
