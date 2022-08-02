const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "Haynes91!",
    database: "employee_tracker_db"
});

function menu() {
    inquirer.prompt({
    name: "menu",
    type: "list",
    message: "What would you like to do?",
    choices: [ "View all departments", "View all roles", "View all employees", "Add a department", 
    "Add a role","Add an employee", "Update employee role","Exit"]
})
.then((res) => {
    switch (res.Menu) {
        case 'View All Employees':
            viewEmployees();
            break;   












 // function to View all employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("Displaying all employees:");
        console.table(data);
        start();
    });
}