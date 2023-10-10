import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Lucas' Kitchen";
const buttonName = "🍲";

document.title = gameName;

// header creation
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// button creation
const button = document.createElement("button");
button.textContent = buttonName;
app.append(button);