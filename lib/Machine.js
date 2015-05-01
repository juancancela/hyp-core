var Transition = require('./Transition').Transition;
var StateTransitionExpression = require('./StateTransitionExpression').StateTransitionExpression;
var m = require('./constants');

Machine.prototype.addTransition = function (transition) {
    if (!(transition instanceof Transition)) throw new Error(m.ERR_MSG_1);
    this.transitions.push(transition);
};

Machine.prototype.getTransitions = function () {
    return this.transitions;
};

Machine.prototype.getStates = function () {
    return this.states;
};

Machine.prototype.run = function (stateTransitionExpression) {
    var expression = new StateTransitionExpression(stateTransitionExpression);
    this.transitions.forEach(function (t) {
        if (t.getInitialState() == expression.getInitialState() && t.getFinalState() == expression.getFinalState()) {
            t.getImplementation()();
        }
    });
};

function Machine(name, initialState, transitions) {
    if (!name) throw new Error(m.ERR_MSG_2);

    this.name = name;
    this.initialState = initialState || null;
    this.transitions = transitions || [];
}

module.exports = {
    Machine: Machine
};