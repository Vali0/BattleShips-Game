gameLogic = require('./gameLogic');

function placeShip(board, shipSize, boardSize) {
    while (true) {
        var row = Math.floor(Math.random() * boardSize),
            col = Math.floor(Math.random() * boardSize),
            index = 0;

        if (col + shipSize < boardSize && gameLogic.checkRowForShips(board, row, col, col + shipSize)) {
            for (index = col; index < col + shipSize; index++) {
                board[row][index] = '*';
            }

            break;
        }
        else if (row + shipSize < boardSize && gameLogic.checkColForShips(board, col, row, row + shipSize)) {
            for (index = row; index < row + shipSize; index++) {
                board[index][col] = '*';
            }

            break;
        }
    }
}

function generateBoard(boardSize) {
    var board = [];
    for (var i = 0; i < boardSize; i++) {
        board[i] = [];
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = '.';
        }
    }

    return board;
}

function generateShips(board, boardSize) {
    placeShip(board, 5, boardSize);
    placeShip(board, 4, boardSize);
    placeShip(board, 4, boardSize);
}

module.exports = {
    generateBoard: generateBoard,
    generateShips: generateShips
}