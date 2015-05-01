var m = require('./constants');

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

Transition.prototype.getImplementation = function(){
  return this.implementation;
};

Transition.prototype.setImplementation = function(implementation){
  if(!(typeof implementation === "function")) throw new Error(m.ERR_MSG_3);
  this.implementation = implementation;
};

function Transition(name, initialState, finalState, implementation) {
    if (!name) throw new Error(m.ERR_MSG_4);
    this.name = name;
    this.initialState = initialState;
    this.finalState = finalState;
    this.implementation = implementation;
}

module.exports = {
    Transition : Transition
};