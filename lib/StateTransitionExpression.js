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
    if (!expression) throw new Error("ERROR: StateTransitionExpression cannot be null or empty");
    if (expression.indexOf(expressionToken) == -1) throw new Error("ERROR: StateTransitionExpression misses -> character. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    if (expression.indexOf(operationToken) == -1) throw new Error("ERROR: StateTransitionExpression misses : character. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    var stringExpression = expression;
    expression = expression.replace(operationToken, expressionToken);
    expression = expression.split(expressionToken);

    this.operation = expression[0].replace(/ /g,'');
    this.initialState = expression[1].replace(/ /g,'');
    this.finalState = expression[2].replace(/ /g,'');
    this.name = stringExpression;

    if(this.initialState.length == 0 && this.finalState.length == 0) throw new Error("ERROR: StateTransitionExpression misses INITIAL_STATE and FINAL_STATE. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    if(this.initialState.length == 0) throw new Error("ERROR: StateTransitionExpression misses INITIAL_STATE. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    if(this.finalState.length == 0) throw new Error("ERROR: StateTransitionExpression misses FINAL_STATE. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    if(this.operation.length == 0) throw new Error("ERROR: StateTransitionExpression misses OPERATION_NAME. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
}

module.exports = {
    StateTransitionExpression : StateTransitionExpression,
    expressionToken           : expressionToken,
    operationToken            : operationToken
};