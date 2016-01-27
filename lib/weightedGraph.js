var graphs = require('./graph');
var ld = require('lodash');
graphs.Edge = function(name, from, to, weight) {
    this._name = name;
    this._from = from;
    this._to = to;
    this._weight = weight;
};

graphs.WeightedGraph = function() {
    this.graph = {};
    this._order = 0;
    this._size = 0;
};

graphs.WeightedGraph.prototype = Object.create(graphs.Graph.prototype);

graphs.WeightedGraph.prototype.addEdge = function(edge) {
    this.graph[edge._from].push(edge);
    this._size++;
};

var getAdjcentEdges = function(vertex, graph) {
    var arr = [];
    for (var i in graph[vertex])
        arr.push(graph[vertex][i]);
    return arr;
};

var findMinimalVertex = function(distance, allVertex) {
    var key = allVertex[0];
    var min = distance[key];
    for (var i = 0; i < allVertex.length; i++) {
        if (min > distance[allVertex[i]]) {
            min = distance[allVertex[i]];
            key = allVertex[i];
        }
    };
    return key;
};

graphs.WeightedGraph.prototype.shortestPath = function(from, to) {
    var parent = {},distance = {},path = [];
    var allVertices = Object.keys(this.graph);
    var tempParent = to;
    allVertices.forEach(function(k){distance[k] = Infinity;});
    parent[from] = from;
    distance[from] =0;
    while (allVertices.length) {
        var vertexToProcess = findMinimalVertex(distance, allVertices);
        ld.remove(allVertices, function(k) {return vertexToProcess == k;});
        var adjcentEdges = getAdjcentEdges(vertexToProcess, this.graph);
        adjcentEdges.forEach(function(edge) {
            if (distance[edge._to] > (distance[vertexToProcess] + edge._weight)) {
                distance[edge._to] = distance[vertexToProcess] + edge._weight;
                parent[edge._to] = vertexToProcess;
            }
        });
    };
    while (tempParent != from) {
    	var vertex = parent[tempParent];
        var edges = getAdjcentEdges(vertex,this.graph);
        edges = edges.filter(function(edge){ return edge._to == tempParent});
        var edge = edges.reduce(function(a,b){ return a._weight < b._weight?a:b;});
        path.push(edge);
        tempParent = vertex;
    }
    return path.reverse();
};

module.exports = graphs;
