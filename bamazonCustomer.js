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
  connection.query("SELECT * FROM products", function(err, res) {
    let printableData = res.map(x => {
      return {
        ID: x['item_id'],
        Name: x['product_name'],
        Price: x['price'].toFixed(2),
        Stock: x['stock_quantity']
      }
    });
    if (err) throw err;
    console.table(printableData);
    promptUserForPurchase(res);
  });
}

function promptUserForPurchase(res) {
  let choicesArray = res.map(x => {
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
      "choices": choicesArray
    },
    {
      "type": "input",
      "name": "amount",
      "message": "How many would you like to purchase?"
    }
  ])
  .then(answers => {
    let numberRegex = /[^0-9]/g;
    let notAnInt = numberRegex.test(answers["amount"]);
    if (notAnInt === true){
      console.log('You suck! Type a integer!');
      connection.end();
    } else {
      checkQuantity(answers["input"], answers["amount"]);
    }
  });
}

function checkQuantity(id, amount) {
  connection.query(`SELECT * FROM products WHERE item_id = ${id}`, function(err, res) {
    if (err) throw err;
    if (amount > res[0]["stock_quantity"]){
      console.log("Insufficient funds! Buy something else!");
    } else {
      let total = amount * res[0]["price"]; 
      makePurchase(id, res[0]["stock_quantity"] - amount, total);
    } 
  });
}

function makePurchase(id, newAmount, total) {
  connection.query(`UPDATE products SET stock_quantity = ${newAmount} WHERE item_id = ${id} LIMIT 1;
    UPDATE products SET product_sales = product_sales + ${total.toFixed(2)} WHERE item_id = ${id} LIMIT 1`, 
    function(err, res) {
      if (err) throw err;
      // MAKE SURE TO TAKE THIS AFTER YOU ARE DONE TESTING
      // console.log(res);
    });
  console.log(`\nTotal: $${total.toFixed(2)}\n`)
  connection.end();
}