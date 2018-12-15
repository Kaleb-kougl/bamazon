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
      getWhatToAdd();
    } else if (answers.input === 'new') {
      console.log('new!');
      promptNewProductInfo();
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

function getWhatToAdd() {
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
      {
        "type": "input",
        "name": "amount",
        "message": "How many would you like to add?"
      }
    ])
    .then(answers => {
      let numberRegex = /[^0-9]/g;
      let notAnInt = numberRegex.test(answers["amount"]);
      if (notAnInt === true){
        console.log('You suck! Type a integer!');
      } else {
        console.log('add more');
        addMoreInventory(answers.input, parseInt(answers.amount));
      }
    });
  })
}

function addMoreInventory(id, amount) {
  connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${amount} WHERE item_id = ${id}`, function(err, res) {
    if (err) throw err;
    console.log(res);
    console.log('Success!');
  });
  // MAKE SURE TO PUT THIS AT THE END
  connection.end();
}

function promptNewProductInfo() {
  inquirer
  .prompt([
    {
    "type": "input",
    "name": "p_name",
    "message": "What is the name of the product?",
    },
    {
      "type": "input",
      "name": "d_name",
      "message": "What department should it be located within?",
    },
    {
      "type": "input",
      "name": "price",
      "message": "What is the price of the product? (NO UNIT)",
    },
    {
      "type": "input",
      "name": "stock",
      "message": "How many are you stocking?",
    }
  ])
  .then(answers => {
    console.log(answers);
    let numberRegex = /[^0-9]/g;
    let decimalRegex = /[^0-9.]/g;
    let notAnInt = numberRegex.test(answers["stock"]);
    let notADecimal = decimalRegex.test(answers["price"]);

    if (notAnInt === true){
      console.log('You suck! Type a integer for stock!');
    } else if (notADecimal === true){
      console.log("You suck! Type a number for price without a unit!");
    } else {
      addNewProduct(answers);
      // console.log(answers);
    }
  })
}

function addNewProduct(item) {
  connection.query(
    `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)`, 
    [item.p_name, item.d_name, item.price, item.stock], 
    function(err, res) {
      if (err) throw err;
      console.log(res);
      console.log('Success!');
  });

  connection.end();
}