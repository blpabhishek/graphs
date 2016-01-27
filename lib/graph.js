'use strict';
var graph = {};

graph.Graph = function() {
    this.graph = {};
    this._order = 0;
    this._size = 0;
};

graph.Graph.prototype = {
    addVertex: function(vertex) {
        this.graph[vertex] = [];
        this._order++;
    },
    hasEdgeBetween: function(from, to) {
        return (this.graph[from].indexOf(to) >= 0);
    },
    order: function() {
        return this._order;
    },
    size: function() {
        return this._size;
    },
    pathBetween: function(from, to, visiting) {
        visiting = visiting || [];
        if (from == to) return visiting.concat(from);
        for (var index in this.graph[from]) {
            var vertex = this.graph[from][index];
            if (visiting.indexOf(vertex) < 0) {
                var path = this.pathBetween(vertex, to, visiting.concat(from));
                if (path[path.length - 1] == to) return path;
            }
        }
        return visiting;
    },
    farthestVertex: function(vertex) {
        var count = 0,
            last, farthVertex;
        var allVetrices = Object.keys(this.graph);
        for (var index in allVetrices) {
            count = this.pathBetween(vertex, allVetrices[index]).length;
            if (count > last) farthVertex = allVetrices[index];
            last = count;
        }
        return farthVertex;
    },
    allPaths: function(from, to, visiting, paths) {
        paths = paths || [];
        visiting = visiting || [];
        if (from == to) {
            paths.push(visiting.concat(from));
            return paths;
        }
        for (var index in this.graph[from]) {
            var vertex = this.graph[from][index];
            if (visiting.indexOf(vertex) < 0)
                this.allPaths(vertex, to, visiting.concat(from), paths);
        }
        return paths;
    }
};

graph.DirectedGraph = function() {
    this.graph = {};
    this._order = 0;
    this._size = 0;
};

graph.UndirectedGraph = function() {
    this.graph = {};
    this._order = 0;
    this._size = 0;
};

graph.DirectedGraph.prototype = Object.create(graph.Graph.prototype);
graph.UndirectedGraph.prototype = Object.create(graph.Graph.prototype);

graph.UndirectedGraph.prototype.addEdge = function(from, to) {
    if (!this.graph[from]) return;
    if (!this.graph[to]) this.addVertex(to);
    this.graph[from].push(to);
    this.graph[to].push(from);
    this._size++;
};

graph.DirectedGraph.prototype.addEdge = function(from, to) {
    if (!this.graph[from]) return;
    if (!this.graph[to]) this.addVertex(to);
    this.graph[from].push(to);
    this._size++;
};
module.exports = graph;
