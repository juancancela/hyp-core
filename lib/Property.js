Property.prototype.getName = function(){
    return this.name;
};

Property.prototype.setName = function(name){
    this.name = name;
};

Property.prototype.getValue = function(){
    return this.value;
};

Property.prototype.setValue = function(value){
    this.value = value;
};

Property.prototype.getValidations = function(){
    return this.validations;
};

Property.prototype.setValidation = function(validations){
    this.validations = validations;
};


function Property(name, value, validations){
    if (!name) throw new Error("ERROR: Name must be provided when constructing a Machine");

    this.name = name;
    this.value = value;
    this.validations = validations;
}

module.exports = {
    Property : Property
};