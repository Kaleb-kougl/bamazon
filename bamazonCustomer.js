const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    promptUserForPurchase(res);
  });
}

function promptUserForPurchase(res) {
  let id = res.map(x => {
    return {
      name: `${x["item_id"]}) ${x["product_name"]}`,
      value: x["item_id"]
    }});
  inquirer
  .prompt([
    {
      "type": 'list',
      "name": "input",
      "message": "Select the item that you would like to purchase",
      "choices": id
    },
    {
      "type": "input",
      "name": "amount",
      "message": "How many would you like to purchase?"
    }
  ])
  .then(answers => {
    let numberRegex = /[^0-9]/g;
    let numberTest = numberRegex.test(answers["amount"]);
    if (numberTest === true){
      console.log('%cYou suck! Type a number!', 'color:red;');
      connection.end();
      return;
    }
    console.log(answers);
    checkQuantity(answers["input"], answers["amount"]);
    return;
  });
}

function checkQuantity(id, amount) {
  connection.query(`SELECT * FROM products WHERE item_id = ${id}`, function(err, res) {
    if (err) throw err;
    console.log(res);
    console.log(amount);
    if (amount > res[0]["stock_quantity"]){
      console.log("Insufficient funds! Buy something else!");
    } else {
      makePurchase(id, res[0]["stock_quantity"] - amount);
    } 
  });
}

function makePurchase(id, newAmount) {
  connection.query(`UPDATE products SET stock_quantity = ${newAmount} WHERE item_id = ${id} LIMIT 1`, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
  connection.end();
}