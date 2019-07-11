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

function viewProducts() {
    console.log("View Products for Sale")
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