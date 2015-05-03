var StateTransitionExpression = require('./StateTransitionExpression').StateTransitionExpression;
var expressionToken = require('./StateTransitionExpression').expressionToken;
var operationToken = require('./StateTransitionExpression').operationToken;

Transition.prototype.getInitialState = function () {
    return this.initialState;
};

Transition.prototype.setInitialState = function (initialState) {
    this.initialState = initialState;
};

Transition.prototype.getFinalState = function () {
    return this.finalState;
};

Transition.prototype.setFinalState = function (finalState) {
    this.finalState = finalState;
};

Transition.prototype.getOperation = function(){
  return this.operation;
};

Transition.prototype.setOperation = function(operation){
  if(!(typeof operation === "function")) throw new Error("ERROR: Operation of a transition must be a function");
  this.operation = operation;
};

Transition.prototype.getName = function(){
    return this.name;
};

function Transition(initialState, finalState, operation) {
    if (!initialState) throw new Error("ERROR: Initial state must be provided when constructing a transition");
    if (!finalState) throw new Error("ERROR: Final state must be provided when constructing a transition");
    if (!(operation.constructor.name == "Operation")) throw new Error("ERROR: Operations must be of type Operation");

    this.name = new StateTransitionExpression(operation.getName()+operationToken+initialState+expressionToken+finalState).getName();
    this.initialState = initialState;
    this.finalState = finalState;
    this.operation = operation;
}

module.exports = {
    Transition : Transition
};