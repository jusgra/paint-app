const colors = ["black", "white", "blue", "red", "yellow", "brown", "pink", "lime"];
const canvaSizeSelections = [5, 10, 15, 20];

let gridSize = 20;
let mousePressed = { button: -1, state: false };
let drawColor;
let selectedColor;

initPalette();
initButtons();
drawGrid(gridSize);
addListeners();
setDrawColor("red");

function addListeners() {
  document.addEventListener("mousedown", (e) => {
    console.log("upper msd");
    mousePressed.button = e.button;
    mousePressed.state = true;
  });
  document.addEventListener("mouseup", () => {
    console.log("upper msup");

    mousePressed.button = -1;
    mousePressed.state = false;
  });

  const cell = document.querySelectorAll("td");
  for (const n of cell) {
    n.addEventListener("mousedown", (e) => {
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
          console.log("unused mouse button pressed");
          break;
      }
    });
    n.addEventListener("mouseover", () => {
      if (mousePressed.state) {
        switch (mousePressed.button) {
          case 0:
            drawColor = selectedColor;
            n.style.background = drawColor;
            break;
          case 2:
            drawColor = "white";
            n.style.background = drawColor;
            break;
          default:
            console.log("unused mouse button pressed");
            break;
        }
      }
    });
  }
}

function drawGrid() {
  const table = document.getElementById("canva");
  for (let i = 0; i < gridSize; i++) {
    const tableRow = table.appendChild(document.createElement("tr"));
    for (let i = 0; i < gridSize; i++) {
      const cell = tableRow.appendChild(document.createElement("td"));
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
  const buttonsDiv = document.querySelector(".buttons");
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
