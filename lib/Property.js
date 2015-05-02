var m = require('./constants');

function Property(name, validations){
    if (!name) throw new Error(m.ERR_MSG_14);

    this.name = name;
    this.validations = validations;
}

module.exports = {
    Property : Property
};