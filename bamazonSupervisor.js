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
  connection.query(
   `CREATE TEMPORARY TABLE tempTable
      SELECT department_name, SUM(product_sales) AS product_sales
      FROM bamazon.products GROUP BY department_name;
    SELECT * FROM departments NATURAL JOIN tempTable ORDER BY department_id ASC;`, 
    function(err, res) {
      if (err) throw err;
      let printableData = res[1].map(x => {
        return {
          "Department Id": x["department_id"],
          "Department Name": x["department_name"],
          "Overhead costs": x["over_head_costs"],
          "Product Sales": x["product_sales"],
          "Total Profit": x["product_sales"] - x["over_head_costs"]
        }
    });
    console.table(printableData);
  })
  connection.end();
}