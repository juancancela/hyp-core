var StateTransitionExpression = require('./StateTransitionExpression').StateTransitionExpression;
var expressionToken = require('./StateTransitionExpression').expressionToken;
var operationToken = require('./StateTransitionExpression').operationToken;


/**
 * Transition Implementation
 * @param initialState Initial State of the transition
 * @param finalState final state of the transition
 * @param operation operation to be executed to achieve transition from initial to final state
 * @constructor
 */
function Transition(initialState, finalState, operation) {
    if (!initialState) throw new Error("ERROR: Initial state must be provided when constructing a transition");
    if (!finalState) throw new Error("ERROR: Final state must be provided when constructing a transition");
    if (!operation || !operation.constructor || !(operation.constructor.name == "Operation")) throw new Error("ERROR: Operations must be of type Operation");

    this._name = new StateTransitionExpression(operation.getName() + operationToken + initialState + expressionToken + finalState).getName();
    this._initialState = initialState;
    this._finalState = finalState;
    this._operation = operation;
}

/**
 * @returns {*} the initial state of the transition
 */
Transition.prototype.getInitialState = function () {
    return this._initialState;
};

/**
 * @param initialState the initial state of the transition
 */
Transition.prototype.setInitialState = function (initialState) {
    this._initialState = initialState;
};

/**
 * @returns {*} the initial state of the transition
 */
Transition.prototype.getFinalState = function () {
    return this._finalState;
};

/**
 * @param finalState the final state of the transition
 */
Transition.prototype.setFinalState = function (finalState) {
    this._finalState = finalState;
};

/**
 * @returns {*} the operation of the transition
 */
Transition.prototype.getOperation = function () {
    return this._operation;
};

/**
 * @param operation the operation of the transition
 */
Transition.prototype.setOperation = function (operation) {
    if (!(typeof operation === "function")) throw new Error("ERROR: Operation of a transition must be a function");
    this._operation = operation;
};

/**
 * @returns {*|stringExpression|*} the name of the transition
 */
Transition.prototype.getName = function () {
    return this._name;
};

/**
 * Public Interface
 * @type {{Transition: Transition}} Transition object
 */
module.exports = {
    Transition: Transition
};