var assert = require("assert");
var StateTransitionExpression = require('../index').StateTransitionExpression;
var m = require('../lib/constants');

describe('State Transition Expression', function () {
    describe('Validate expression creation without blank spaces', function(){
        it('should return initialState when called getInitialState(), and finalState when called getFinalState() giving a expression initialState->finalState', function(){
            var expression = "initialState->finalState";
            var stateTransitionExpression = new StateTransitionExpression(expression);
            assert.equal("initialState", stateTransitionExpression.getInitialState());
            assert.equal("finalState", stateTransitionExpression.getFinalState());
        });
    });

    describe('Validate expression creation with blank spaces', function(){
        it('should return initialState when called getInitialState(), and finalState when called getFinalState() giving a expression  initialState  ->  finalState  ', function(){
            var expression = "  initialState  ->  finalState  ";
            var stateTransitionExpression = new StateTransitionExpression(expression);
            assert.equal("initialState", stateTransitionExpression.getInitialState());
            assert.equal("finalState", stateTransitionExpression.getFinalState());
        });
    });

    describe('Validate expression creation with null expression', function(){
        it('should throw an exception explaining the error', function(){
            try{
                new StateTransitionExpression(null);
            } catch(e){
                assert.equal(e.message, m.ERR_MSG_5);
                return;
            }
            assert.fail();
        });
    });

    describe('Validate expression creation with invalid expression (missed -> token)', function(){
        it('should throw an exception explaining the error', function(){
            try{
                var invalidExpressionMissedToken = "initialState finalState";
                new StateTransitionExpression(invalidExpressionMissedToken);
            } catch(e){
                assert.equal(e.message, m.ERR_MSG_6);
                return;
            }
            assert.fail();
        });
    });

    describe('Validate expression creation with invalid expression (missed initial state)', function(){
        it('should throw an exception explaining the error', function(){
            try{
                var invalidExpressionMissedInitialState = "->finalState";
                new StateTransitionExpression(invalidExpressionMissedInitialState);
            } catch(e){
                assert.equal(e.message, m.ERR_MSG_7);
                return;
            }
            assert.fail();
        });
    });

    describe('Validate expression creation with invalid expression (missed final state)', function(){
        it('should throw an exception explaining the error', function(){
            try{
                var invalidExpressionMissedFinalState = "initialState->";
                new StateTransitionExpression(invalidExpressionMissedFinalState);
            } catch(e){
                assert.equal(e.message, m.ERR_MSG_8);
                return;
            }
            assert.fail();
        });
    });

});