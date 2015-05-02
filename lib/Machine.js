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

Machine.prototype.getCurrentState = function(){
    return this.currentState;
};

Machine.prototype.setCurrentState = function(currentState){
  return this.currentState = currentState;
};

Machine.prototype.run = function (transitionExpression) {
    var machine = this;
    this.getAvailableTransitions().forEach(function (transition) {
        if(transition.getName() === transitionExpression){
            transition.getOperation().getImplementation()();
            machine.currentState = transition.getFinalState();
        }
    });
};

Machine.prototype.getAvailableTransitions = function () {
    var availableTransitions = [];
    var machine = this;
    this.transitions.forEach(function (transition) {
        if (machine.currentState === transition.initialState) {
            availableTransitions.push(transition);
        }
    });
    return availableTransitions;
};

function Machine(name, initialState, transitions, properties) {
    if (!name) throw new Error(m.ERR_MSG_2);

    this.name = name;
    this.initialState = initialState || null;
    this.transitions = transitions || [];
    this.currentState = initialState;
    this.properties = properties;
}

module.exports = {
    Machine: Machine
};