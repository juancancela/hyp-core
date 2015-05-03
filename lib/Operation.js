Operation.prototype.getName = function(){
    return this.name;
};

Operation.prototype.getImplementation = function(){
    return this.implementation;
};

Operation.prototype.execute = function(machine, parameters){
    return this.implementation(machine, parameters);
};

function Operation(name, implementation){
    this.name = name;
    this.implementation = implementation;
}

module.exports = {
    Operation : Operation
};