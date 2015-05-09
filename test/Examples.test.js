var assert = require("assert");
var ShoppingCartMachine = require('../examples/ShoppingCartMachine').ShoppingCartMachine;
var ShoppingCartMachineWithComplexValues = require('../examples/ShoppingCartMachine').ShoppingCartMachineWithComplexValues;
var CartItem = require('../examples/ShoppingCartMachine').CartItem;
var _isArrayOfCartItems = require('../examples/ShoppingCartMachine')._isArrayOfCartItems;

describe('Examples', function () {
    var machine = new ShoppingCartMachine();
    var machineWithComplexValue = new ShoppingCartMachineWithComplexValues();

    it('should successfully construct a simple shopping cart machine', function () {
        assert.equal("NON_PRICEABLE", machine.getCurrentState(), "Initial State must be NON_PRICEABLE");
        assert.equal(3, Object.keys(machine.getProperties()).length, "Machine has three properties");
        assert.equal("item", Object.keys(machine.getProperties())[0], "Item property must be defined for machine");
        assert.equal("priced", Object.keys(machine.getProperties())[1], "Priced property must be defined for machine");
        assert.equal("checkedOut", Object.keys(machine.getProperties())[2], "CheckedOut property must be defined for machine");

        assert.equal(3, machine.getTransitions().length, "There are three transitions in the machine");

        assert.equal("addItem:NON_PRICEABLE->PRICEABLE", machine.getTransitions()[0].getName(), "addItem:NON_PRICEABLE->PRICEABLE transition must be created in the machine");
        assert.equal("price:PRICEABLE->PRICED", machine.getTransitions()[1].getName(), "price:PRICEABLE->PRICED transition must be created in the machine");
        assert.equal("checkOut:PRICED->CHECKED_OUT", machine.getTransitions()[2].getName(), "checkOut:PRICED->CHECKED_OUT transition must be created in the machine");
    });


    it('should be able to transition from NON_PRICEABLE to PRICEABLE through the addItem Operation', function(){
        machine.run("addItem", null, function(err, res){
           assert.equal(null, err, "No error when transitioning from NON_PRICEABLE to PRICEABLE");
           assert.equal("Argentina->Brasil", machine.getProperties()["item"].getValue(), "Item machine property was sucessfully updated");
           assert.equal("PRICEABLE", machine.getCurrentState(), "Machine successfully transitioned from NON_PRICEABLE to PRICEABLE");
        });
    });

    it('should be able to transition from PRICEABLE to PRICED through the price Operation', function(){
        machine.run("price", null, function(err, res){
            assert.equal(null, err, "No error when transitioning from PRICEABLE to PRICED");
            assert.equal(true, machine.getProperties()["priced"].getValue(), "Priced machine property was successfully updated");
            assert.equal("PRICED", machine.getCurrentState(), "Machine successfully transitioned from PRICEABLE to PRICED");
        });
    });

    it('should be able to transition from PRICED to CHECKED_OUT through the checkOut Operation', function(){
        machine.run("checkOut", null, function(err, res){
            assert.equal(null, err, "No error when transitioning from PRICED to CHECKED_OUT");
            assert.equal(true, machine.getProperties()["checkedOut"].getValue(), "CheckedOut machine property was successfully updated");
            assert.equal("CHECKED_OUT", machine.getCurrentState(), "Machine successfully transitioned from PRICED to CHECKED_OUT");
        });
    });

    it('should be able to add a property value that is an array and of a particular type', function(){
        machineWithComplexValue.getProperties()["items"].setValue([new CartItem("Argentina", "Brasil")]);
        assert.equal(1, machineWithComplexValue.getProperties()["items"].getValue().length);
        assert.equal(true, machineWithComplexValue.getProperties()["items"].getValue()[0] instanceof CartItem);
    });
});

