const gridElement = document.getElementById('grid');
const codeElement = document.getElementById('code');
const messageElement = document.getElementById('message');
let grid = Array(8).fill(0).map(() => Array(8).fill(false));

function createGrid() {
    gridElement.innerHTML = '';
    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            if (cell) cellElement.classList.add('on');
            cellElement.onclick = () => toggleCell(x, y);
            gridElement.appendChild(cellElement);
        });
    });
    updateCode();
}

function toggleCell(x, y) {
    grid[y][x] = !grid[y][x];
    createGrid();
}

function clearGrid() {
    grid = grid.map(row => row.fill(false));
    createGrid();
}

function invertGrid() {
    grid = grid.map(row => row.map(cell => !cell));
    createGrid();
}

function updateCode() {
    const dataType = document.querySelector('input[name="dataType"]:checked').value;
    let code = grid.map(row => {
        let byte = row.map(cell => (cell ? 1 : 0)).join('');
        return dataType === 'binary' ? '0b' + byte : '0x' + parseInt(byte, 2).toString(16).padStart(2, '0');
    });
    codeElement.textContent = `const uint8_t customChar[] PROGMEM = {\n    ${code.join(',\n    ')}\n};`;
}

function copyCode() {
    const code = codeElement.textContent;
    navigator.clipboard.writeText(code).then(() => {
        showMessage();
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

function showMessage() {
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 2000);
}

createGrid();