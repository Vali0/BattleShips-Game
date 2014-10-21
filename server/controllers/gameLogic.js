function checkRowForShips(board, row, startCol, endCol) {
    for (var currentCol = startCol; currentCol <= endCol; currentCol++) {
        if (board[row][currentCol] === '*') {
            return false;
        }
    }

    return true;
}

function checkColForShips(board, col, startRow, endRow) {
    for (var currentRow = startRow; currentRow <= endRow; currentRow++) {
        if (board[currentRow][col] === '*') {
            return false;
        }
    }

    return true;
}

function convertBoardToHtml(board) {
    var field = '  1 2 3 4 5 6 7 8 9 10<br />';

    for (var i = 0; i < 10; i++) {
        field += String.fromCharCode(65 + i) + ' ';
        for (var j = 0; j < 10; j++) {
            if (board[i][j] == '*') {
                field += '. ';
            } else {
                field += board[i][j] + ' ';
            }
        }
        field += '<br />';
    }

    return field;
}

function cheatConvertBoardToHtml(board) {
    var field = '  1 2 3 4 5 6 7 8 9 10<br />';

    for (var i = 0; i < 10; i++) {
        field += String.fromCharCode(65 + i) + ' ';

        for (var j = 0; j < 10; j++) {
            if (board[i][j] === '*') {
                field += board[i][j] + ' ';
            } else {
                field += '  ';
            }
        }

        field += '<br />';
    }

    return field;
}

function areValidCoordinates(row, col, boardSize) {
    // Check if row and col are numbers and they are finite
    if (!(isFinite(row) && isFinite(col))) {
        return false;
    }

    // Check board size
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
        return false;
    }

    // Check if row and col are integers
    if (row % 1 !== 0 || col % 1 !== 0) {
        return false;
    }

    return true;
}

function checkForHit(board, boardSize, row, col, lives) {
    if (board[row][col] === '*') {
        board[row][col] = 'X';
        lives--;

        // Check if the ship is sunk
        if ((row - 1 >= 0 && board[row - 1][col] === '*') ||
            (row + 1 < boardSize && board[row + 1][col] === '*') ||
            (col - 1 >= 0 && board[row][col - 1] === '*') ||
            (col + 1 < boardSize && board[row][col + 1] === '*')) {
            return ['Hit a ship!', lives];
        } else {
            return ['Sink a ship!', lives];
        }
    } else if (board[row][col] === '-' || board[row][col] === 'X') {
        return ['Already hitted!', lives];
    } else {
        board[row][col] = '-';
        return ['Miss!', lives];
    }
}

module.exports = {
    checkRowForShips: checkRowForShips,
    checkColForShips: checkColForShips,
    convertBoardToHtml: convertBoardToHtml,
    areValidCoordinates: areValidCoordinates,
    checkForHit: checkForHit,
    cheat: cheatConvertBoardToHtml
}