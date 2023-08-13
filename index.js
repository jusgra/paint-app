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

document.querySelector(".black").addEventListener("click", () => {
  drawColor = "black";
});

document.querySelector(".red").addEventListener("click", () => {
  drawColor = "red";
});

document.querySelector(".blue").addEventListener("click", () => {
  drawColor = "blue";
});
