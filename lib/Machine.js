var Transition = require('./Transition').Transition;

/**
 * Machine implementation
 * @param name the name of the machine
 * @param initialState the initial state of the machine
 * @param transitions the list of transitions associated to the machine
 * @param properties the list of properties attached to the machine
 * @constructor
 */
function Machine(name, initialState, transitions, properties) {
    if (!name) throw new Error("ERROR: Name must be provided when constructing a Machine");

    this._name = name;
    this._initialState = initialState || null;
    this._transitions = transitions || [];
    this._currentState = initialState;
    this._properties = properties;
}

/**
 * Given an operation name and an option object with operation parameters, executes the operation
 * @param operationName the name of the operation to be executed
 * @param operationParameters the parameters of the operation to be executed
 */
Machine.prototype.run = function (operationName, operationParameters, cb) {
    var machine = this;
    this.getAvailableTransitions().forEach(function (transition) {
        if (transition.getOperation().getName() === operationName) {
            transition.getOperation().execute(machine, operationParameters, cb);
        }
    });
};

/**
 * Returns the available transitions for a given current machine state
 * @returns {Array} available transitions (if any)
 */
Machine.prototype.getAvailableTransitions = function () {
    var availableTransitions = [];
    var machine = this;
    this.getTransitions().forEach(function (transition) {
        if (machine.getCurrentState() === transition.getInitialState()) {
            availableTransitions.push(transition);
        }
    });
    return availableTransitions;
};

/**
 * Adds a transition to the machine
 * @param transition the transition to be added to the machine
 */
Machine.prototype.addTransition = function (transition) {
    if (!(transition instanceof Transition)) throw new Error("ERROR: Only Transition instances can be added");
    this.getTransitions().push(transition);
};

/**
 * Adds a property to the machine
 * @param property the property to be added to the machine
 */
Machine.prototype.addProperty = function (property) {
    if (!this.getProperties()) this.setProperties({});
    this.getProperties()[property.getName()] = property;
};

Machine.prototype.getTransitions = function () {
    return this._transitions;
};

Machine.prototype.getCurrentState = function () {
    return this._currentState;
};

Machine.prototype.setCurrentState = function (currentState) {
    this._currentState = currentState;
};

Machine.prototype.getProperties = function () {
    return this._properties;
};

Machine.prototype.setProperties = function (properties) {
    this._properties = properties;
};

Machine.prototype.getName = function () {
    return this._name;
};

Machine.prototype.setName = function (name) {
    this.setName(name);
};

module.exports = {
    Machine: Machine
};