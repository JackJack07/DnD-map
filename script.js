const grid = document.querySelector('.grid');
const rows = 10;
const cols = 10;

for (let i = 0; i < rows * cols; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  grid.appendChild(tile);
}

