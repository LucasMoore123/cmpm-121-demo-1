import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Lucas' Kitchen";
const buttonName = "🍲";

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

// button creation
const button = document.createElement("button");
button.textContent = buttonName;
app.append(button);

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
  const increasePerSecond = 1; // Number to increase
  let lastTimestamp = performance.now() / 1000; // Initial timestamp
  function increaseCounter() {
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
