var Transition = require('./Transition').Transition;

Machine.prototype.addTransition = function (transition) {
    if (!(transition instanceof Transition)) throw new Error("ERROR: Only Transition instances can be added");
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

Machine.prototype.run = function (transitionExpression, operationParameters) {
    var machine = this;
    this.getAvailableTransitions().forEach(function (transition) {
        if(transition.getName() === transitionExpression){
            transition.getOperation().execute(machine, operationParameters);
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

Machine.prototype.getProperties = function(){
    return this.properties;
};

Machine.prototype.setProperties = function(properties){
    this.properties = properties;
};

Machine.prototype.addProperty = function(property){
    if(!this.properties){
        this.properties = {};
    }
    this.properties[property.getName()] = property;
};

function Machine(name, initialState, transitions, properties) {
    if (!name) throw new Error("ERROR: Name must be provided when constructing a Machine");

    this.name = name;
    this.initialState = initialState || null;
    this.transitions = transitions || [];
    this.currentState = initialState;
    this.properties = properties;
}

module.exports = {
    Machine: Machine
};