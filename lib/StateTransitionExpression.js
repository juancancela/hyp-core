const expressionToken = "->";
const operationToken = ":";

/**
 * @param expression the expression to be constructed
 * @constructor
 */
function StateTransitionExpression(expression){
    if (!expression) throw new Error("ERROR: StateTransitionExpression cannot be null or empty");
    if (expression.indexOf(expressionToken) == -1) throw new Error("ERROR: StateTransitionExpression misses -> character. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    if (expression.indexOf(operationToken) == -1) throw new Error("ERROR: StateTransitionExpression misses : character. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    var stringExpression = expression;
    expression = expression.replace(operationToken, expressionToken);
    expression = expression.split(expressionToken);

    this._operation = expression[0].replace(/ /g,'');
    this._initialState = expression[1].replace(/ /g,'');
    this._finalState = expression[2].replace(/ /g,'');
    this._name = stringExpression;

    if(this._initialState.length == 0 && this._finalState.length == 0) throw new Error("ERROR: StateTransitionExpression misses INITIAL_STATE and FINAL_STATE. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    if(this._initialState.length == 0) throw new Error("ERROR: StateTransitionExpression misses INITIAL_STATE. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    if(this._finalState.length == 0) throw new Error("ERROR: StateTransitionExpression misses FINAL_STATE. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
    if(this._operation.length == 0) throw new Error("ERROR: StateTransitionExpression misses OPERATION_NAME. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
}

/**
 * @returns {XML|void|string|*} the initial state of the state expression
 */
StateTransitionExpression.prototype.getInitialState = function () {
    return this._initialState;
};

/**
 * @returns {XML|void|string|*} the final state of the expression
 */
StateTransitionExpression.prototype.getFinalState = function () {
    return this._finalState;
};

/**
 * @returns {*|stringExpression} the name of the state expression
 */
StateTransitionExpression.prototype.getName = function () {
    return this._name;
};

/**
 * Public Interface
 * @type {{StateTransitionExpression: StateTransitionExpression, expressionToken: string, operationToken: string}}
 */
module.exports = {
    StateTransitionExpression : StateTransitionExpression,
    expressionToken           : expressionToken,
    operationToken            : operationToken
};