var assert = require("assert");
var Operation = require('../index').Operation;

describe('Operation', function () {
    it('should create an Operation if all required parameters are provided', function () {
        var name = "operationName";
        var implementation = function () {
            return "operation result";
        };
        var operation = new Operation(name, implementation);

        assert.equal(name, operation.getName());
        assert.equal("operation result", operation.getImplementation()());
    });

    it('should fail if no machine is provided when executing operation', function () {
        var name = "operationName";
        var implementation = function () {
            return "operation result";
        };
        try {
            new Operation(name, implementation).execute(null, null);
        } catch (e) {
            assert.equal("Error: Machine where operation would be executed is not defined", e.message);
        }
    });

    it('should fail if no name is provided when constructing operation', function () {
        try {
            new Operation(null, null);
        } catch (e) {
            assert.equal("ERROR: Name must be provided when constructing an Operation", e.message);
        }
    });

    it('should fail if no implementation is provided when constructing operation', function () {
        var name = "operationName";
        try {
            new Operation(name, null);
        } catch (e) {
            assert.equal("ERROR: Value must be provided when constructing an Operation, and it must be a function", e.message);
        }
    });

    it('should fail if provided implementation is not a function', function () {
        var name = "operationName";
        var noFunctionImplementation = "hello";
        try {
            new Operation(name, noFunctionImplementation);
        } catch (e) {
            assert.equal("ERROR: Value must be provided when constructing an Operation, and it must be a function", e.message);
        }
    });
});