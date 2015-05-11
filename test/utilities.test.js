var assert = require("assert");
var utils = require('../lib/utils/utilities');
var Property = require('../index').Property;
var validations = require('../index').validations;

describe('Utilities->String Utilities', function () {
    it('#capitalizeFirstLetter(string) should return null if the given string is a null', function () {
        assert.equal(null, utils.capitalizeFirstLetter(null), "It is null");
    });
    it('#capitalizeFirstLetter(string) should return null if the given string is undefined', function () {
        assert.equal(null, utils.capitalizeFirstLetter(undefined), "It is null");
    });
    it('#capitalizeFirstLetter(string) should return "Thing" if the given string is "thing" ', function () {
        assert.equal("Thing", utils.capitalizeFirstLetter("thing"), "It is Thing");
    });
    it('#capitalizeFirstLetter(string) should return "Thing" if the given string is "Thing" ', function () {
        assert.equal("Thing", utils.capitalizeFirstLetter("Thing"), "It is Thing");
    });
});

describe('Utilities->Object decoration', function () {

    var objectToBeDecorated = {};
    var simplePropertyTuple = new Property("age", null, null);
    var arrayPropertyTuple = new Property("invoices", null, validations.isArray);
    var arrayPropertyNoLetterSTuple = new Property("people", null, validations.isArray);

    objectToBeDecorated = utils.decorateWithGettersAndSetters(objectToBeDecorated, [simplePropertyTuple, arrayPropertyTuple, arrayPropertyNoLetterSTuple]);

    it('#decorateWithGettersAndSetters(objectToBeDecorated, propertyTuples) should return an object with a getter and a setter for a given non array property', function () {
        assert.equal("function", typeof objectToBeDecorated.getAge, "Creates a getter for the property");
        assert.equal("function", typeof objectToBeDecorated.setAge, "Creates a setter for the array property");
    });

    it('#decorateWithGettersAndSetters(objectToBeDecorated, propertyTuples) should return an object with a getter and a setter for a given array property', function () {
        assert.equal("function", typeof objectToBeDecorated.getInvoices, "Creates a getter for the array property");
        assert.equal("function", typeof objectToBeDecorated.setInvoices, "Creates a setter for the array property");
        assert.equal("function", typeof objectToBeDecorated.addInvoice, "Adds a helper function to add an item to an array property");
    });

    it('#decorateWithGettersAndSetters(objectToBeDecorated, propertyTuples) should not remove last "s" character from array item when generating add operation if the property name does not finish with "s"', function () {
        assert.equal("undefined", typeof objectToBeDecorated.addPeopl, "Should not follow logic of removing last character if property name does not finish with S");
        assert.equal("function", typeof objectToBeDecorated.addPeople, "Should generate an add function with the very same capitalized name of the property");
    });

    it('#decorateWithGettersAndSetters(objectToBeDecorated, propertyTuples) should provide valid getters and setters for the required properties', function () {
        objectToBeDecorated.setAge("45");
        assert.equal("45", objectToBeDecorated.getAge());
    });

    it('#decorateWithGettersAndSetters(objectToBeDecorated, propertyTuples) should return null if object to be decorated or given properties are null or undefined', function () {
        assert.equal(null, utils.decorateWithGettersAndSetters(null, null));
        assert.equal(null, utils.decorateWithGettersAndSetters(null, []));
        assert.equal(null, utils.decorateWithGettersAndSetters(null, undefined));
        assert.equal(null, utils.decorateWithGettersAndSetters(undefined, undefined));
        assert.equal(null, utils.decorateWithGettersAndSetters({}, undefined));
    });
});