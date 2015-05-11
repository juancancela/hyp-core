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
function decorateWithGettersAndSetters(objectToBeDecorated, properties){
    if(!objectToBeDecorated || !properties) return null;

    var _isPluralPropertyNameWithLetterSAtTheEnd = function(propertyName){
        return propertyName.length > 1 && propertyName.charAt(propertyName.length - 1).toUpperCase() == 'S';
    };

    properties.forEach(function(tuple){
        var capitalizedName = capitalizeFirstLetter(tuple.name);
        objectToBeDecorated["get"+capitalizedName] = function(){
          return objectToBeDecorated[tuple.name];
        };
        objectToBeDecorated["set"+capitalizedName] = function(item){
            objectToBeDecorated[tuple.name] = item;
        };
        if(tuple.isArray){
            if(_isPluralPropertyNameWithLetterSAtTheEnd(capitalizedName)){
                objectToBeDecorated["add"+capitalizedName.substr(0, capitalizedName.length - 1)] = function(item){
                    objectToBeDecorated[tuple.name].push(item);
                };
            } else {
                objectToBeDecorated["add"+capitalizedName] = function(item){
                    objectToBeDecorated[tuple.name].push(item);
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
    if(!string) return null;
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * Public Interface
 * @type {{decorateWithGettersAndSetters: decorateWithGettersAndSetters, capitalizeFirstLetter: capitalizeFirstLetter}}
 */
module.exports = {
    decorateWithGettersAndSetters : decorateWithGettersAndSetters,
    capitalizeFirstLetter         : capitalizeFirstLetter
};