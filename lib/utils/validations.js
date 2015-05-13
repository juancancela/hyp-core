var Validation = require('../Validation').Validation;

/**
 * Given a value, checks whether or not is an Array
 * @param value value to be analysed
 * @returns {*|boolean} TRUE if its an Array, FALSE otherwise
 */
function isArray(value) {
    if (!value) return false;
    return value.constructor === Array;
}


/**
 * Public Interface
 * @type {{isArray: isArray}}
 */
module.exports = {
    isArray: new Validation("isArray", isArray)
};