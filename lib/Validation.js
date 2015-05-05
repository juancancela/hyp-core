/**
 * Validation function used to assert structure and value of Machine's properties
 * @param name the name of the validation
 * @param implementation the implementation (must be a function)
 * @constructor
 */
function Validation(name, implementation){
    if (!name) throw new Error("ERROR: Name must be provided when constructing a Validation");
    if (!implementation || !(typeof implementation === "function")) throw new Error("ERROR: Value must be provided when constructing a Validation, and it must be a function");

    this._name = name;
    this._implementation = implementation;
}

/**
 * @returns {*} the name of the validation
 */
Validation.prototype.getName = function(){
    return this._name;
};

/**
 * @returns {*} the implementation function of the validation
 */
Validation.prototype.getImplementation = function(){
    return this._implementation;
};

/**
 * Validates a given value
 * @param value value to be validated
 * @returns {*} TRUE if validation is successful, otherwise FALSE
 */
Validation.prototype.validate = function(value){
  return this._implementation(value);
};

/**
 * Public Interface
 * @type {{Validation: Validation}} Validation function object for Machine properties
 */
module.exports = {
    Validation : Validation
};