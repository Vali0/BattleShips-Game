var BOARD_SIZE = 10,
    SHOTS = 0,
    LIVES = 13,
    COOKIE_NAME = 'battleships',
    environment = require('./gameEnvironment'),
    gameLogic = require('./gameLogic');

function setCookie(res, board, shots, lives) {
    res.cookie('battleships', JSON.stringify({
            board: board,
            shots: shots,
            lives: lives
        }),
        { expires: new Date(Date.now() + (3600 * 1000)) }
    );
}

module.exports = {
    getBoard: function (req, res, next) {
        var board,
            requestCookie = req.cookies[COOKIE_NAME],
            cookieData;

        if (!requestCookie) {
            board = environment.generateBoard(BOARD_SIZE);
            environment.generateShips(board, BOARD_SIZE);
            setCookie(res, board, SHOTS, LIVES);
        } else {
            cookieData = JSON.parse(requestCookie);
            board = cookieData['board'];
        }

        var field = gameLogic.convertBoardToHtml(board);
        res.render('index', { board: field });
    },
    makeGuess: function (req, res, next) {
        var coordinates = req.body['coordinates'].toUpperCase(),
            cookieData = JSON.parse(req.cookies[COOKIE_NAME]),
            board = cookieData['board'],
            shots = cookieData['shots'],
            lives = cookieData['lives'];

        if (coordinates === 'SHOW') {
            var field = gameLogic.cheat(board);
            res.render('index', { board: field });
        } else {
            var tokens = coordinates.split(' '),
                row = tokens[0].charCodeAt(0) - 65,
                col = tokens[1] - 1;

            if (gameLogic.areValidCoordinates(row, col, BOARD_SIZE)) {
                var shotStatistics = gameLogic.checkForHit(board, BOARD_SIZE, row, col, lives);
                shots++;
                lives = shotStatistics[1];

                if (lives <= 0) {
                    res.clearCookie(COOKIE_NAME);
                    req.session.message = 'Congratulations you won with ' + shots + ' shots!';
                } else {
                    req.session.message = shotStatistics[0];
                    setCookie(res, board, shots, lives);
                }
            } else {
                req.session.message = 'Wrong coordinates!';
            }

            res.redirect('/');
        }
    }
};