
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
            addDepartment();
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

 // function to view all employees
function viewEmployees() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("Displaying all employees:");
        console.table(data);
        menu();
    });
}
 // function to view all departments
function viewDepartments() {
    db.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("Displaying all departments:");
        console.table(data);
        menu();
    });
}
// function to view 
function viewRoles() {
    db.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.log("Displaying all roles:");
        console.table(data);
        menu();
    });
}
// function to add department 
function addDepartment() {
    inquirer.prompt([ // prompt user to input data
    {name: "department",
    type: "input",
    message: "What would you like to name the department?",
    },
   ]).then(answer => { // Once we have recieved the required data THEN run query on database
        db.query("INSERT INTO department (name) VALUES ( ? )",
        {name: answer.department},
        (err) => {
        if (err) throw err;
        console.log(`New department ${answer.department} has been added!`);
        menu()
        }
        );
    });
}
function addRole() {
    db.query("SELECT * FROM department", function (err, answer) {
        if (err) {
    console.log(err);
    inquirer.prompt([
            {name: "title",
            type: "input",
            message: "What is the title for the new role?",
            },
            {name: "salary",
            type: "input",
            message: "What is this new role's salary",
            },
            {
            name: "department",
            type: "list",
            choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].name);
                }
                return choiceArray;
            },
                message: "What department is this new role under?",
            }
     ]).then(answer => {
            let selectedDepartment;
            for (let i = 0; i < results.length; i++) {
                if (results[i].name === answer.department) {
                    selectedDepartment = results[i];
                }
            }
            db.query("INSERT INTO role SET ?",
                {title: answer.title, salary: answer.salary, department_id: selectedDepartment.id},
                (err) => {
                    if (err) throw err;
                    console.log(`New role ${answer.title} has been added!`);
                    menu();
                }
            )
        });
    };
})};

menu();