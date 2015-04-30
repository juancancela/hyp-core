var assert = require("assert");
var Graph = require('../index').Graph;
var Vertex = require('../index').Vertex;

describe('Graph tests', function () {
    describe('Graph name', function () {
        it('should set name given on constructor on property myGraph.name', function () {
            var graphName = "myGraphName";
            var myGraph = new Graph(graphName);
            assert.equal(myGraph.name, graphName);
        });

        it('should throw an exception if a graph name is not provided', function () {
            try {
                new Graph(null);
            } catch (e) {
                assert.equal(e.message, "ERROR: Name must be provided when constructing a graph");
                return;
            }
            assert.fail();
        });
    });

    describe('Graph Vertices', function(){
       it('should add a valid Vertex to a Graph', function(){
           var graphName = "myGraphName";
           var vertex = new Vertex("vertex");
           var myGraph = new Graph(graphName);
           myGraph.addVertex(vertex);
           assert.equal(1, myGraph.getVertices().length);
       });
    });
});