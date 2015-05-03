Operation.prototype.getName = function(){
    return this.name;
};

Operation.prototype.getImplementation = function(){
    return this.implementation;
};

Operation.prototype.execute = function(machine, parameters){
    if(!machine) throw new Error("Error: Machine where operation would be executed is not defined");
    return this.implementation(machine, parameters);
};

function Operation(name, implementation){
    this.name = name;
    this.implementation = implementation;
}

module.exports = {
    Operation : Operation
};