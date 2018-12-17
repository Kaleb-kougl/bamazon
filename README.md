# bamazon
A cli storefront

## Table of Contents

- [About](#about)
- [Features](#features)

## About
Bamzon is a command line tool built to give the ability to both users and customers to access a stores database and interact with it easily. Through user input data the database will be queired retrieving certain information and returning in an easily read format. 

## Contributing Members

* [Kaleb Kougl](https://github.com/Kaleb-kougl) 

## Features

* There are three different points of access. The customer, manager and supervisor point of view. The customer can view products and make purchases. The maganger can see current products that are for sale, view low inventory of products, add to the inventory and add new products to the store. The supervisor can see the different departments, their different overhead costs, total sales and total profit of departments.


## Built With
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [mysql module](https://www.npmjs.com/package/mysql)
* [MySql](https://www.mysql.com/)
* [console.table](https://www.npmjs.com/package/console.table)
* [MAMP](https://www.mamp.info/en/)
* [MySql Workbench](https://www.mysql.com/products/workbench/)
* JavaScript/Node

## Installation

1. Clone the repository to your computer.
1. Start up your MySql server. I use mamp and will demonstrate

    ![2p52ab](https://user-images.githubusercontent.com/33531057/50064331-2f217000-0176-11e9-8d3b-9c8dd8811478.gif)

1. Run the schema and seed sql files on your MySql workbench (or use the CLI if you wish). 

    ![2p52q9](https://user-images.githubusercontent.com/33531057/50064334-3183ca00-0176-11e9-8327-5ffa609222e3.gif)

1. Once you have the database schema in place you will use the seed file to put data into the tables. Copy and paste the seed file into your MySql workbench and run the commands. 
1. Now your database is set up and running. Next you need to make sure that your port, host, user, and password all say the correct information. (This info is located on the mamp pop-up window. 
1. Run an npm install to get the neccessary node modules
     ```
     npm install
     ```
1. To launch the three different perspectives of the application type into your terminal node <FileName>
     ```
     node bamazonSupervisor.js
     node bamazonCustomer.js
     node bamazonManager.js
     ```
1. Purchase something from the store!

## Issues Related To Project



## How To Contribute

Feel free to submit your own issues and PRs for more questions!
