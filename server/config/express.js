var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

module.exports = function (app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({secret: 'magic unicorns',
        resave: true, saveUninitialized: true,
        cookie: { expires: new Date(Date.now() + (3600 * 1000))
        }}));
    app.use(express.static(config.rootPath + '/public'));
    app.use(function (req, res, next) {
        if (req.session.message) {
            var msg = req.session.message;
            req.session.message = undefined;
            app.locals.serverMessage = msg;
        }
        else {
            app.locals.serverMessage = undefined;
        }

        next();
    });
};