
// Require needed packages 
const mysql = require("mysql2");
const inquirer = require("inquirer");

// Create connection to database
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
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
    switch (res.menu) {
        case 'View All Employees':
            viewEmployees();
            break;   
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "Add a department":
            addDept();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update employee role":
            update();
            break;
        case "Exit":
            db.end();
            break;
    }
});
};





 // function to View all employees
function viewEmployees() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("Displaying all employees:");
        console.table(data);
        start();
    });
}
 // function to View all departments
function viewDepartments() {
    db.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("Displaying all departments:");
        console.table(data);
        start();
    });
}