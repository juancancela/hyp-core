function Vertex(name){
  if(!name) throw new Error("ERROR: Name must be provided when constructing a vertex");
  this.name = name;
}

Graph.prototype.addVertex = function(vertex){
  if(!(vertex instanceof Vertex)) throw new Error("ERROR: Only Vertex instances can be added");
  this.vertices.push(vertex);
};

Graph.prototype.getVertices = function(){
  return this.vertices;
};

function Graph(name){
  if(!name) throw new Error("ERROR: Name must be provided when constructing a graph");

  this.name = name;
  this.edges = [];
  this.vertices = [];
}

/**
 * Public Interface
 * @type {Function}
 */
module.exports = {
  Graph : Graph,
  Vertex : Vertex
};
