// Create grid container
const grid = document.createElement("div");
grid.classList.add("hex-grid");
document.body.appendChild(grid);

// Grid size (rows x columns)
const rows = 10;
const cols = 10;

for (let r = 0; r < rows; r++) {
  const row = document.createElement("div");
  row.classList.add("hex-row");

  for (let c = 0; c < cols; c++) {
    const hex = document.createElement("div");
    hex.classList.add("hex");
    row.appendChild(hex);
  }

  grid.appendChild(row);
}
