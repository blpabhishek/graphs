'use strict';
var graph = {};


graph.UndirectedGraph = function() {
    this.graph = {}
    this._order = 0;
    this._size = 0;
};

graph.DirectedGraph = function() {
    this.graph = {};
    this._order = 0;
    this._size = 0;
};

graph.DirectedGraph.prototype = {
    addVertex: function(vertex) {
        this.graph[vertex] = [];
        this._order++;
    },
    addEdge: function(from, to) {
        if (!this.graph[from]) return;
        if (!this.graph[to]) this.addVertex(to);
        this.graph[from].push(to);
        this._size++;
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
    }
};

graph.UndirectedGraph.prototype = {
    addVertex: function(vertex) {
        this.graph[vertex] = [];
        this._order++;
    },
    addEdge: function(from, to) {
        if (!this.graph[from]) return;
        if (!this.graph[to]) this.addVertex(to);
        this.graph[from].push(to);
        this.graph[to].push(from);
        this._size++;
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
        if (from == to)
            return visiting.concat(from);
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
    }
};
module.exports = graph;
