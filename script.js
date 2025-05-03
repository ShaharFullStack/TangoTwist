// Puzzle library to store generated puzzles
let puzzleLibrary = {
    easy: [],
    medium: [],
    hard: []
};

// Current puzzle reference - Initialize with a default structure rather than null
let puzzle = {
    size: 6,  // Default size
    revealed: [],
    constraints: []
};

// Current puzzle difficulty and index
let currentDifficulty = 'medium';
let currentPuzzleIndex = 0;

// Sample puzzles for each difficulty (pre-generated)
const samplePuzzles = {
    easy: [
        {
            size: 6,
            revealed: [
                [0, 0, 'sun'], [0, 3, 'moon'], [0, 5, 'sun'],
                [1, 1, 'moon'], [1, 4, 'sun'],
                [2, 0, 'moon'], [2, 2, 'sun'], [2, 5, 'moon'],
                [3, 0, 'sun'], [3, 3, 'moon'], [3, 5, 'sun'],
                [4, 1, 'sun'], [4, 4, 'moon'],
                [5, 0, 'moon'], [5, 2, 'sun'], [5, 5, 'moon']
            ],
            constraints: [
                { type: 'horizontal', row: 0, col: 1, value: '×' },
                { type: 'horizontal', row: 1, col: 2, value: '=' },
                { type: 'vertical', row: 2, col: 1, value: '×' },
                { type: 'vertical', row: 3, col: 4, value: '=' },
                { type: 'horizontal', row: 4, col: 2, value: '×' },
                { type: 'horizontal', row: 5, col: 3, value: '=' }
            ]
        },
        {
            size: 6,
            revealed: [
                [0, 1, 'sun'], [0, 4, 'moon'],
                [1, 0, 'moon'], [1, 2, 'sun'], [1, 5, 'moon'],
                [2, 1, 'moon'], [2, 3, 'sun'],
                [3, 2, 'moon'], [3, 4, 'sun'],
                [4, 0, 'sun'], [4, 3, 'moon'], [4, 5, 'sun'],
                [5, 1, 'moon'], [5, 4, 'sun']
            ],
            constraints: [
                { type: 'horizontal', row: 0, col: 2, value: '=' },
                { type: 'vertical', row: 1, col: 1, value: '×' },
                { type: 'horizontal', row: 2, col: 4, value: '×' },
                { type: 'vertical', row: 3, col: 3, value: '=' },
                { type: 'horizontal', row: 4, col: 1, value: '×' },
                { type: 'vertical', row: 4, col: 4, value: '=' }
            ]
        }
    ],
    medium: [
        {
            size: 6,
            revealed: [
                [0, 0, 'sun'], [0, 3, 'moon'],
                [1, 2, 'moon'],
                [2, 0, 'moon'], [2, 5, 'sun'],
                [3, 1, 'sun'], [3, 4, 'moon'],
                [4, 3, 'sun'],
                [5, 5, 'sun']
            ],
            constraints: [
                { type: 'horizontal', row: 0, col: 0, value: '=' },
                { type: 'vertical', row: 1, col: 2, value: '×' },
                { type: 'horizontal', row: 2, col: 2, value: '=' },
                { type: 'vertical', row: 3, col: 5, value: '×' },
                { type: 'horizontal', row: 5, col: 1, value: '=' },
                { type: 'horizontal', row: 5, col: 4, value: '×' }
            ]
        },
        {
            size: 6,
            revealed: [
                [0, 1, 'moon'], [0, 4, 'sun'],
                [1, 0, 'sun'],
                [2, 3, 'moon'], [2, 5, 'moon'],
                [3, 0, 'moon'], [3, 2, 'sun'],
                [4, 5, 'sun'],
                [5, 1, 'sun'], [5, 4, 'moon']
            ],
            constraints: [
                { type: 'vertical', row: 0, col: 2, value: '=' },
                { type: 'horizontal', row: 1, col: 3, value: '×' },
                { type: 'vertical', row: 2, col: 1, value: '×' },
                { type: 'horizontal', row: 3, col: 4, value: '=' },
                { type: 'vertical', row: 4, col: 0, value: '=' },
                { type: 'horizontal', row: 5, col: 2, value: '×' }
            ]
        }
    ],
    hard: [
        {
            size: 6,
            revealed: [
                [0, 0, 'sun'], [0, 5, 'moon'],
                [1, 2, 'moon'],
                [2, 4, 'sun'],
                [3, 1, 'sun'],
                [4, 3, 'moon'],
                [5, 0, 'moon'], [5, 5, 'sun']
            ],
            constraints: [
                { type: 'horizontal', row: 0, col: 2, value: '=' },
                { type: 'vertical', row: 0, col: 3, value: '×' },
                { type: 'horizontal', row: 1, col: 4, value: '×' },
                { type: 'vertical', row: 2, col: 1, value: '=' },
                { type: 'horizontal', row: 3, col: 2, value: '×' },
                { type: 'vertical', row: 4, col: 0, value: '=' },
                { type: 'horizontal', row: 5, col: 2, value: '=' }
            ]
        },
        {
            size: 6,
            revealed: [
                [0, 2, 'sun'],
                [1, 0, 'moon'], [1, 5, 'sun'],
                [2, 3, 'moon'],
                [3, 2, 'sun'],
                [4, 0, 'sun'], [4, 5, 'moon'],
                [5, 3, 'sun']
            ],
            constraints: [
                { type: 'vertical', row: 0, col: 1, value: '×' },
                { type: 'horizontal', row: 1, col: 2, value: '=' },
                { type: 'vertical', row: 2, col: 0, value: '=' },
                { type: 'horizontal', row: 2, col: 4, value: '×' },
                { type: 'vertical', row: 3, col: 4, value: '=' },
                { type: 'horizontal', row: 4, col: 1, value: '×' },
                { type: 'vertical', row: 4, col: 3, value: '×' }
            ]
        }
    ]
};

// Game state - Initialize with empty grid first, will be properly set up later
let gameState = {
    grid: [],  // Initialize as empty array first
    hintsUsed: 0,
    moves: 0,
    startTime: null,
    elapsedTime: 0,
    timerInterval: null,
    isGameWon: false,
    darkMode: false
};

// DOM elements - These will be initialized after the DOM is loaded
let timerElement;
let movesCounter;
let hintsCounter;
let progressCounter;
let tooltip;

// Initialize the puzzle
function initializePuzzle() {
    // Initialize grid state with revealed cells
    for (const [r, c, symbol] of puzzle.revealed) {
        gameState.grid[r][c] = symbol;
    }

    // Set up the grid layout
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';

    let columns = '';
    let rows = '';
    for (let i = 0; i < puzzle.size; i++) {
        columns += `var(--cell-size) `;
        if (i < puzzle.size - 1) columns += `var(--constraint-size) `;
        rows += `var(--cell-size) `;
        if (i < puzzle.size - 1) rows += `var(--constraint-size) `;
    }
    gridContainer.style.gridTemplateColumns = columns.trim();
    gridContainer.style.gridTemplateRows = rows.trim();

    // Generate the grid cells and constraints
    for (let r = 0; r < 2 * puzzle.size - 1; r++) {
        for (let c = 0; c < 2 * puzzle.size - 1; c++) {
            const div = document.createElement('div');
            div.style.gridRow = r + 1;
            div.style.gridColumn = c + 1;

            if (r % 2 === 0 && c % 2 === 0) {
                // Grid cell
                const gridR = r / 2;
                const gridC = c / 2;
                
                div.classList.add('grid-cell');
                div.dataset.row = gridR;
                div.dataset.col = gridC;
                
                const revealed = puzzle.revealed.find(
                    item => item[0] === gridR && item[1] === gridC
                );
                
                if (revealed) {
                    div.textContent = revealed[2] === 'sun' ? '☀️' : '🌙';
                    div.classList.add('revealed');
                    div.dataset.state = revealed[2];
                    
                    // Add data attribute for tooltips
                    div.dataset.tooltip = 'Fixed cell';
                } else {
                    div.classList.add('interactive');
                    div.dataset.state = 'empty';
                    div.addEventListener('click', handleCellClick);
                    
                    // Add data attribute for tooltips
                    div.dataset.tooltip = 'Click to place a sun or moon';
                }
                
                // Add mouseover/mouseout for tooltips
                div.addEventListener('mouseover', showTooltip);
                div.addEventListener('mouseout', hideTooltip);
            } else if (r % 2 === 0 && c % 2 === 1) {
                // Horizontal constraint
                const gridR = r / 2;
                const constraintC = (c - 1) / 2;
                const constraint = puzzle.constraints.find(
                    item => item.type === 'horizontal' &&
                            item.row === gridR &&
                            item.col === constraintC
                );
                if (constraint) {
                    div.textContent = constraint.value;
                    div.classList.add('constraint', 'horizontal-constraint');
                    div.dataset.type = 'horizontal';
                    div.dataset.row = gridR;
                    div.dataset.col = constraintC;
                    
                    // Add tooltip data
                    if (constraint.value === '=') {
                        div.dataset.tooltip = 'These cells must contain the same symbol';
                    } else {
                        div.dataset.tooltip = 'These cells must contain different symbols';
                    }
                    
                    // Add mouseover/mouseout for tooltips
                    div.addEventListener('mouseover', showTooltip);
                    div.addEventListener('mouseout', hideTooltip);
                }
            } else if (r % 2 === 1 && c % 2 === 0) {
                // Vertical constraint
                const constraintR = (r - 1) / 2;
                const gridC = c / 2;
                const constraint = puzzle.constraints.find(
                    item => item.type === 'vertical' &&
                            item.row === constraintR &&
                            item.col === gridC
                );
                if (constraint) {
                    div.textContent = constraint.value;
                    div.classList.add('constraint', 'vertical-constraint');
                    div.dataset.type = 'vertical';
                    div.dataset.row = constraintR;
                    div.dataset.col = gridC;
                    
                    // Add tooltip data
                    if (constraint.value === '=') {
                        div.dataset.tooltip = 'These cells must contain the same symbol';
                    } else {
                        div.dataset.tooltip = 'These cells must contain different symbols';
                    }
                    
                    // Add mouseover/mouseout for tooltips
                    div.addEventListener('mouseover', showTooltip);
                    div.addEventListener('mouseout', hideTooltip);
                }
            }
            gridContainer.appendChild(div);
        }
    }
    
    // Update UI counters
    updateCounters();
    
    // Reset and start timer
    resetTimer();
    startTimer();
}

// Show tooltip on hover
function showTooltip(event) {
    const element = event.currentTarget;
    const tooltipText = element.dataset.tooltip;
    
    if (tooltipText) {
        tooltip.textContent = tooltipText;
        tooltip.style.opacity = '1';
        
        // Position the tooltip above the element
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }
}

// Hide tooltip
function hideTooltip() {
    tooltip.style.opacity = '0';
}

// Handle cell click to toggle between empty, sun, and moon
function handleCellClick(event) {
    if (gameState.isGameWon) return;
    
    const cell = event.currentTarget;
    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);
    
    // Cycle through states: empty -> sun -> moon -> empty
    let nextState;
    if (cell.dataset.state === 'empty') {
        nextState = 'sun';
        cell.textContent = '☀️';
        // Add brief animation
        cell.classList.add('sun-animation');
        setTimeout(() => cell.classList.remove('sun-animation'), 600);
    } else if (cell.dataset.state === 'sun') {
        nextState = 'moon';
        cell.textContent = '🌙';
        // Add brief animation
        cell.classList.add('moon-animation');
        setTimeout(() => cell.classList.remove('moon-animation'), 600);
    } else {
        nextState = 'empty';
        cell.textContent = '';
    }
    
    cell.dataset.state = nextState;
    gameState.grid[r][c] = nextState;
    gameState.moves++;
    
    // Update counters
    updateCounters();
    
    // Update constraints
    updateConstraints();
    
    // Check if solved automatically
    if (isBoardFilled()) {
        checkSolution(false);
    }
}

// Update UI counters
function updateCounters() {
    movesCounter.textContent = gameState.moves;
    hintsCounter.textContent = gameState.hintsUsed;
    
    // Count filled cells
    let filledCount = 0;
    for (let r = 0; r < puzzle.size; r++) {
        for (let c = 0; c < puzzle.size; c++) {
            if (gameState.grid[r][c] !== 'empty') {
                filledCount++;
            }
        }
    }
    progressCounter.textContent = `${filledCount}/${puzzle.size * puzzle.size}`;
}

// Update constraints visual feedback
function updateConstraints() {
    const constraints = document.querySelectorAll('.constraint');
    constraints.forEach(constraint => {
        const type = constraint.dataset.type;
        const r = parseInt(constraint.dataset.row);
        const c = parseInt(constraint.dataset.col);
        
        let cell1, cell2;
        if (type === 'horizontal') {
            cell1 = gameState.grid[r][c];
            cell2 = gameState.grid[r][c + 1];
        } else { // vertical
            cell1 = gameState.grid[r][c];
            cell2 = gameState.grid[r + 1][c];
        }
        
        // Only show constraint status if both cells have values
        if (cell1 !== 'empty' && cell2 !== 'empty') {
            const value = constraint.textContent;
            let isSatisfied;
            
            if (value === '=') {
                isSatisfied = cell1 === cell2;
            } else { // '×'
                isSatisfied = cell1 !== cell2;
            }
            
            constraint.classList.remove('satisfied', 'violated');
            constraint.classList.add(isSatisfied ? 'satisfied' : 'violated');
        } else {
            constraint.classList.remove('satisfied', 'violated');
        }
    });
}

// Check if the board is filled completely
function isBoardFilled() {
    return gameState.grid.every(row => !row.includes('empty'));
}

// Timer functions
function startTimer() {
    if (!gameState.startTime) {
        gameState.startTime = Date.now() - gameState.elapsedTime;
    }
    
    gameState.timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = Date.now();
    gameState.elapsedTime = currentTime - gameState.startTime;
    
    const seconds = Math.floor(gameState.elapsedTime / 1000) % 60;
    const minutes = Math.floor(gameState.elapsedTime / 1000 / 60);
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function stopTimer() {
    clearInterval(gameState.timerInterval);
}

function resetTimer() {
    stopTimer();
    gameState.startTime = null;
    gameState.elapsedTime = 0;
    timerElement.textContent = '00:00';
}

// Show/hide modals
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Confirm reset
function confirmReset() {
    openModal('reset-modal');
}

// Reset the puzzle to the initial state
function resetPuzzle(closeModals = false) {
    if (closeModals) {
        closeModal('reset-modal');
        closeModal('win-modal');
    }
    
    gameState = {
        grid: Array.from({ length: puzzle.size }, () => Array(puzzle.size).fill('empty')),
        hintsUsed: 0,
        moves: 0,
        startTime: null,
        elapsedTime: 0,
        timerInterval: null,
        isGameWon: false,
        darkMode: gameState.darkMode
    };
    
    // Reset revealed cells
    for (const [r, c, symbol] of puzzle.revealed) {
        gameState.grid[r][c] = symbol;
    }
    
    // Update UI
    document.querySelectorAll('.grid-cell.interactive').forEach(cell => {
        cell.textContent = '';
        cell.dataset.state = 'empty';
        cell.classList.remove('sun-animation', 'moon-animation');
    });
    
    document.querySelectorAll('.constraint').forEach(constraint => {
        constraint.classList.remove('satisfied', 'violated');
    });
    
    const statusMsg = document.getElementById('status-msg');
    statusMsg.classList.remove('active', 'success', 'error', 'info');
    
    // Reset and restart timer
    resetTimer();
    startTimer();
    
    // Update counters
    updateCounters();
}

// Show a hint
function showHint() {
    if (gameState.isGameWon) return;
    
    if (isBoardFilled()) {
        setStatusMessage('The board is already filled!', 'error');
        return;
    }
    
    // Find empty cells
    const emptyCells = [];
    for (let r = 0; r < puzzle.size; r++) {
        for (let c = 0; c < puzzle.size; c++) {
            if (gameState.grid[r][c] === 'empty') {
                emptyCells.push([r, c]);
            }
        }
    }
    
    if (emptyCells.length === 0) return;
    
    // Choose a random empty cell
    const [hintRow, hintCol] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    // Determine the best value for the hint
    const hintValue = calculateHintValue(hintRow, hintCol);
    
    // Update the cell
    gameState.grid[hintRow][hintCol] = hintValue;
    const cell = document.querySelector(`.grid-cell[data-row="${hintRow}"][data-col="${hintCol}"]`);
    cell.textContent = hintValue === 'sun' ? '☀️' : '🌙';
    cell.dataset.state = hintValue;
    
    // Add animation
    cell.classList.add(hintValue === 'sun' ? 'sun-animation' : 'moon-animation');
    setTimeout(() => {
        cell.classList.remove('sun-animation', 'moon-animation');
    }, 1000);
    
    // Update constraints
    updateConstraints();
    
    // Increment hints used
    gameState.hintsUsed++;
    updateCounters();
    
    setStatusMessage(`Hint: Placed a ${hintValue === 'sun' ? 'sun' : 'moon'} at row ${hintRow + 1}, column ${hintCol + 1}`, 'info');
}

// Calculate the best value for a hint
function calculateHintValue(row, col) {
    // Count suns and moons in the row and column
    const currRow = gameState.grid[row];
    const currCol = gameState.grid.map(r => r[col]);
    
    const rowSuns = currRow.filter(cell => cell === 'sun').length;
    const colSuns = currCol.filter(cell => cell === 'sun').length;
    
    const rowMoons = currRow.filter(cell => cell === 'moon').length;
    const colMoons = currCol.filter(cell => cell === 'moon').length;
    
    // Check if either is at max capacity
    if (rowSuns >= puzzle.size / 2) return 'moon';
    if (rowMoons >= puzzle.size / 2) return 'sun';
    if (colSuns >= puzzle.size / 2) return 'moon';
    if (colMoons >= puzzle.size / 2) return 'sun';
    
    // Check constraints
    const horizontalLeftConstraint = puzzle.constraints.find(
        c => c.type === 'horizontal' && c.row === row && c.col === col - 1
    );
    const horizontalRightConstraint = puzzle.constraints.find(
        c => c.type === 'horizontal' && c.row === row && c.col === col
    );
    const verticalTopConstraint = puzzle.constraints.find(
        c => c.type === 'vertical' && c.row === row - 1 && c.col === col
    );
    const verticalBottomConstraint = puzzle.constraints.find(
        c => c.type === 'vertical' && c.row === row && c.col === col
    );
    
    // Check for forced placements based on constraints
    if (horizontalLeftConstraint) {
        const leftCell = gameState.grid[row][col - 1];
        if (leftCell !== 'empty') {
            if (horizontalLeftConstraint.value === '=') return leftCell;
            else return leftCell === 'sun' ? 'moon' : 'sun';
        }
    }
    
    if (horizontalRightConstraint) {
        const rightCell = gameState.grid[row][col + 1];
        if (rightCell !== 'empty') {
            if (horizontalRightConstraint.value === '=') return rightCell;
            else return rightCell === 'sun' ? 'moon' : 'sun';
        }
    }
    
    if (verticalTopConstraint) {
        const topCell = gameState.grid[row - 1][col];
        if (topCell !== 'empty') {
            if (verticalTopConstraint.value === '=') return topCell;
            else return topCell === 'sun' ? 'moon' : 'sun';
        }
    }
    
    if (verticalBottomConstraint) {
        const bottomCell = gameState.grid[row + 1][col];
        if (bottomCell !== 'empty') {
            if (verticalBottomConstraint.value === '=') return bottomCell;
            else return bottomCell === 'sun' ? 'moon' : 'sun';
        }
    }
    
    // Check for three-in-a-row prevention
    if (row >= 2) {
        if (gameState.grid[row-1][col] === gameState.grid[row-2][col] && gameState.grid[row-1][col] !== 'empty') {
            return gameState.grid[row-1][col] === 'sun' ? 'moon' : 'sun';
        }
    }
    
    if (row <= puzzle.size - 3) {
        if (gameState.grid[row+1][col] === gameState.grid[row+2][col] && gameState.grid[row+1][col] !== 'empty') {
            return gameState.grid[row+1][col] === 'sun' ? 'moon' : 'sun';
        }
    }
    
    if (col >= 2) {
        if (gameState.grid[row][col-1] === gameState.grid[row][col-2] && gameState.grid[row][col-1] !== 'empty') {
            return gameState.grid[row][col-1] === 'sun' ? 'moon' : 'sun';
        }
    }
    
    if (col <= puzzle.size - 3) {
        if (gameState.grid[row][col+1] === gameState.grid[row][col+2] && gameState.grid[row][col+1] !== 'empty') {
            return gameState.grid[row][col+1] === 'sun' ? 'moon' : 'sun';
        }
    }
    
    // Choose the symbol that balances the row and column best
    if (rowSuns <= rowMoons && colSuns <= colMoons) {
        return 'sun';
    } else {
        return 'moon';
    }
}

// Check the solution
function checkSolution(showAlert) {
    if (gameState.isGameWon) return true;
    
    // Check for empty cells
    if (!isBoardFilled()) {
        if (showAlert) {
            setStatusMessage('Please fill all cells before checking the solution.', 'error');
        }
        return false;
    }

    // Check row and column balances (3 suns, 3 moons in 6x6 grid)
    for (let i = 0; i < puzzle.size; i++) {
        const row = gameState.grid[i];
        const col = gameState.grid.map(row => row[i]);
        const rowSuns = row.filter(x => x === 'sun').length;
        const colSuns = col.filter(x => x === 'sun').length;
        
        if (rowSuns !== puzzle.size / 2) {
            if (showAlert) {
                setStatusMessage(`Row ${i + 1} has ${rowSuns} suns, but needs exactly ${puzzle.size / 2}.`, 'error');
            }
            return false;
        }
        if (colSuns !== puzzle.size / 2) {
            if (showAlert) {
                setStatusMessage(`Column ${i + 1} has ${colSuns} suns, but needs exactly ${puzzle.size / 2}.`, 'error');
            }
            return false;
        }
    }

    // Check no three consecutive identical symbols
    for (let i = 0; i < puzzle.size; i++) {
        for (let j = 0; j < puzzle.size - 2; j++) {
            if (gameState.grid[i][j] === gameState.grid[i][j + 1] && 
                gameState.grid[i][j + 1] === gameState.grid[i][j + 2]) {
                if (showAlert) {
                    setStatusMessage(`Row ${i + 1} has three identical symbols in a row.`, 'error');
                }
                return false;
            }
            if (gameState.grid[j][i] === gameState.grid[j + 1][i] && 
                gameState.grid[j + 1][i] === gameState.grid[j + 2][i]) {
                if (showAlert) {
                    setStatusMessage(`Column ${i + 1} has three identical symbols in a row.`, 'error');
                }
                return false;
            }
        }
    }

    // Check constraints
    for (const con of puzzle.constraints) {
        let cell1, cell2;
        if (con.type === 'horizontal') {
            cell1 = gameState.grid[con.row][con.col];
            cell2 = gameState.grid[con.row][con.col + 1];
            
            if (con.value === '=' && cell1 !== cell2) {
                if (showAlert) {
                    setStatusMessage(`Equality constraint not satisfied at row ${con.row + 1} between columns ${con.col + 1} and ${con.col + 2}.`, 'error');
                }
                return false;
            } else if (con.value === '×' && cell1 === cell2) {
                if (showAlert) {
                    setStatusMessage(`Inequality constraint not satisfied at row ${con.row + 1} between columns ${con.col + 1} and ${con.col + 2}.`, 'error');
                }
                return false;
            }
        } else {
            cell1 = gameState.grid[con.row][con.col];
            cell2 = gameState.grid[con.row + 1][con.col];
            
            if (con.value === '=' && cell1 !== cell2) {
                if (showAlert) {
                    setStatusMessage(`Equality constraint not satisfied at column ${con.col + 1} between rows ${con.row + 1} and ${con.row + 2}.`, 'error');
                }
                return false;
            } else if (con.value === '×' && cell1 === cell2) {
                if (showAlert) {
                    setStatusMessage(`Inequality constraint not satisfied at column ${con.col + 1} between rows ${con.row + 1} and ${con.row + 2}.`, 'error');
                }
                return false;
            }
        }
    }

    // If we get here, the solution is correct
    if (showAlert) {
        celebrateWin();
    }
    return true;
}

// Celebrate winning the game
function celebrateWin() {
    gameState.isGameWon = true;
    stopTimer();
    
    // Update win stats
    const time = timerElement.textContent;
    document.getElementById('win-stats').innerHTML = `
        <p>Time: ${time}</p>
        <p>Moves: ${gameState.moves}</p>
        <p>Hints: ${gameState.hintsUsed}</p>
    `;
    
    // Show confetti effect
    createConfetti();
    
    // Show win modal
    setTimeout(() => {
        openModal('win-modal');
    }, 1000);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#4361ee', '#4cc9f0', '#f72585', '#7209b7', '#3a0ca3'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Animate falling
        const animationDuration = Math.random() * 3 + 2;
        const horizontalSwing = Math.random() * 50 - 25;
        
        confetti.animate([
            { transform: `translateY(0) translateX(0) rotate(0)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) translateX(${horizontalSwing}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: animationDuration * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            fill: 'forwards'
        });
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
}

// Set status message
function setStatusMessage(message, type) {
    const statusMsg = document.getElementById('status-msg');
    statusMsg.textContent = message;
    statusMsg.className = 'status';
    statusMsg.classList.add(type);
    
    // Animate in
    setTimeout(() => {
        statusMsg.classList.add('active');
    }, 10);
    
    // Auto hide after 5 seconds for error messages
    if (type === 'error' || type === 'info') {
        setTimeout(() => {
            statusMsg.classList.remove('active');
        }, 5000);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const modeToggle = document.querySelector('.mode-toggle i');
    
    body.classList.toggle('dark-mode');
    gameState.darkMode = body.classList.contains('dark-mode');
    
    if (gameState.darkMode) {
        modeToggle.className = 'fas fa-sun';
    } else {
        modeToggle.className = 'fas fa-moon';
    }
}

// In your generatePuzzle function, add this before returning the puzzle:
function generatePuzzle(size = 6, difficulty = 'medium') {
    showLoadingOverlay();
    
    return new Promise((resolve) => {
        setTimeout(() => {
            let attempts = 0;
            let validPuzzle = null;
            
            // Keep trying until we get a puzzle with a unique solution
            const findValidPuzzle = () => {
                attempts++;
                const basePuzzle = { ...samplePuzzles[difficulty][Math.floor(Math.random() * samplePuzzles[difficulty].length)] };
                const candidatePuzzle = createValidPuzzleVariation(basePuzzle);
                
                // Check if the puzzle has a unique solution
                if (verifyUniqueSolution(candidatePuzzle)) {
                    validPuzzle = candidatePuzzle;
                    hideLoadingOverlay();
                    resolve(validPuzzle);
                } else if (attempts < 5) {  // Try a few times before giving up
                    setTimeout(findValidPuzzle, 0);  // Use setTimeout to avoid blocking
                } else {
                    // After several attempts, just use the last generated puzzle
                    // (In a production environment, you might want to continue trying)
                    console.log("Warning: Could not find a puzzle with unique solution after 5 attempts");
                    hideLoadingOverlay();
                    resolve(candidatePuzzle);
                }
            };
            
            findValidPuzzle();
        }, 200);  // Reduced from 1000ms to make the process faster
    });
}

// Create a valid puzzle variation that ensures the puzzle is solvable
function createValidPuzzleVariation(basePuzzle) {
    const newPuzzle = {
        size: basePuzzle.size,
        revealed: [],
        constraints: []
    };
    
    // Randomly choose a transformation type (0-7)
    // 0: Identity, 1: 90° rotation, 2: 180° rotation, 3: 270° rotation
    // 4: Horizontal flip, 5: Vertical flip, 6: Main diagonal flip, 7: Anti-diagonal flip
    const transformation = Math.floor(Math.random() * 8);
    
    // Generate a complete valid solution grid for the original puzzle
    const originalSolution = generateSolution(basePuzzle);
    
    // Transform the entire solution grid (this ensures consistency)
    const transformedSolution = transformGrid(originalSolution, transformation, basePuzzle.size);
    
    // Randomly decide if we should invert all symbols (suns to moons and vice versa)
    // This preserves the logical consistency while creating a different puzzle
    const invertAll = Math.random() < 0.5;
    
    // Apply revealed cells from base puzzle with transformation
    for (const [r, c, symbol] of basePuzzle.revealed) {
        let newR, newC;
        
        // Apply transformation to coordinates
        [newR, newC] = transformCoordinates(r, c, transformation, basePuzzle.size);
        
        // Get the symbol from our transformed solution grid - this ensures correctness
        let newSymbol = transformedSolution[newR][newC];
        
        // Optionally invert all symbols
        if (invertAll) {
            newSymbol = newSymbol === 'sun' ? 'moon' : 'sun';
        }
        
        newPuzzle.revealed.push([newR, newC, newSymbol]);
    }
    
    // Generate constraints based on the transformed solution
    newPuzzle.constraints = generateValidConstraints(transformedSolution, newPuzzle.revealed, basePuzzle.constraints.length);
    
    return newPuzzle;
}

// Generate a full solution for a puzzle based on its revealed cells
function generateSolution(puzzle) {
    // Start with an empty grid
    const solution = Array.from({ length: puzzle.size }, () => 
        Array(puzzle.size).fill('empty')
    );
    
    // Fill in revealed cells
    for (const [r, c, symbol] of puzzle.revealed) {
        solution[r][c] = symbol;
    }
    
    // Use a constraint solver to fill in the rest (simplified for this example)
    // In a real implementation, use a more sophisticated backtracking algorithm
    for (let r = 0; r < puzzle.size; r++) {
        let rowSuns = 0;
        let rowMoons = 0;
        
        // Count existing symbols in row
        for (let c = 0; c < puzzle.size; c++) {
            if (solution[r][c] === 'sun') rowSuns++;
            else if (solution[r][c] === 'moon') rowMoons++;
        }
        
        // Fill remaining cells in the row
        for (let c = 0; c < puzzle.size; c++) {
            if (solution[r][c] === 'empty') {
                if (rowSuns < puzzle.size / 2) {
                    solution[r][c] = 'sun';
                    rowSuns++;
                } else {
                    solution[r][c] = 'moon';
                    rowMoons++;
                }
            }
        }
    }
    
    // Verify and fix column constraints
    let iterations = 0;
    while (!checkSolutionValid(solution, puzzle.size) && iterations < 100) {
        fixColumnConstraints(solution, puzzle.size);
        iterations++;
    }
    
    return solution;
}

// Check if a solution is valid (meets all row and column counts)
function checkSolutionValid(solution, size) {
    // Check each row
    for (let r = 0; r < size; r++) {
        let rowSuns = 0;
        for (let c = 0; c < size; c++) {
            if (solution[r][c] === 'sun') rowSuns++;
        }
        if (rowSuns !== size / 2) return false;
    }
    
    // Check each column
    for (let c = 0; c < size; c++) {
        let colSuns = 0;
        for (let r = 0; r < size; r++) {
            if (solution[r][c] === 'sun') colSuns++;
        }
        if (colSuns !== size / 2) return false;
    }
    
    // Check no three in a row
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size - 2; c++) {
            if (solution[r][c] === solution[r][c+1] && solution[r][c+1] === solution[r][c+2]) {
                return false;
            }
        }
    }
    
    // Check no three in a column
    for (let c = 0; c < size; c++) {
        for (let r = 0; r < size - 2; r++) {
            if (solution[r][c] === solution[r+1][c] && solution[r+1][c] === solution[r+2][c]) {
                return false;
            }
        }
    }
    
    return true;
}

// Fix column constraints by swapping symbols in rows
function fixColumnConstraints(solution, size) {
    // Check each column
    for (let c = 0; c < size; c++) {
        let colSuns = 0;
        for (let r = 0; r < size; r++) {
            if (solution[r][c] === 'sun') colSuns++;
        }
        
        // If column has too many suns, change some to moons
        if (colSuns > size / 2) {
            let extraSuns = colSuns - (size / 2);
            for (let r = 0; r < size && extraSuns > 0; r++) {
                if (solution[r][c] === 'sun') {
                    // Find a moon in this row to swap with
                    for (let c2 = 0; c2 < size; c2++) {
                        if (c2 !== c && solution[r][c2] === 'moon') {
                            solution[r][c] = 'moon';
                            solution[r][c2] = 'sun';
                            extraSuns--;
                            break;
                        }
                    }
                }
            }
        }
        
        // If column has too few suns, change some moons to suns
        else if (colSuns < size / 2) {
            let missingMoons = (size / 2) - colSuns;
            for (let r = 0; r < size && missingMoons > 0; r++) {
                if (solution[r][c] === 'moon') {
                    // Find a sun in this row to swap with
                    for (let c2 = 0; c2 < size; c2++) {
                        if (c2 !== c && solution[r][c2] === 'sun') {
                            solution[r][c] = 'sun';
                            solution[r][c2] = 'moon';
                            missingMoons--;
                            break;
                        }
                    }
                }
            }
        }
    }
    
    // Fix any three-in-a-row issues
    fixThreeInARow(solution, size);
}

// Fix three-in-a-row issues by swapping where possible
function fixThreeInARow(solution, size) {
    // Check rows for three-in-a-row
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size - 2; c++) {
            if (solution[r][c] === solution[r][c+1] && solution[r][c+1] === solution[r][c+2]) {
                // Try to swap with another cell in the row
                for (let c2 = 0; c2 < size; c2++) {
                    if (c2 < c || c2 > c+2) {
                        if (solution[r][c2] !== solution[r][c]) {
                            // Swap c+2 with c2
                            let temp = solution[r][c+2];
                            solution[r][c+2] = solution[r][c2];
                            solution[r][c2] = temp;
                            break;
                        }
                    }
                }
            }
        }
    }
    
    // Check columns for three-in-a-row
    for (let c = 0; c < size; c++) {
        for (let r = 0; r < size - 2; r++) {
            if (solution[r][c] === solution[r+1][c] && solution[r+1][c] === solution[r+2][c]) {
                // Try to swap with another cell in the column
                for (let r2 = 0; r2 < size; r2++) {
                    if (r2 < r || r2 > r+2) {
                        if (solution[r2][c] !== solution[r][c]) {
                            // Swap r+2 with r2
                            let temp = solution[r+2][c];
                            solution[r+2][c] = solution[r2][c];
                            solution[r2][c] = temp;
                            break;
                        }
                    }
                }
            }
        }
    }
}

// Transform coordinates based on transformation type
function transformCoordinates(r, c, transformation, size) {
    let newR, newC;
    
    // Apply transformation (rotation/reflection)
    switch (transformation) {
        case 0: // Identity
            newR = r; newC = c;
            break;
        case 1: // 90° rotation
            newR = c; newC = size - 1 - r;
            break;
        case 2: // 180° rotation
            newR = size - 1 - r; newC = size - 1 - c;
            break;
        case 3: // 270° rotation
            newR = size - 1 - c; newC = r;
            break;
        case 4: // Horizontal reflection
            newR = r; newC = size - 1 - c;
            break;
        case 5: // Vertical reflection
            newR = size - 1 - r; newC = c;
            break;
        case 6: // Diagonal reflection (main)
            newR = c; newC = r;
            break;
        case 7: // Diagonal reflection (other)
            newR = size - 1 - c; newC = size - 1 - r;
            break;
    }
    
    return [newR, newC];
}

// Transform an entire grid based on the transformation
function transformGrid(grid, transformation, size) {
    const newGrid = Array.from({ length: size }, () => Array(size).fill('empty'));
    
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const [newR, newC] = transformCoordinates(r, c, transformation, size);
            newGrid[newR][newC] = grid[r][c];
        }
    }
    
    return newGrid;
}

// Generate valid constraints based on the solution grid
function generateValidConstraints(solution, revealed, targetCount) {
    const constraints = [];
    const possibleConstraints = [];
    
    // Track which cells are revealed for constraint placement
    const revealedCells = new Set();
    for (const [r, c] of revealed) {
        revealedCells.add(`${r},${c}`);
    }
    
    // Generate horizontal constraints
    for (let r = 0; r < solution.length; r++) {
        for (let c = 0; c < solution.length - 1; c++) {
            // Add constraint if at least one adjacent cell is revealed
            if (revealedCells.has(`${r},${c}`) || revealedCells.has(`${r},${c+1}`)) {
                const cell1 = solution[r][c];
                const cell2 = solution[r][c+1];
                
                // Only add constraints where both cells have values
                if (cell1 !== 'empty' && cell2 !== 'empty') {
                    possibleConstraints.push({
                        type: 'horizontal',
                        row: r,
                        col: c,
                        value: cell1 === cell2 ? '=' : '×'
                    });
                }
            }
        }
    }
    
    // Generate vertical constraints
    for (let r = 0; r < solution.length - 1; r++) {
        for (let c = 0; c < solution.length; c++) {
            // Add constraint if at least one adjacent cell is revealed
            if (revealedCells.has(`${r},${c}`) || revealedCells.has(`${r+1},${c}`)) {
                const cell1 = solution[r][c];
                const cell2 = solution[r+1][c];
                
                // Only add constraints where both cells have values
                if (cell1 !== 'empty' && cell2 !== 'empty') {
                    possibleConstraints.push({
                        type: 'vertical',
                        row: r,
                        col: c,
                        value: cell1 === cell2 ? '=' : '×'
                    });
                }
            }
        }
    }
    
    // Shuffle and select constraints
    if (possibleConstraints.length > 0) {
        const shuffledConstraints = shuffleArray(possibleConstraints);
        // Take the minimum of target count or available constraints
        const selectedCount = Math.min(targetCount, shuffledConstraints.length);
        return shuffledConstraints.slice(0, selectedCount);
    }
    
    return constraints;
}

function verifyUniqueSolution(puzzle) {
    // Deep copy the puzzle for solving
    const puzzleCopy = {
        size: puzzle.size,
        revealed: [...puzzle.revealed],
        constraints: [...puzzle.constraints]
    };
    
    // Create grid from revealed cells
    const grid = Array.from({ length: puzzle.size }, () => Array(puzzle.size).fill(null));
    for (const [r, c, symbol] of puzzle.revealed) {
        grid[r][c] = symbol;
    }
    
    // First, try to find a solution
    const solution = findSolution(grid, puzzleCopy);
    if (!solution) {
        return false; // No solution exists
    }
    
    // Add a constraint that excludes the found solution
    const exclusionConstraint = createExclusionConstraint(solution);
    
    // Clone the grid again for the second solve attempt
    const gridCopy = Array.from({ length: puzzle.size }, () => Array(puzzle.size).fill(null));
    for (const [r, c, symbol] of puzzle.revealed) {
        gridCopy[r][c] = symbol;
    }
    
    // Try to find a second solution with the exclusion constraint
    const altSolution = findSolution(gridCopy, puzzleCopy, exclusionConstraint);
    
    // If no second solution exists, the puzzle has a unique solution
    return !altSolution;
}

// Find a solution using backtracking
function findSolution(grid, puzzle, exclusionConstraint = null) {
    const size = puzzle.size;
    const emptyCells = [];
    
    // Find all empty cells
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c] === null) {
                emptyCells.push([r, c]);
            }
        }
    }
    
    // Try to solve using backtracking
    if (solveBacktrack(grid, emptyCells, 0, puzzle, exclusionConstraint)) {
        return grid; // Return the solution
    }
    
    return null; // No solution found
}

// Backtracking solver
function solveBacktrack(grid, emptyCells, index, puzzle, exclusionConstraint) {
    const size = puzzle.size;
    
    // Base case: all cells filled
    if (index >= emptyCells.length) {
        return isValidSolution(grid, puzzle) && 
               (exclusionConstraint === null || !matchesExclusionConstraint(grid, exclusionConstraint));
    }
    
    const [r, c] = emptyCells[index];
    
    // Try placing a sun
    grid[r][c] = 'sun';
    if (isValidPlacement(grid, r, c, puzzle) && 
        solveBacktrack(grid, emptyCells, index + 1, puzzle, exclusionConstraint)) {
        return true;
    }
    
    // Try placing a moon
    grid[r][c] = 'moon';
    if (isValidPlacement(grid, r, c, puzzle) && 
        solveBacktrack(grid, emptyCells, index + 1, puzzle, exclusionConstraint)) {
        return true;
    }
    
    // Backtrack
    grid[r][c] = null;
    return false;
}

// Check if a placement is valid considering partial grid
function isValidPlacement(grid, row, col, puzzle) {
    const size = puzzle.size;
    const symbol = grid[row][col];
    
    // Check row constraints
    const rowSymbols = grid[row].filter(cell => cell === symbol);
    if (rowSymbols.length > size / 2) {
        return false;
    }
    
    // Check column constraints
    let colCount = 0;
    for (let r = 0; r < size; r++) {
        if (grid[r][col] === symbol) {
            colCount++;
        }
    }
    if (colCount > size / 2) {
        return false;
    }
    
    // Check for three in a row horizontally
    if (col >= 2 && 
        grid[row][col-1] === symbol && 
        grid[row][col-2] === symbol) {
        return false;
    }
    if (col >= 1 && col < size - 1 && 
        grid[row][col-1] === symbol && 
        grid[row][col+1] === symbol) {
        return false;
    }
    if (col < size - 2 && 
        grid[row][col+1] === symbol && 
        grid[row][col+2] === symbol) {
        return false;
    }
    
    // Check for three in a row vertically
    if (row >= 2 && 
        grid[row-1][col] === symbol && 
        grid[row-2][col] === symbol) {
        return false;
    }
    if (row >= 1 && row < size - 1 && 
        grid[row-1][col] === symbol && 
        grid[row+1][col] === symbol) {
        return false;
    }
    if (row < size - 2 && 
        grid[row+1][col] === symbol && 
        grid[row+2][col] === symbol) {
        return false;
    }
    
    // Check constraints between cells
    for (const constraint of puzzle.constraints) {
        if (constraint.type === 'horizontal') {
            const r = constraint.row;
            const c = constraint.col;
            // Check if both cells in this constraint are filled
            if (grid[r][c] !== null && grid[r][c+1] !== null) {
                const areSame = grid[r][c] === grid[r][c+1];
                // '=' means symbols must be the same
                if (constraint.value === '=' && !areSame) {
                    return false;
                }
                // '×' means symbols must be different
                if (constraint.value === '×' && areSame) {
                    return false;
                }
            }
        } else { // vertical constraint
            const r = constraint.row;
            const c = constraint.col;
            // Check if both cells in this constraint are filled
            if (grid[r][c] !== null && grid[r+1][c] !== null) {
                const areSame = grid[r][c] === grid[r+1][c];
                // '=' means symbols must be the same
                if (constraint.value === '=' && !areSame) {
                    return false;
                }
                // '×' means symbols must be different
                if (constraint.value === '×' && areSame) {
                    return false;
                }
            }
        }
    }
    
    return true;
}

// Check if the complete solution is valid
function isValidSolution(grid, puzzle) {
    const size = puzzle.size;
    
    // Check each row has exactly size/2 suns and moons
    for (let r = 0; r < size; r++) {
        let sunCount = 0;
        for (let c = 0; c < size; c++) {
            if (grid[r][c] === 'sun') {
                sunCount++;
            }
        }
        if (sunCount !== size / 2) {
            return false;
        }
    }
    
    // Check each column has exactly size/2 suns and moons
    for (let c = 0; c < size; c++) {
        let sunCount = 0;
        for (let r = 0; r < size; r++) {
            if (grid[r][c] === 'sun') {
                sunCount++;
            }
        }
        if (sunCount !== size / 2) {
            return false;
        }
    }
    
    // Check all constraints
    for (const constraint of puzzle.constraints) {
        if (constraint.type === 'horizontal') {
            const r = constraint.row;
            const c = constraint.col;
            const areSame = grid[r][c] === grid[r][c+1];
            
            if (constraint.value === '=' && !areSame) {
                return false;
            }
            if (constraint.value === '×' && areSame) {
                return false;
            }
        } else { // vertical constraint
            const r = constraint.row;
            const c = constraint.col;
            const areSame = grid[r][c] === grid[r+1][c];
            
            if (constraint.value === '=' && !areSame) {
                return false;
            }
            if (constraint.value === '×' && areSame) {
                return false;
            }
        }
    }
    
    return true;
}

// Suggest a solution to the current puzzle
function suggestSolution() {
    if (gameState.isGameWon) return;
    
    // Create a confirmation dialog
    if (confirm("Are you sure you want to see the solution? This will reveal the answer to the puzzle.")) {
        // Create a grid with just the revealed cells
        const grid = Array.from({ length: puzzle.size }, () => Array(puzzle.size).fill(null));
        for (const [r, c, symbol] of puzzle.revealed) {
            grid[r][c] = symbol;
        }
        
        // Find a solution
        const solution = findSolution(grid, puzzle);
        
        if (solution) {
            // Update all empty cells with the solution
            for (let r = 0; r < puzzle.size; r++) {
                for (let c = 0; c < puzzle.size; c++) {
                    if (gameState.grid[r][c] === 'empty') {
                        // Update the game state
                        gameState.grid[r][c] = solution[r][c];
                        
                        // Update the UI
                        const cell = document.querySelector(`.grid-cell[data-row="${r}"][data-col="${c}"]`);
                        cell.textContent = solution[r][c] === 'sun' ? '☀️' : '🌙';
                        cell.dataset.state = solution[r][c];
                    }
                }
            }
            
            // Update constraints visualization
            updateConstraints();
            
            // Update counters
            updateCounters();
            
            // Show a message
            setStatusMessage("Solution revealed! You can continue playing or reset the puzzle.", 'info');
        } else {
            setStatusMessage("Sorry, couldn't find a solution for this puzzle.", 'error');
        }
    }
}

// Create a constraint that excludes the found solution
function createExclusionConstraint(solution) {
    // Flatten the grid into a representation that can be compared
    // This creates an array of all cell values in the solution
    const flattened = [];
    for (let r = 0; r < solution.length; r++) {
        for (let c = 0; c < solution.length; c++) {
            flattened.push(solution[r][c]);
        }
    }
    return flattened;
}

// Check if a grid matches the exclusion constraint
function matchesExclusionConstraint(grid, exclusionConstraint) {
    // Flatten the current grid
    const flattened = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid.length; c++) {
            flattened.push(grid[r][c]);
        }
    }
    
    // Compare with the exclusion constraint
    for (let i = 0; i < flattened.length; i++) {
        if (flattened[i] !== exclusionConstraint[i]) {
            return false; // They differ, so this is not the same solution
        }
    }
    
    return true; // This is the same solution
}

// Helper function to shuffle an array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Load a puzzle from the library
function loadPuzzle(difficulty, index) {
    // Ensure we have puzzles of the requested difficulty
    if (!puzzleLibrary[difficulty]) {
        puzzleLibrary[difficulty] = [];
    }
    
    // Check if we have the requested puzzle
    if (!puzzleLibrary[difficulty][index]) {
        // If not, copy from sample puzzles if available
        if (samplePuzzles[difficulty] && samplePuzzles[difficulty][index % samplePuzzles[difficulty].length]) {
            puzzleLibrary[difficulty][index] = samplePuzzles[difficulty][index % samplePuzzles[difficulty].length];
        } else {
            // Generate a new puzzle
            showLoadingOverlay();
            setStatusMessage("Generating a new puzzle...", "info");
            
            generatePuzzle(6, difficulty).then(newPuzzle => {
                puzzleLibrary[difficulty][index] = newPuzzle;
                finishLoadingPuzzle(difficulty, index);
                hideLoadingOverlay();
            });
            
            return;
        }
    }
    
    finishLoadingPuzzle(difficulty, index);
}

function finishLoadingPuzzle(difficulty, index) {
    // Update current puzzle info
    currentDifficulty = difficulty;
    currentPuzzleIndex = index;
    
    // Reset game state with new puzzle
    resetPuzzleWithNewData(puzzleLibrary[difficulty][index]);
    
    // Update difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === difficulty) {
            btn.classList.add('active');
        }
    });
    
    setStatusMessage(`Loaded ${difficulty} puzzle #${index + 1}`, "info");
}

// Reset the puzzle with new puzzle data - FIXED
function resetPuzzleWithNewData(newPuzzle) {
    // Stop the current timer
    stopTimer();
    
    // Update the puzzle data
    puzzle = newPuzzle;
    
    // Reset game state with the proper grid size based on the new puzzle
    gameState = {
        grid: Array.from({ length: puzzle.size }, () => Array(puzzle.size).fill('empty')),
        hintsUsed: 0,
        moves: 0,
        startTime: null,
        elapsedTime: 0,
        timerInterval: null,
        isGameWon: false,
        darkMode: gameState ? gameState.darkMode : false
    };
    
    // Initialize revealed cells
    for (const [r, c, symbol] of puzzle.revealed) {
        gameState.grid[r][c] = symbol;
    }
    
    // Update UI
    initializePuzzle();
    updateCounters();
    
    // Reset and start timer
    resetTimer();
    startTimer();
    
    // Update difficulty indicator
    const difficultyIndicator = document.getElementById('difficulty-indicator');
    difficultyIndicator.textContent = currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);
    
    // Update puzzle number
    document.getElementById('puzzle-number').textContent = currentPuzzleIndex + 1;
    
    // Reset status message
    const statusMsg = document.getElementById('status-msg');
    statusMsg.classList.remove('active', 'success', 'error', 'info');
}

// Load next puzzle
function nextPuzzle() {
    loadPuzzle(currentDifficulty, currentPuzzleIndex + 1);
}

// Load previous puzzle
function prevPuzzle() {
    if (currentPuzzleIndex > 0) {
        loadPuzzle(currentDifficulty, currentPuzzleIndex - 1);
    } else {
        setStatusMessage("This is the first puzzle", "info");
    }
}

// Change difficulty
function changeDifficulty(difficulty) {
    loadPuzzle(difficulty, 0);
}

// Generate a new puzzle
function generateNewPuzzle() {
    showLoadingOverlay();
    setStatusMessage("Generating a new puzzle...", "info");
    
    generatePuzzle(6, currentDifficulty).then(newPuzzle => {
        // Add to library
        puzzleLibrary[currentDifficulty].push(newPuzzle);
        // Load the new puzzle
        loadPuzzle(currentDifficulty, puzzleLibrary[currentDifficulty].length - 1);
        hideLoadingOverlay();
    });
}

// Show loading overlay
function showLoadingOverlay() {
    document.getElementById('loading-overlay').classList.add('active');
}

// Hide loading overlay
function hideLoadingOverlay() {
    document.getElementById('loading-overlay').classList.remove('active');
}

// Initialize the application when the page loads - FIXED
window.onload = function() {
    // Initialize DOM elements
    timerElement = document.getElementById('timer');
    movesCounter = document.getElementById('moves-counter');
    hintsCounter = document.getElementById('hints-counter');
    progressCounter = document.getElementById('progress-counter');
    tooltip = document.getElementById('tooltip');
    
    // Initialize game state safely without depending on puzzle.size
    gameState = {
        grid: [],  // Empty grid initially
        hintsUsed: 0,
        moves: 0,
        startTime: null,
        elapsedTime: 0,
        timerInterval: null,
        isGameWon: false,
        darkMode: false
    };
    
    // Load the first medium puzzle
    loadPuzzle('medium', 0);
};