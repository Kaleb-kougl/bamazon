INSERT INTO departments (department_name) SELECT DISTINCT department_name FROM bamazon.products;