let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    menu();
})

function menu() {
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
        .then(function (res) {
            switch(res.option) {
                case "View Products for Sale":
                viewProducts();
                break;
                case "View Low Inventory":
                lowInventory();
                break;
                case "Add to Inventory":
                addInventory();
                break;
                case "Add New Product":
                newProduct();
                break;
            }
        })
}

function returntoMenu() {
    inquirer
    .prompt([{
        type: "list",
        message: "Would you like to return to the menu?",
        name: "option",
        choices: ["Yes","No"]
    }])
    .then(function (res) {
        if (res.option === "Yes") {
            menu();
        }
        else {
            connection.end();
        }
    })
}

function viewProducts() {
    // console.log("View Products for Sale")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("----------------------------------------------------")
        for (i = 0; i < res.length; i++) {
            console.log("ItemID:" + res[i].item_id + " | Product Name: " + res[i].product_name + " | Department Name: " + res[i].department_name + " | Price: " + res[i].price + "| Stock Quantity: " + res[i].stock_quantity)
        }
        console.log(("--------------------------------------------------"))
        returntoMenu();
    })
}

function lowInventory() {
    console.log("View Low Inventory")
}

function addInventory() {
    console.log("Add to Inventory")
}

function newProduct() {
    console.log("Add New Product")
}

// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.