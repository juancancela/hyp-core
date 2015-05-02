var m = require('./constants');
const expressionToken = "->";
const operationToken = ":";

StateTransitionExpression.prototype.getInitialState = function () {
    return this.initialState;
};

StateTransitionExpression.prototype.getFinalState = function () {
    return this.finalState;
};

StateTransitionExpression.prototype.getName = function () {
    return this.name;
};

function StateTransitionExpression(expression){
    if (!expression) throw new Error(m.ERR_MSG_5);
    if (expression.indexOf(expressionToken) == -1) throw new Error(m.ERR_MSG_6);
    if (expression.indexOf(operationToken) == -1) throw new Error(m.ERR_MSG_12);
    var stringExpression = expression;
    expression = expression.replace(operationToken, expressionToken);
    expression = expression.split(expressionToken);

    this.operation = expression[0].replace(/ /g,'');
    this.initialState = expression[1].replace(/ /g,'');
    this.finalState = expression[2].replace(/ /g,'');
    this.name = stringExpression;

    if(this.initialState.length == 0 && this.finalState.length == 0) throw new Error(m.ERR_MSG_9);
    if(this.initialState.length == 0) throw new Error(m.ERR_MSG_7);
    if(this.finalState.length == 0) throw new Error(m.ERR_MSG_8);
    if(this.operation.length == 0) throw new Error(m.ERR_MSG_13);
}

module.exports = {
    StateTransitionExpression : StateTransitionExpression,
    expressionToken           : expressionToken,
    operationToken            : operationToken
};