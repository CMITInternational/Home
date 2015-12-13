/* eslint no-console: 0 */
///<reference path="./typings/tsd.d.ts"/>
var express = require('express');
var cors = require('cors');
var falcorExpress = require('falcor-express');
var bodyParser = require('body-parser');
var todo_router_1 = require('./todo-router');
var port = process.env.PORT != null ? process.env.PORT : 60266;
var app = express();
app.use(cors({
    origin: 'http://localhost:50814',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/model.json', falcorExpress.dataSourceRoute(function () { return new todo_router_1["default"](); }));
console.log('port => ' + port);
app.listen(port);
