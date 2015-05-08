/**
 * A Machine Property
 * @param name the name of the property
 * @param value the value of the property
 * @param validations the list of validations to be executed against the property value
 * @constructor
 */
function Property(name, value, validations) {
    if (!name) throw new Error("ERROR: Name must be provided when constructing a Property");

    var property = this;

    this._name = name;
    this._value = value;

    if (validations) {
        if (validations.constructor.name === "Array") {
            validations.forEach(function (validation) {
                if (validation.constructor.name === "Validation") {
                    if (property.validations == null) property.validations = [];
                    property.validations.push(validation);
                } else {
                    throw new Error("Error: Property validations must be of type Validation");
                }
            });
        } else {
            if (validations.constructor.name === "Validation") {
                if (property.validations == null) property.validations = [];
                property.validations.push(validations);
            }
        }
    }

    property.validate(property._value);
}

/**
 * @param value value to be validated
 */
Property.prototype.validate = function (value) {
    if (this.validations) {
        this.validations.forEach(function (validation) {
            if (!validation.validate(value)) {
                throw new Error("Error: Value is not acceptable since it didn't accomplished property validations");
            }
        })
    }
};

/**
 * @returns {*} the name of the property
 */
Property.prototype.getName = function () {
    return this._name;
};

/**
 * @param name the name of the property
 */
Property.prototype.setName = function (name) {
    this._name = name;
};

/**
 * @returns {*} the value of the property
 */
Property.prototype.getValue = function () {
    return this._value;
};

/**
 * @param value the value of the property
 */
Property.prototype.setValue = function (value) {
    this.validate(value);
    this._value = value;
};

/**
 * @returns {Array} the array of validations applied to the property
 */
Property.prototype.getValidations = function () {
    return this.validations;
};

/**
 * Public Interface
 * @type {{Property: Property}}
 */
module.exports = {
    Property: Property
};