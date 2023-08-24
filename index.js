const colors = ["black", "white", "blue", "red", "yellow", "brown", "pink", "lime"];
const canvaSizeSelections = [10, 15, 20, 25];

let gridSize = 20;
let mousePressed = false;
let drawColor;
let selectedColor;

initPalette();
initButtons();
drawGrid(gridSize);
addListeners();
setDrawColor("red");

function addListeners() {
  document.addEventListener("mousedown", (e) => {
    mousePressed = true;
    console.log("mousedown");
  });
  document.addEventListener("mouseup", () => {
    console.log("mouseup");
    mousePressed = false;
  });

  const cell = document.querySelectorAll("td");
  for (const n of cell) {
    n.addEventListener("click", (e) => {
      n.style.background = drawColor;
      mousePressed = false;
    });
    n.addEventListener("mouseover", () => {
      if (mousePressed) n.style.background = drawColor;
    });
    n.addEventListener("mousedown", (e) => {
      mousePressed = false;
      switch (e.button) {
        case 0:
          drawColor = selectedColor;
          n.style.background = drawColor;
          mousePressed = true;
          break;
        case 2:
          drawColor = "white";
          n.style.background = drawColor;
          mousePressed = true;
          break;
        default:
          console.log("unused mouse button pressed");
          break;
      }
    });
    n.addEventListener("mouseup", () => {
      mousePressed = false;
    });
  }
}

function drawGrid() {
  const table = document.getElementById("canva");
  for (let i = 0; i < gridSize; i++) {
    const tableRow = table.appendChild(document.createElement("tr"));
    for (let i = 0; i < gridSize; i++) {
      const cell = tableRow.appendChild(document.createElement("td"));
      //cell.setAttribute("draggable", "true");
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
  const colorPalette = document.querySelector(".colors");
  for (const single of colors) {
    const div = colorPalette.appendChild(document.createElement("div"));
    div.classList.add(single);
    document.querySelector("." + single).addEventListener("click", () => {
      selectedColor = single;
      setDrawColor(single);
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
      addListeners();
    });
  }
}

function setDrawColor(color) {
  drawColor = color;
  selectedColor = color;
  document.querySelector(".selected").style.background = color;
}
