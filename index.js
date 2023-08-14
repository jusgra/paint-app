const colors = ["black", "white", "blue", "red", "orange", "yellow", "green", "brown", "chocolate", "pink", "lime"];
const canvaSizeSelections = [10, 15, 20, 25];

let gridSize = 10;
let mousePressed = false;
let drawColor = "red";

initPalette();
initButtons();
drawGrid(gridSize);
addCanvaListeners();

function addCanvaListeners() {
  const cell = document.querySelectorAll("td");
  for (const n of cell) {
    n.addEventListener("click", () => {
      console.log(mousePressed);
      n.style.background = drawColor;
    });
    n.addEventListener("mouseover", () => {
      if (mousePressed) n.style.background = drawColor;
      console.log(mousePressed);
    });
    n.addEventListener("mousedown", () => {
      n.style.background = drawColor;

      mousePressed = !mousePressed;
    });
    n.addEventListener("mouseup", () => {
      mousePressed = !mousePressed;
    });
  }
}

function drawGrid() {
  console.log(gridSize);
  const table = document.getElementById("canva");
  for (let i = 0; i < gridSize; i++) {
    const tableRow = table.appendChild(document.createElement("tr"));
    for (let i = 0; i < gridSize; i++) {
      tableRow.appendChild(document.createElement("td"));
    }
  }
}

function eraseGrid() {
  const canva = document.getElementById("canva");
  for (let i = 0; i < gridSize; i++) {
    canva.removeChild(canva.firstChild);
  }
}

function initPalette() {
  const colorPalette = document.getElementById("color-palette");
  for (const single of colors) {
    const div = colorPalette.appendChild(document.createElement("div"));
    div.classList.add(single);
    document.querySelector("." + single).addEventListener("click", () => {
      drawColor = single;
    });
  }
}

function initButtons() {
  const buttonsDiv = document.getElementById("buttons");
  for (let i = 0; i < canvaSizeSelections.length; i++) {
    const singleButton = buttonsDiv.appendChild(document.createElement("button"));

    singleButton.textContent = canvaSizeSelections[i] + "x" + canvaSizeSelections[i];
    singleButton.addEventListener("click", () => {
      eraseGrid();
      gridSize = canvaSizeSelections[i];
      drawGrid();
      addCanvaListeners();
    });
  }
}
