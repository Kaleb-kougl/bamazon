-- CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE departments (
	department_id INTEGER(11) NOT NULL AUTO_INCREMENT, 
    department_name VARCHAR(25) NOT NULL,
    over_head_costs DOUBLE(10,2) NOT NULL DEFAULT 1000,
    PRIMARY KEY (department_id)
);