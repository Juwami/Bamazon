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
            switch (res.option) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventoryPrompt();
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
            choices: ["Yes", "No"]
        }])
        .then(function (res) {
            if (res.option === "Yes") {
                menu();
            } else {
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
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.log("----------------------------------------------------")
        for (i = 0; i < res.length; i++) {
            console.log("ItemID:" + res[i].item_id + " | Product Name: " + res[i].product_name + " | Department Name: " + res[i].department_name + " | Price: " + res[i].price + "| Stock Quantity: " + res[i].stock_quantity)
        }
        console.log("----------------------------------------------------")
        returntoMenu();
    })
}

function addInventoryPrompt() {
    // console.log("Add to Inventory")
    inquirer
        .prompt([{
            type: "number",
            message: "Type the ID of the item you are adding to.",
            name: "id"
        }])
        .then(function(res) {
            connection.query("SELECT stock_quantity FROM products WHERE item_id = " + connection.escape(res.id), function(err, query) {
                if (err) throw err;
                if (query != "") {
                    amountPrompt(res.id, query[0].stock_quantity);
                }
                else {
                    console.log("The entered ID does not exist");
                    returntoMenu();
                }
            })
        })
}

function amountPrompt(itemID, stock) {
    inquirer
    .prompt([{
        type: "number",
        message: "How much is being added to inventory?",
        name: "amount"
    }])
    .then(function (response) {
        // console.log(stock)
        // console.log(itemID)
        // console.log(response.amount)
        let newTotal = response.amount + stock;
        connection.query("UPDATE products SET stock_quantity = " + connection.escape(newTotal) + " WHERE item_id = " + connection.escape(itemID))
        console.log(`The new stock amount is ${newTotal}`);
        returntoMenu();
    })
}

function newProduct() {
    inquirer
    .prompt([{
        type: "number",
        message: "What is the new item ID?",
        name: "id"
    }, {
        type: "input",
        message: "What is the new item name?",
        name: "name"
    }, {
        type: "input",
        message: "What is the department name?",
        name: "department"
    }, {
        type: "number",
        message: "What is the price for each item?",
        name: "price"
    }, {
        type: "number",
        message: "What is the initial stock amount?",
        name: "stock"
    }])
    .then(function (response) {
        connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (" + connection.escape(response.id) + ',' + connection.escape(response.name) + "," + connection.escape(response.department) + "," + connection.escape(response.price) + "," + connection.escape(response.stock) + ")")
        console.log("Product has been added successfully!")
        returntoMenu();
    })
}
