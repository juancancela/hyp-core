var assert = require("assert");
var Machine = require('../index').Machine;
var Transition = require('../index').Transition;
var Operation = require('../index').Operation;
var m = require('../lib/constants');

describe('Machine tests', function () {
    describe('Machine name', function () {
        it('should set name given on constructor on property machine.name', function () {
            var machineName = "machineName";
            var machine = new Machine(machineName);
            assert.equal(machine.name, machineName);
        });

        it('should throw an exception if a machine name is not provided', function () {
            try {
                new Machine(null);
            } catch (e) {
                assert.equal(e.message, m.ERR_MSG_2);
                return;
            }
            assert.fail();
        });
    });

    describe('Machine Transitions', function(){
        it('should add a valid transition to a machine', function(){
            var machineName = "machineName";
            var transitionInitialState = "NON_PRICEABLE";
            var transitionFinalState = "PRICEABLE";
            var operationName = "addItem";
            var transitionOperation = new Operation(operationName, function(){
               return "Operation Executed";
            });
            var transition = new Transition(transitionInitialState, transitionFinalState, transitionOperation);
            var machine = new Machine(machineName);
            machine.addTransition(transition);
            assert.equal(1, machine.getTransitions().length);
        });

        it('should execute the operation of a valid transition of the machine', function(){
            var machineName = "machineName";
            var transitionInitialState = "NON_PRICEABLE";
            var transitionFinalState = "PRICEABLE";
            var operationName = "addItem";
            var transitionOperation = new Operation(operationName, function(){
                return "Operation Executed";
            });
            var transition = new Transition(transitionInitialState, transitionFinalState, transitionOperation);
            var machine = new Machine(machineName, "NON_PRICEABLE");
            machine.addTransition(transition);
            assert.equal("NON_PRICEABLE", machine.getCurrentState());
            machine.run("addItem:NON_PRICEABLE->PRICEABLE");
            assert.equal("PRICEABLE", machine.getCurrentState());
        });

        it('should execute the operation of a valid transition of the machine, and be able to modify properties of that machine', function(){
            var machineName = "machineName";
            var transitionInitialState = "NON_PRICEABLE";
            var transitionFinalState = "PRICEABLE";
            var operationName = "addItem";
            var transitionOperation = new Operation(operationName, function(){
                return "Operation Executed";
            });
            var transition = new Transition(transitionInitialState, transitionFinalState, transitionOperation);
            var machine = new Machine(machineName, "NON_PRICEABLE");
            machine.addTransition(transition);
            assert.equal("NON_PRICEABLE", machine.getCurrentState());
            machine.run("addItem:NON_PRICEABLE->PRICEABLE");
            assert.equal("PRICEABLE", machine.getCurrentState());
        });
    });
});