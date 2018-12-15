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
  database: "bamazon"
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
      "type": 'list',
      "name": "input",
      "message": "What would you like to do?",
      "choices": [
        {
          name: "View Products for Sale",
          value: "products"
        }, 
        {
          name: "View Low Inventory",
          value: "low"
        },
        {
          name: "Add to Inventory",
          value: "inventory"
        },
        {
          name: "Add New Product",
          value: "new"
        }]
    },
  ])
  .then(answers => {
    if (answers.input === 'products'){
      console.log('products!');
      showProductsForSale();
    } else if (answers.input === 'low'){
      console.log('low!');
      showLowInventory();
    } else if (answers.input === 'inventory'){
      console.log('inventory!');
      addMoreInventory();
    } else if (answers.input === 'new') {
      console.log('new!');
    } else {
      console.log("IDK what you did but you did something wrong.");
    }
    
  });
}

function showProductsForSale() {
  connection.query("SELECT * FROM products", function(err, res) {
    let printableData = res.map(x => {
      return {
        ID: x['item_id'],
        Name: x['product_name'],
        Price: x['price'].toFixed(2),
        Quantity: x['stock_quantity']
      }
    });
    if (err) throw err;
    console.table(printableData);
  });
  // MAKE SURE TO PUT THIS AT THE END
  connection.end();
}

function showLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    let printableData = res.map(x => {
      return {
        ID: x['item_id'],
        Name: x['product_name'],
        Price: x['price'].toFixed(2),
        Quantity: x['stock_quantity']
      }
    });
    if (err) throw err;
    console.table(printableData);
  });
  // MAKE SURE TO PUT THIS AT THE END
  connection.end();
}

function addMoreInventory() {
  console.log('here!')
  connection.query("SELECT * FROM products", function(err, res) {
    let choicesArray = res.map(x => {
      return {
        name: `${x["item_id"]}) ${x["product_name"]} : ${x["stock_quantity"]}`,
        value: x["item_id"]
      }
    });
    console.log(choicesArray);

    inquirer
    .prompt([
      {
        "type": 'list',
        "name": "input",
        "message": "Select the item to which you are adding more inventory",
        "choices": choicesArray
      },
    //   {
    //     "type": "input",
    //     "name": "amount",
    //     "message": "How many would you like to add?"
    //   }
    ])
    .then(answers => {
      console.log(answers);
    });
  })
  
  // connection.query("", function(err,res) {

  // });
  // MAKE SURE TO PUT THIS AT THE END
  connection.end();
}
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.