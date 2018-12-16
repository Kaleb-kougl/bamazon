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
      'choices': ['View Product Sales by Department', 'Create New Department']
    }
  ])
  .then(answers => console.log(answers));

  connection.end();
}

function viewSales() {
  
}