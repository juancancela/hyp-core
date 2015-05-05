var assert = require("assert");
var StateTransitionExpression = require('../index').StateTransitionExpression;

describe('State Transition Expression', function () {
    describe('Validate expression creation without blank spaces', function () {
        it('should return initialState when called getInitialState(), and finalState when called getFinalState() giving a expression operation:initialState->finalState', function () {
            var expression = "operation:initialState->finalState";
            var stateTransitionExpression = new StateTransitionExpression(expression);
            assert.equal("initialState", stateTransitionExpression.getInitialState());
            assert.equal("finalState", stateTransitionExpression.getFinalState());
        });
    });

    describe('Validate expression creation with blank spaces', function () {
        it('should return initialState when called getInitialState(), and finalState when called getFinalState() giving a expression  operation:initialState  ->  finalState  ', function () {
            var expression = "  operation:initialState  ->  finalState  ";
            var stateTransitionExpression = new StateTransitionExpression(expression);
            assert.equal("initialState", stateTransitionExpression.getInitialState());
            assert.equal("finalState", stateTransitionExpression.getFinalState());
        });
    });

    describe('Validate expression creation with null expression', function () {
        it('should throw an exception explaining the error', function () {
            try {
                new StateTransitionExpression(null);
            } catch (e) {
                assert.equal(e.message, "ERROR: StateTransitionExpression cannot be null or empty");
                return;
            }
            assert.fail();
        });
    });

    describe('Validate expression creation with invalid expression (missed -> token)', function () {
        it('should throw an exception explaining the error', function () {
            try {
                var invalidExpressionMissedToken = "initialState finalState";
                new StateTransitionExpression(invalidExpressionMissedToken);
            } catch (e) {
                assert.equal(e.message, "ERROR: StateTransitionExpression misses -> character. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
                return;
            }
            assert.fail();
        });
    });

    describe('Validate expression creation with invalid expression (missed initial state)', function () {
        it('should throw an exception explaining the error', function () {
            try {
                var invalidExpressionMissedOperation = "->finalState";
                new StateTransitionExpression(invalidExpressionMissedOperation);
            } catch (e) {
                assert.equal(e.message, "ERROR: StateTransitionExpression misses : character. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
                return;
            }
            assert.fail();
        });
    });

    describe('Validate expression creation with invalid expression (missed final state)', function () {
        it('should throw an exception explaining the error', function () {
            try {
                var invalidExpressionMissedFinalState = "operation:initialState->";
                new StateTransitionExpression(invalidExpressionMissedFinalState);
            } catch (e) {
                assert.equal(e.message, "ERROR: StateTransitionExpression misses FINAL_STATE. Expected structure: OPERATION_NAME:INITIAL_STATE->FINAL_STATE");
                return;
            }
            assert.fail();
        });
    });

});