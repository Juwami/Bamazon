let mysql = require("mysql")
let inquirer = require("inquirer")

let connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    showInventory();
})

function showInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res)
    })
};