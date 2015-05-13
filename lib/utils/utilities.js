/**
 * Given an object to be decorated, and an array of properties this function created getters and setters for the given
 * properties. So, in the previous example, objectToBeDecorated will have this functions added after execution:
 *
 * - getAge()
 * - setAge(age)
 * - getInvoices()
 * - setInvoices(invoices)
 * - addInvoice(invoice)
 *
 * @param objectToBeDecorated object to be decorated
 * @param properties property array
 */
function decorateWithGettersAndSetters(objectToBeDecorated, properties) {
    if (!objectToBeDecorated || !properties) return null;

    var _isPluralPropertyNameWithLetterSAtTheEnd = function (propertyName) {
        return propertyName.length > 1 && propertyName.charAt(propertyName.length - 1).toUpperCase() == 'S';
    };

    properties.forEach(function (prop) {
        var capitalizedName = capitalizeFirstLetter(prop.getName());
        objectToBeDecorated["get" + capitalizedName] = function () {
            return objectToBeDecorated[prop.getName()];
        };
        objectToBeDecorated["set" + capitalizedName] = function (item) {
            objectToBeDecorated[prop.getName()] = item;
        };
        if (_isArrayProperty(prop)) {
            if (_isPluralPropertyNameWithLetterSAtTheEnd(capitalizedName)) {
                objectToBeDecorated["add" + capitalizedName.substr(0, capitalizedName.length - 1)] = function (item) {
                    objectToBeDecorated[prop.getName()].push(item);
                };
            } else {
                objectToBeDecorated["add" + capitalizedName] = function (item) {
                    objectToBeDecorated[prop.getName()].push(item);
                };
            }
        }
    });

    return objectToBeDecorated;
}

/**
 * Given an String, returns the very same string but with the first character capitalized
 * @param string the string to be capitalized
 * @returns {string} a first char capitalized string
 */
function capitalizeFirstLetter(string) {
    if (!string) return null;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function _isArrayProperty(property) {
    if (!property.getValidations() || property.getValidations().length == 0) return false;
    var isArrayProp = false;
    property.getValidations().forEach(function (validation) {
        if (validation.getName() == 'isArray') isArrayProp = true;
    });
    return isArrayProp;
}


/**
 * Public Interface
 * @type {{decorateWithGettersAndSetters: decorateWithGettersAndSetters, capitalizeFirstLetter: capitalizeFirstLetter}}
 */
module.exports = {
    decorateWithGettersAndSetters: decorateWithGettersAndSetters,
    capitalizeFirstLetter: capitalizeFirstLetter
};