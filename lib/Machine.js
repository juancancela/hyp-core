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

Machine.prototype.run = function (transition) {
    this.getAvailableTransitions().forEach(function (t) {
        if(transition.getName() === t.getName()){
            transition.getOperation().getImplementation()();
        }
    });
};

Machine.getAvailableTransitions = function () {
    var availableTransitions = [];
    this.transitions.forEach(function (transition) {
        if (this.currentState == transition.initialState) {
            availableTransitions.push(transition);
        }
    });
    return availableTransitions;
};

function Machine(name, initialState, transitions) {
    if (!name) throw new Error(m.ERR_MSG_2);

    this.name = name;
    this.initialState = initialState || null;
    this.transitions = transitions || [];
    this.currentState = null;
}

module.exports = {
    Machine: Machine
};