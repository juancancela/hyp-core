var m = require('./constants');
const expressionToken = "->";

StateTransitionExpression.prototype.getInitialState = function () {
    return this.initialState;
};

StateTransitionExpression.prototype.getFinalState = function () {
    return this.finalState;
};

function StateTransitionExpression(expression){
    if (!expression) throw new Error(m.ERR_MSG_5);
    if (expression.indexOf(expressionToken) == -1) throw new Error(m.ERR_MSG_6);
    var expression = expression.split(expressionToken);

    this.initialState = expression[0].replace(/ /g,'');
    this.finalState = expression[1].replace(/ /g,'');

    if(this.initialState.length == 0 && this.finalState.length == 0) throw new Error(m.ERR_MSG_9);
    if(this.initialState.length == 0) throw new Error(m.ERR_MSG_7);
    if(this.finalState.length == 0) throw new Error(m.ERR_MSG_8);
}

module.exports = {
    StateTransitionExpression : StateTransitionExpression
};