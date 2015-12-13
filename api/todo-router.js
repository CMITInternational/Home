var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsonGraph = require('falcor-json-graph');
var router = require('falcor-router');
var _ = require('underscore');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;
var todos = [
    {
        name: 'get milk from corner store',
        done: false
    },
    {
        name: 'froth milk',
        done: false
    },
    {
        name: 'make coffee',
        done: false
    }
];
var TodoRouterBase = (function (_super) {
    __extends(TodoRouterBase, _super);
    function TodoRouterBase() {
        _super.call(this);
    }
    return TodoRouterBase;
})(router.createClass([{
        route: "todos.length",
        get: function () {
            return { path: ["todos", "length"], value: todos.length };
        }
    },
    {
        route: "todos[{integers:ids}].['name','done']",
        get: function (pathSet) {
            var results = [];
            pathSet.ids.forEach(function (id) {
                console.log('todoRouter[get] => id=' + id);
                var task = todos[id];
                pathSet[2].forEach(function (key) {
                    results.push({
                        path: ['todos', id, key],
                        value: todos[id][key]
                    });
                });
            });
            return results;
        },
        set: function (jsonGraphArg) {
            console.log('todoRouter[set] => ' + JSON.stringify(jsonGraphArg));
            var jsonGraphArg2 = jsonGraphArg['todos'];
            console.log('todoRouter[set] => todosUpdate=' + JSON.stringify(jsonGraphArg2));
            var results = [];
            _.each(jsonGraphArg2, function (todo, id) {
                console.log('todoRouter[set return] => id=' + id);
                _.each(todo, function (val, prop) {
                    console.log('todoRouter[set return] => key=' + prop + ' value=' + val);
                    todos[id][prop] = val;
                    results.push({
                        path: ['todos', id, prop],
                        value: val
                    });
                });
            });
            console.log('todoRouter[set return] => ' + JSON.stringify(results));
            return results;
        }
    }
]));
exports["default"] = TodoRouterBase;
