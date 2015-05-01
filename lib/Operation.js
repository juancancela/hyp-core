Operation.prototype.getName = function(){
    return this.name;
};

Operation.prototype.getImplementation = function(){
    return this.implementation;
};

function Operation(name, implementation){
    this.name = name;
    this.implementation = implementation;
}

module.exports = {
    Operation : Operation
};