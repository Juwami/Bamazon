CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (799, "Emojoy Knife Set", "Knife Sets", 43.98, 173);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (223, "Echo Dot", "Amazon Devices", 24.99, 542);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (194, "Anker Best PowerCore", "Portable Power Banks", 24.99, 36);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (459, "2019 Weekly Planner", "Books", 32.99, 7);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (412, "90W Microwave Oven", "Kitchenware", 249.99, 135);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (653, "No-Grain Purrfect", "Pet Supplies", 5.99, 214);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (912, "Boze Headphones", "Headphones", 360.00, 360);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (578, "HTML & CSS", "Books", 27.99, 80);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (96, "PS4", "Entertainment", 399.99, 40);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (14, "36-Pack Bottled Water", "Liquids", 3.99, 732);