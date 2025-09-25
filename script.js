const canvas = document.getElementById("hexGridCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to always fit the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", () => {
  resizeCanvas();
  drawGrid(); // redraw when window resizes
});

const hexSize = 40; // radius of the hexagon
const hexWidth = hexSize * 2;
const hexHeight = Math.sqrt(3) * hexSize;

// Draw a single hexagon
function drawHexagon(x, y, hover = false) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 3 * i;
    const currentX = x + hexSize * Math.cos(angle);
    const currentY = y + hexSize * Math.sin(angle);
    if (i === 0) ctx.moveTo(currentX, currentY);
    else ctx.lineTo(currentX, currentY);
  }
  ctx.closePath();

  // Hover highlight vs transparent fill
  ctx.fillStyle = hover ? "rgba(255, 255, 0, 0.4)" : "rgba(0,0,0,0)";
  ctx.strokeStyle = "rgba(255, 255, 0, 0.2)";
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();
}

// Create the hex grid
let gridData = [];
function createHexGrid(rows, cols) {
  gridData = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = c * hexWidth * 0.75;
      let y = r * hexHeight;

      if (c % 2 === 1) y += hexHeight / 2;

      x += hexSize;
      y += hexHeight / 2;

      gridData.push({ x, y, row: r, col: c });
    }
  }
}

// Draw all hexes
function drawGrid(hoveredHex = null) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const hex of gridData) {
    const isHovered = hoveredHex && hoveredHex.row === hex.row && hoveredHex.col === hex.col;
    drawHexagon(hex.x, hex.y, isHovered);
  }
}

// Detect mouse hover over hex
canvas.addEventListener("mousemove", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  let hovered = null;

  for (const hex of gridData) {
    const dx = mouseX - hex.x;
    const dy = mouseY - hex.y;
    if (Math.sqrt(dx * dx + dy * dy) < hexSize) {
      hovered = hex;
      break;
    }
  }
  drawGrid(hovered);
});

// Initialize grid
createHexGrid(20, 30); // adjust numbers to cover screen
drawGrid();
