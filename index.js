/**
 * Public Interface
 * @type {Function}
 */
module.exports = {
    Machine                   : require('./lib/Machine').Machine,
    Transition                : require('./lib/Transition').Transition,
    StateTransitionExpression : require('./lib/StateTransitionExpression').StateTransitionExpression,
    Operation                 : require('./lib/Operation').Operation
};
