var express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();
var config = require('./server/config/config')[env];

require(config.rootPath + '/server/config/express')(app, config);
require(config.rootPath + '/server/config/routes')(app);

app.listen(config.port);
console.log("Server running on port: " + config.port);