var controllers = require('../controllers');

module.exports = function (app){
    app.get('/', controllers.game.getBoard);
    app.post('/', controllers.game.makeGuess);
    app.get('*', controllers.game.getBoard);
};