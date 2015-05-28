var Machine = require('../index').Machine;
var Transition = require('../index').Transition;
var Operation = require('../index').Operation;
var Property = require('../index').Property;
var Validation = require('../index').Validation;
var it = require('../lib/utils/validations');

/**
 * In this example, it will be modelized a fictional shopping cart resource as a Machine.
 * Shopping Cart resource has four states:
 * -> NON_PRICEABLE (Initial State) : This state, which is the initial one, represents an empty cart, thus, we
 *    establish such a cart as impossible to be priced.
 * -> PRICEABLE : After an Item is added, cart is priceable, and in that case state moves to PRICEABLE
 * -> PRICED : If a PRICEABLE cart gots priced, then it gets PRICED state
 * -> CHECKED_OUT : Finally, if a PRICED cart is checked out, it moves to CHECKED_OUT state.
 *
 * [NON_PRICEABLE] ---addItem---> [PRICEABLE] ---price---> [PRICED] ---checkOut---> [CHECKED_OUT]
 *
 * Machine will have three operations : addItem, price and checkOut.
 * Machine will have three simple transitions : NON_PRICEABLE->PRICEABLE, PRICEABLE->PRICED, PRICED->CHECKED_OUT
 *
 * !Note this first example is a rather simplistic one, and carts will have just one item. Next examples will contain
 * much more complex flows (operating with lists, mutable transition states, immutable states, error handling, etc)
 *
 * @constructor
 */
function ShoppingCartMachine() {

    var addItemOperation = new Operation("addItem", function (machine, parameters, transition, cb) {
        var err = null;
        if(!machine.getProperties()["items"].getValue()) machine.getProperties()["items"].setValue([]);
        machine.getProperties()["items"].getValue().push("Argentina->Brasil");
        if (!err) {
            cb(null, machine.setCurrentState(transition.getFinalState(machine)));
        } else {
            cb(err, null);
        }
    });

    var priceOperation = new Operation("price", function (machine, parameters, transition, cb) {
        var err = null;
        machine.getProperties()["priced"].setValue(true);
        if (!err) {
            cb(null, machine.setCurrentState(transition.getFinalState(machine)));
        } else {
            cb(err, null);
        }
    });

    var checkOutOperation = new Operation("checkOut", function (machine, parameters, transition, cb) {
        var err = null;
        machine.getProperties()["checkedOut"].setValue(true);
        if (!err) {
            cb(null, machine.setCurrentState(transition.getFinalState(machine)));
        } else {
            cb(err, null);
        }
    });

    var addItemInitialState = function(machine){
        if(!machine.getProperties()["items"].getValue() || machine.getProperties()["items"].getValue().length == 0 ) return "NON_PRICEABLE";
        return "PRICEABLE";
    };

    var addItemFinalState = function(){return "PRICEABLE"};

    var addItemTransition = new Transition(addItemInitialState, addItemFinalState, addItemOperation);
    var priceTransition = new Transition(function(){return "PRICEABLE"}, function(){return "PRICED"}, priceOperation);
    var checkOutTransition = new Transition(function(){return "PRICED"}, function(){return "CHECKED_OUT"}, checkOutOperation);

    var shoppingCartMachine = new Machine("Shopping Cart Machine", "NON_PRICEABLE",
        [addItemTransition, priceTransition, checkOutTransition], null);

    shoppingCartMachine.addProperty(new Property("items", null, null));
    shoppingCartMachine.addProperty(new Property("priced", false, null));
    shoppingCartMachine.addProperty(new Property("checkedOut", false, null));

    return shoppingCartMachine;
}

/**
 * Following previous machine composition, in this case more complex values, with validations, are added to the machine.
 * In particular, item will be changed to be a list of items, and each item will be of type CartItem.
 * Machine structure wont be affected.
 *
 * @constructor
 */
function ShoppingCartMachineWithComplexValues() {
    var machine = new ShoppingCartMachine();
    machine.addProperty(new Property("items", null, [it.isArray, _isArrayOfCartItems]));
    return machine;
}


/**
 * In this example, a new operation and transition are added to the machine: removeItemOperation, and a transition
 * that now includes a transition with a dynamic final state that based on a property of the machine (item) determines
 * if its final state is PRICEABLE or NON_PRICEABLE. Essentially, if there's no items, final state must be NON_PRICEABLE
 * , on the other hand, if there are 1 or more items, final state of transition must be PRICEABLE.
 * @returns {*}
 * @constructor
 */
function ShoppingCartMachineWithMutableStates() {
    var machine = new ShoppingCartMachineWithComplexValues();

    var removeItemOperation = new Operation("removeItem", function (machine, parameters, transition, cb) {
        var err = null;
        machine.getProperties()["items"].getValue().pop();
        if (!err) {
            cb(null, machine.setCurrentState(transition.getFinalState(machine)));
        } else {
            cb(err, null);
        }
    });

    var finalState = function(machine){
      if(machine.getProperties()["items"].getValue().length == 0) return "NON_PRICEABLE";
      return "PRICEABLE";
    };

    machine._transitions.push(new Transition("NON_PRICEABLE", finalState, removeItemOperation));

    return machine;
}

var CartItem = function (origin, destiny) {
    this.origin = origin;
    this.destiny = destiny;
};

var _isArrayOfCartItems = new Validation("isArrayOfCartItems", function (items) {
    if (!items || !it.isArray.validate(items)) return false;
    var isArrayOfCartItems = true;
    items.forEach(function (item) {
        if (!(item instanceof CartItem)) {
            isArrayOfCartItems = false;
        }
    });
    return isArrayOfCartItems;
});

/**
 * Public Interface
 */
module.exports = {
    ShoppingCartMachine: ShoppingCartMachine,
    ShoppingCartMachineWithComplexValues: ShoppingCartMachineWithComplexValues,
    ShoppingCartMachineWithMutableStates: ShoppingCartMachineWithMutableStates,
    CartItem: CartItem,
    _isArrayOfCartItems: _isArrayOfCartItems
};
