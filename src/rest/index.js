"use strict";
exports.__esModule = true;
exports.runDatabaseAPIService = void 0;
var express = require('express');
var db = require('./queries');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var runDatabaseAPIService = function () {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.get('/', function (request, response) {
        response.json({ info: 'Node.js, Express, and Postgres API' });
    });
    app.get('/modelanswer/', db.getModelAnswers);
};
exports.runDatabaseAPIService = runDatabaseAPIService;
app.listen(port, function () {
    console.log('App runing on port ' + port);
});
