CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) NOT NULL AUTO_INCREMENT , 
    product_name VARCHAR(25) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price DOUBLE(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);