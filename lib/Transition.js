var m = require('./constants');
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
  if(!(typeof operation === "function")) throw new Error(m.ERR_MSG_3);
  this.operation = operation;
};

function Transition(initialState, finalState, operation) {
    if (!initialState) throw new Error(m.ERR_MSG_4);
    if (!finalState) throw new Error(m.ERR_MSG_10);
    if (!(typeof operation === "Operation")) throw new Error(m.ERR_MSG_11);

    this.name = StateTransitionExpression(operation.getName()+operationToken+initialState+expressionToken+finalState);
    this.initialState = initialState;
    this.finalState = finalState;
    this.operation = operation;
}

module.exports = {
    Transition : Transition
};