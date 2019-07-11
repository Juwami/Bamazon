let mysql = require("mysql")
let inquirer = require("inquirer")

let connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    showInventory(function () {
        makeAPurchase();
    })
})

function showInventory(callback) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("----------------------------------------------------")
        for (i = 0; i < res.length; i++) {
            console.log("ItemID:" + res[i].item_id + " | Product Name: " + res[i].product_name + " | Department Name: " + res[i].department_name + " | Price: " + res[i].price + "| Stock Quantity: " + res[i].stock_quantity)
        }
        console.log(("--------------------------------------------------"))
        callback();
    })
};

function makeAPurchase() {
    inquirer
        .prompt([{
            type: "list",
            message: "Would you like to make a purchase?",
            choices: ["Yes", "No"],
            name: "purchase"
        }])
        .then(function (response) {
            // console.log("Prompt response:", response)
            if (response.purchase === "Yes") {
                purchaseRequest();
            } else {
                // used to stop the mySQL connection
                connection.end()
            }
        })
}

function makeAnotherPurchase() {
    inquirer
        .prompt([{
            type: "list",
            message: "Would you like to make another purchase?",
            choices: ["Yes", "No"],
            name: "choice"
        }])
        .then(function (response) {
            if (response.choice === "Yes") {
                showInventory(function () {
                purchaseRequest();
                });
            } else {
                connection.end();
            }
        })
}

function purchaseRequest() {
    inquirer
        .prompt([{
            type: "number",
            message: "Please type in the ID of the item you would like to purchase",
            name: "itemID"
        }])
        .then(function (item) {
            connection.query("SELECT * FROM products WHERE item_id = " + connection.escape(item.itemID), function (err, res) {
                if (err) throw err;
                if (res != '') {
                    inquirer
                        .prompt([{
                            type: "number",
                            message: "How many would you like to purchase?",
                            name: "quantity"
                        }])
                        .then(function (amount) {
                            connection.query("SELECT * FROM products WHERE item_id = " + connection.escape(item.itemID), function (err, res) {
                                if (err) throw err;
                                // console.log("Response:", res)
                                let stock = res[0].stock_quantity
                                let totalCost = (res[0].price * amount.quantity).toFixed(2)
                                if (amount.quantity < stock) {
                                    let newAmount = stock - amount.quantity
                                    connection.query("UPDATE products SET stock_quantity= " + connection.escape(newAmount) + " WHERE item_id = " + connection.escape(item.itemID))
                                    console.log(`Thanks for purchasing ${amount.quantity} ${res[0].product_name}s! Your total is $${totalCost}`)
                                    makeAnotherPurchase();
                                } else {
                                    console.log("Insufficient stock. Try again later.")
                                    makeAnotherPurchase();
                                }
                            })
                        })
                } else {
                    console.log(`The item ID ${item.itemID} does not exist. Try again.`);
                    makeAnotherPurchase();
                }
            })
        })
}