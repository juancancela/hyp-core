var assert = require("assert");
var Transition = require('../index').Transition;
var Operation = require('../index').Operation;

describe('Transition', function () {
    it('should create a Transition if all required parameters are provided', function () {
        var initialState = "INITIAL_STATE";
        var finalState = "FINAL_STATE";
        var name = "operationName";
        var implementation = function(){
            return "operation result";
        };

        var operation = new Operation(name, implementation);
        var transition = new Transition(initialState, finalState, operation);

        assert.equal(initialState, transition.getInitialState());
        assert.equal(finalState, transition.getFinalState());
    });

    it('should fail to create a Transition object if the provided operation is not of type Operation', function(){
        var initialState = "INITIAL_STATE";
        var finalState = "FINAL_STATE";
        try{
            new Transition(initialState, finalState, []);
        } catch(e){
            assert.equal("ERROR: Operations must be of type Operation", e.message);
            return;
        }
        assert.fail();
    });

    it('should fail to create a Transition object if the provided operation is null', function(){
        var initialState = "INITIAL_STATE";
        var finalState = "FINAL_STATE";
        try{
            new Transition(initialState, finalState, null);
        } catch(e){
            assert.equal("ERROR: Operations must be of type Operation", e.message);
            return;
        }
        assert.fail();
    });
});