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
    this.validate(value);
    this.value = value;
};

Property.prototype.getValidations = function(){
    return this.validations;
};

Property.prototype.validate = function(value){
    if(this.validations){
        this.validations.forEach(function(validation){
            if(!validation.implementation(value)){
                throw new Error("Error: Value is not acceptable since it didn't accomplished property validations");
            }
        })
    }
};

function Property(name, value, validations){
    if (!name) throw new Error("ERROR: Name must be provided when constructing a Property");
    if (!value) throw new Error("ERROR: Value must be provided when constructing a Property");

    var property = this;

    property.name = name;
    property.value = value;

    if(validations){
        if(validations.constructor.name === "Array"){
            validations.forEach(function(validation){
                if(validation.constructor.name === "Validation"){
                    if(property.validations == null) property.validations = [];
                    property.validations.push(validation);
                } else {
                    throw new Error("Error: Property validations must be of type Validation");
                }
            });
        } else {
            if(validations.constructor.name === "Validation"){
                if(property.validations == null) property.validations = [];
                property.validations.push(validations);
            }
        }
    }

    property.validate(property.value);
}

module.exports = {
    Property : Property
};