
// Require needed packages 
const mysql = require("mysql2");
const inquirer = require("inquirer");

// Create connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "Haynes91!",
    database: "employee_tracker_db"
});

// propmts using inquirer 
function menu() {
    inquirer.prompt({
    name: "menu",
    type: "list",
    message: "What would you like to do?",
    choices: [ "View all departments", "View all roles", "View all employees", "Add a department", 
    "Add a role","Add an employee", "Update employee role","Exit"]
})

// switch statement used to cycle through reponses based on user selection 
.then((res) => {
    switch (res.Menu) {
        case 'View All Employees':
            viewEmployees();
            break;   
        case "View all departments":
            viewDepts();
            break;





    };





 // function to View all employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("Displaying all employees:");
        console.table(data);
        start();
    });
}

function viewDepts() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("Displaying all departments:");
        console.table(data);
        start();
    });
}