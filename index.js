const colors = ["black", "white", "blue", "red", "yellow", "brown", "pink", "lime"];
const canvaSizeSelections = [10, 15, 20, 25];

let gridSize = 10;
let mousePressed = false;
let drawColor;
let selectedColor;

initPalette();
initButtons();
drawGrid(gridSize);
addCanvaListeners();
setDrawColor("red");

function addCanvaListeners() {
  const cell = document.querySelectorAll("td");
  for (const n of cell) {
    n.addEventListener("click", () => {
      n.style.background = drawColor;
      mousePressed = false;
    });
    n.addEventListener("mouseover", () => {
      console.log("mouseover");
      if (mousePressed) n.style.background = drawColor;
    });
    n.addEventListener("mousedown", (e) => {
      console.log("mousedown");
      console.log(drawColor);
      console.log(selectedColor);
      switch (e.button) {
        case 0:
          drawColor = selectedColor;
          n.style.background = drawColor;
          break;
        case 2:
          drawColor = "white";
          n.style.background = drawColor;
          break;
        default:
          console.log("nothing");
      }
      console.log(e.button);

      mousePressed = !mousePressed;
    });
    n.addEventListener("mouseup", () => {
      mousePressed = !mousePressed;
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
  const colorPalette = document.getElementById("color-palette");
  for (const single of colors) {
    const div = colorPalette.insertBefore(document.createElement("div"), document.querySelector(".selected"));
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
      addCanvaListeners();
    });
  }
}

function setDrawColor(color) {
  drawColor = color;
  selectedColor = color;
  document.querySelector(".selected").style.background = color;
}
