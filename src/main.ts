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
let counter: number = 0;
const count = document.createElement("div");
count.style.fontSize = "2em";
count.innerHTML = counter + " Meals Created!";
app.append(count);

// button creation
const button = document.createElement("button");
button.textContent = buttonName;
app.append(button);

// counter gain logic/updating
const gain: number = 1;
button.addEventListener("click", () => {
    counter = counter + gain;
    count.innerHTML = counter + " Meals Created!";
});