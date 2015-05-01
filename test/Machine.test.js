var assert = require("assert");
var Machine = require('../index').Machine;
var Transition = require('../index').Transition;
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
            var transitionName = "transition";
            var transition = new Transition(transitionName);
            var machine = new Machine(machineName);
            machine.addTransition(transition);
            assert.equal(1, machine.getTransitions().length);
        });
    });
});