/**
 * @param name the name of the operation
 * @param implementation the implementation of the operation (a function to be executed when operation is invoked)
 * @constructor
 */
function Operation(name, implementation){
    if (!name) throw new Error("ERROR: Name must be provided when constructing an Operation");
    if (!implementation || !(typeof implementation === "function")) throw new Error("ERROR: Value must be provided when constructing an Operation, and it must be a function");

    this._name = name;
    this._implementation = implementation;
}

/**
 * @returns {*} the name of the operation
 */
Operation.prototype.getName = function(){
    return this._name;
};

/**
 * @returns {*} the implementation of the operation
 */
Operation.prototype.getImplementation = function(){
    return this._implementation;
};

/**
 * Executes the implementation of the operation
 * @param machine the machine where operation will be executed
 * @param parameters the optional paramaters required for the operation execution
 * @returns {*}
 */
Operation.prototype.execute = function(machine, parameters){
    if(!machine) throw new Error("Error: Machine where operation would be executed is not defined");
    return this._implementation(machine, parameters);
};

/**
 * Public Interface
 * @type {{Operation: Operation}}
 */
module.exports = {
    Operation : Operation
};