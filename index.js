//import Cab from "/drawColors.js";

const colors = ["black", "white", "blue", "red", "orange", "yellow", "green", "brown", "chocolate", "pink", "lime"];

initColors();

const drawGrid = (size) => {
  const table = document.getElementById("draw-grid");
  for (let i = 0; i < size; i++) {
    const tableRow = table.appendChild(document.createElement("tr"));
    for (let i = 0; i < size; i++) {
      tableRow.appendChild(document.createElement("td"));
    }
  }
};

let gridSize = 10;
let mousePressed = false;
let drawColor = "red";

drawGrid(gridSize);

const cell = document.querySelectorAll("td");

for (const n of cell) {
  n.addEventListener("click", () => {
    n.style.background = drawColor;
    mousePressed = !mousePressed;
  });
  n.addEventListener("mouseover", () => {
    if (mousePressed) n.style.background = drawColor;
    console.log(mousePressed);
  });
  n.addEventListener("mousedown", () => {
    mousePressed = !mousePressed;
    console.log("mouseDown");
  });
  n.addEventListener("mouseup", () => {
    mousePressed = !mousePressed;
    console.log("mouseUp");
  });
}

function initColors() {
  const colorPallet = document.getElementById("colors");
  for (const single of colors) {
    const div = colorPallet.appendChild(document.createElement("div"));
    div.classList.add(single);
    document.querySelector("." + single).addEventListener("click", () => {
      drawColor = single;
    });
  }
}
