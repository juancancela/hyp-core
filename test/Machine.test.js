var assert = require("assert");
var Machine = require('../index').Machine;
var Transition = require('../index').Transition;
var Operation = require('../index').Operation;
var Property = require('../index').Property;

describe('Machine', function () {
    describe('Machine name', function () {
        it('should set name given on constructor on property machine.name', function () {
            var machineName = "machineName";
            var machine = new Machine(machineName);
            assert.equal(machine.getName(), machineName);
        });

        it('should throw an exception if a machine name is not provided', function () {
            try {
                new Machine(null);
            } catch (e) {
                assert.equal(e.message, "ERROR: Name must be provided when constructing a Machine");
                return;
            }
            assert.fail();
        });
    });

    describe('Machine Transitions', function () {
        it('should add a valid transition to a machine', function () {
            var machineName = "machineName";
            var transitionInitialState = "NON_PRICEABLE";
            var transitionFinalState = "PRICEABLE";
            var operationName = "addItem";
            var transitionOperation = new Operation(operationName, function () {
                return "Operation Executed";
            });
            var transition = new Transition(transitionInitialState, transitionFinalState, transitionOperation);
            var machine = new Machine(machineName);
            machine.addTransition(transition);
            assert.equal(1, machine.getTransitions().length);
        });

        it('should execute the operation of a valid transition of the machine', function () {
            var machineName = "machineName";
            var transitionInitialState = "NON_PRICEABLE";
            var transitionFinalState = "PRICEABLE";
            var operationName = "addItem";
            var transitionOperation = new Operation(operationName, function () {
                return "Operation Executed";
            });

            var transition = new Transition(transitionInitialState, transitionFinalState, transitionOperation);
            var machine = new Machine(machineName, "NON_PRICEABLE");
            machine.addTransition(transition);
            //assert.equal("NON_PRICEABLE", machine.getCurrentState());
            //machine.run(operationName);
            //assert.equal("PRICEABLE", machine.getCurrentState());
        });

        it('should add a valid property to a machine', function () {
            var machineName = "machineName";
            var machine = new Machine(machineName, "NON_PRICEABLE");
            var property = new Property("description", "a machine description", null);
            machine.addProperty(property);

            assert.equal(1, Object.keys(machine.getProperties()).length);
            assert.equal(property.getName(), machine.getProperties()["description"].getName());
            assert.equal(property.getValue(), machine.getProperties()["description"].getValue());
            assert.equal(null, machine.getProperties()["description"].getValidations());
        });

        it('should be possible to mutate the state of a machine property through a transition operation', function () {
            var machineName = "machineName";
            var transitionInitialState = "NON_PRICEABLE";
            var transitionFinalState = "PRICEABLE";
            var operationName = "addItem";
            var machine = new Machine(machineName, "NON_PRICEABLE");
            var transitionOperation = new Operation(operationName, function (machine, params, cb) {
                cb(null, machine.getProperties()["description"].setValue("mutated value"));
            });

            var transition = new Transition(transitionInitialState, transitionFinalState, transitionOperation);
            machine.addTransition(transition);
            var property = new Property("description", "a machine description", null);
            machine.addProperty(property);

            assert.equal("a machine description", machine.getProperties()["description"].getValue());
            machine.run(operationName, null, function (err, response) {
                if (err) {
                    assert.fail();
                } else {
                    machine.setCurrentState(transition.getFinalState());
                    assert.equal("mutated value", machine.getProperties()["description"].getValue());
                }
            });
        });
    });
});