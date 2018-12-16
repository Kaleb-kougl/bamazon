const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon",
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  inquirer
  .prompt([
    {
      'type': 'list', 
      'name': 'selection',
      'message': 'What would you like to do supervisor?',
      'choices': [{
        name: 'View Product Sales by Department',
        value: 'sales'
      }, {
        name: 'Create New Department',
        value: 'add'
      }]
    }
  ])
  .then(answers => {
    if (answers.selection === 'sales') {
      viewSales();
    } else if (answers.selection === 'add'){
      console.log('not yet functional');
      connection.end();
    } else {
      console.log('Something went wrong!');
      connection.end();
    }
  });
}

function viewSales() {
  connection.query("SELECT department_name, SUM(product_sales) FROM bamazon.products GROUP BY department_name;", function(err, res) {
    if (err) throw err;

    console.log(res);
  })
  connection.end();
}