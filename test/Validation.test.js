var assert = require("assert");
var Validation = require('../index').Validation;

describe('Validation', function () {
    it('should create a Validation if all required parameters are provided', function () {
        var name = "validationName";
        var implementation = function () {
            return true;
        };
        var validation = new Validation(name, implementation);

        assert.equal(name, validation.getName());
        assert.equal(true, validation.validate());
    });


    it('should fail if no name is provided when constructing validation', function () {
        try {
            new Validation(null, null);
        } catch (e) {
            assert.equal("ERROR: Name must be provided when constructing a Validation", e.message);
        }
    });

    it('should fail if no implementation is provided when constructing validation', function () {
        var name = "validationName";
        try {
            new Validation(name, null);
        } catch (e) {
            assert.equal("ERROR: Value must be provided when constructing a Validation, and it must be a function", e.message);
        }
    });

    it('should fail if provided implementation is not a function', function () {
        var name = "operationName";
        var noFunctionImplementation = "hello";
        try {
            new Validation(name, noFunctionImplementation);
        } catch (e) {
            assert.equal("ERROR: Value must be provided when constructing a Validation, and it must be a function", e.message);
        }
    });

});