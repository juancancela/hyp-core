var assert = require("assert");
var v = require('../lib/utils/validations');

describe('Property Validations', function () {
    it('#isArray(value) should return true if the given value is an Array', function () {
        assert.equal(true, v.isArray.validate([]), "It is an Array");
    });

    it('#isArray(value) should return false if the given value is not an Array', function () {
        assert.equal(false, v.isArray.validate({}), "{} is not an Array");
        assert.equal(false, v.isArray.validate(null), "null is not an Array");
        assert.equal(false, v.isArray.validate(undefined), "undefined is not an Array");
        assert.equal(false, v.isArray.validate(new Date()), "Date is not an Array");
        assert.equal(false, v.isArray.validate("text"), "text is not an Array");
    });

});