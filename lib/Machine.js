var Transition = require('./Transition').Transition;
var utilities = require('./utils/utilities');

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

    if (properties) utilities.decorateWithGettersAndSetters(this, properties);
}

/**
 * Given an operation name and an option object with operation parameters, executes the operation
 * @param operationName the name of the operation to be executed
 * @param operationParameters the parameters of the operation to be executed
 * @param cb callback function
 */
Machine.prototype.run = function (operationName, operationParameters, cb) {
    var machine = this;
    machine.getAvailableTransitions().forEach(function (transition) {
        if (transition.getOperation().getName() === operationName) {
            transition.getOperation().execute(machine, operationParameters, transition, cb);
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
        if (machine.getCurrentState() === transition.getInitialState(machine)) {
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
    if (!property) return;
    this.getProperties()[property.getName()] = property;
};

/**
 * @returns {*|Array} transitions of machine
 */
Machine.prototype.getTransitions = function () {
    return this._transitions;
};

/**
 * @returns {*} current state of machine
 */
Machine.prototype.getCurrentState = function () {
    if(typeof this._currentState == "function") return this._currentState(this);
    return this._currentState;
};

/**
 * @param currentState current state of machine
 */
Machine.prototype.setCurrentState = function (currentState) {
    this._currentState = currentState;
};

/**
 * @returns {*} properties of machine
 */
Machine.prototype.getProperties = function () {
    return this._properties;
};

/**
 * @param properties properties of machine
 */
Machine.prototype.setProperties = function (properties) {
    this._properties = properties;
};

/**
 * @returns {*} name of machine
 */
Machine.prototype.getName = function () {
    return this._name;
};

/**
 * @param name name of machine
 */
Machine.prototype.setName = function (name) {
    this.setName(name);
};

/**
 * Public Interface
 * @type {{Machine: Machine}} Machine object
 */
module.exports = {
    Machine: Machine
};