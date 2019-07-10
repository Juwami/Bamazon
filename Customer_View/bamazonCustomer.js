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
    // showInventory();
    makeAPurchase();
})

function showInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id} | Product Name: ${res[i].product_name} | Department Name: ${res[i].department_name} | Price: ${res[i].price} | Stock Quantity: ${res[i].stock_quantity}`)
        }
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

function purchaseRequest() {
    inquirer
        .prompt([{
                type: "number",
                message: "Please type in the ID of the item you would like to purchase",
                name: "itemID"
            },
            {
                type: "number",
                mesasage: "How many would you like to purchase?",
                name: "quantity"
            }
        ])
        .then(function (response) {
            console.log(response)
        })
}