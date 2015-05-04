var assert = require("assert");
var Property = require('../index').Property;
var Validation = require('../index').Validation;

describe('Property', function () {
    it('should set a value of a property if no validations provided', function () {
        var propertyName = "propertyName";
        var propertyValue = "propertyValue";
        var property = new Property(propertyName, propertyValue, null);
        assert.equal(propertyName, property.getName());
        assert.equal(propertyValue, property.getValue());
    });

    it('should set a value of a property when provided validations are accomplished by given value.', function () {
        var propertyName = "propertyName";
        var propertyValue = 6;
        var validationName = "validationName";
        var validationImplementation = function (value) {
            return value > 5;
        };
        var validation = new Validation(validationName, validationImplementation);
        var property = new Property(propertyName, propertyValue, validation);
        assert.equal(propertyValue, property.getValue());
        property.setValue(45);
        assert.equal(propertyName, property.getName());
        assert.equal(45, property.getValue());
    });

    it('should allow adding just one validation directly passing a Validation instance, instead of an Array', function () {
        var propertyName = "propertyName";
        var propertyValue = 6;
        var validationName = "validationName";
        var validationImplementation = function (value) {
            return value > 5;
        };
        var validation = new Validation(validationName, validationImplementation);
        try {
            new Property(propertyName, propertyValue, validation);
        } catch (e) {
            assert.fail();
        }
        assert.equal(1, 1);
    });

    it('should allow adding multiple validations directly passing a Validation array to constructor', function () {
        var propertyName = "propertyName";
        var propertyValue = 6;
        var validationName = "validationName";
        var validationImplementation1 = function (value) {
            return value > 5;
        };
        var validationImplementation2 = function (value) {
            return value < 8;
        };
        var validation1 = new Validation(validationName, validationImplementation1);
        var validation2 = new Validation(validationName, validationImplementation2);
        try {
            new Property(propertyName, propertyValue, [validation1, validation2]);
        } catch (e) {
            assert.fail();
        }
        assert.equal(1, 1);
    });

    it('should throw an error if no name is provided for property', function () {
        try {
            new Property(null, 6, null);
        } catch (e) {
            assert.equal("ERROR: Name must be provided when constructing a Property", e.message);
            assert.equal(1, 1);
            return;
        }
        assert.fail();
    });

    it('should throw an error if no value is provided for property', function () {
        try {
            new Property("propertyName", null, null);
        } catch (e) {
            assert.equal("ERROR: Value must be provided when constructing a Property", e.message);
            assert.equal(1, 1);
            return;
        }
        assert.fail();
    });

    it('should throw an error if the given value on constructor does not accomplish defined validation', function(){
        var propertyName = "propertyName";
        var propertyValue = 1;
        var validationName = "validationName";
        var validationImplementation = function (value) {
            return value > 5;
        };
        var validation = new Validation(validationName, validationImplementation);
        try {
            new Property(propertyName, propertyValue, validation);
        } catch (e) {
            assert.equal("Error: Value is not acceptable since it didn't accomplished property validations", e.message);
            return;
        }
        assert.fail();
    });

});