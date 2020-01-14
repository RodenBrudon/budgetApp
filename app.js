// TO-DO
/*
Add event handler

get input values

add the new item to data structure

add new item to UI

calculate budget

update budget in UI

See: 'Code_Modules' code slide
*/


// Use IIFE to ensure privacy of the code.
// Return an object with publicly accessible properties/methods.
// Methods to manipulate data are creat in 'BUDGET' and 'UI' controllers, and are called in the 'GLOBAL' controller.

// *********** BUDGET CONTROLLER **********
var budgetController = (function(){

// Create income and expenses function constructors
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };


// Create an object that stores all the data
    var data = {
        allItems: {
            // Store all exp and int items in an array
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    };

    return {
        addItem: function(type, des, val){
            var newItem, ID;
            ID = 0;

            // Create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp'){
            newItem = new Expense(ID, des, val);
            } else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            // push into data structure
            data.allItems[type].push(newItem);
            // return new element
            return newItem;
        },

        testing: function(){
            console.log(data);
        }

    };


})();


//************ UI CONTROLLER ************
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        // get input from UI
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },

        addListItem: function(obj, type,){

            var html, newHtml, element;

            // Create HTML string with placeholder

        if (type === 'inc'){
            element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';

        } else if (type === 'exp'){
            element = DOMstrings.expensesContainer;
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
        }


        // Replace placeholder with actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        // Insert HTML into DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },

        // expose the DOMstrings to the public so yu can use them in the Global Controller
        getDomStrings: function(){
            return DOMstrings
        }





    };

})();

// 'budgetController' and 'UIController' are two independent controllers
// 'appController' allows communication between the first two controllers.

// ************* GLOBAL APP CONTROLLER ***********
var controller = (function(bgtCtrl, UIctrl){

// Set up initiation function
        var initEventListeners = function(){

// Get the DOM strings from the UI controller
        var DOM = UIctrl.getDomStrings();

// Eventlistener for click, add item
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

// Eventlistener for 'return' keypress to add item
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13){
                ctrlAddItem();
            }
        });
    };


//Function to add item
    var ctrlAddItem = function(){
        var input, newItem;

        // 1 get field input data
        input = UIctrl.getInput();
        // 2 add item to the budget controller
        newItem = bgtCtrl.addItem(input.type, input.description, input.value)
        // 3 add the new item to the UI
        UIctrl.addListItem(newItem, input.type);
        // 4 calc the budget
        // 5 update/display budget in UI

    };

// Create a public init function
    return {
        init: function(){
            console.log('App has started.');
            initEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();


