
// Require needed packages 
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");


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
        choices: ["View all departments", "View all roles", "View all employees", "Add a department",
            "Add a role", "Add an employee", "Update employee role", "Exit"]
    })
        // switch statement used to cycle through reponses based on user selection 
        .then((res) => {
            switch (res.menu) {
                case 'View all employees':
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
        console.log("Displaying all employees:");
        console.table(data);
        menu();
    });
}
// function to view all departments
function viewDepartments() {
    db.query("SELECT * FROM department", (err, data) => {
        console.log("Displaying all departments:");
        console.table(data);
        menu();
    });
}
// function to view 
function viewRoles() {
    db.query("SELECT * FROM role", (err, data) => {
        console.log("Displaying all roles:");
        console.table(data);
        menu();
    });
}
// function to add department 
function addDepartment() {

    inquirer.prompt([ // prompt user to input data
        { name: "department",
        type: "input",
        message: "What would you like to name the department?",
        },
    ]).then(answer => { // Once we have recieved the required data THEN run query on database
        db.query("INSERT INTO department SET ?", // define which table to insert data - SET used as advised by BCS
            { name: answer.department },
            (err) => { // if an error, throw error
                if (err) throw err;
            console.log(`New department ${answer.department} has been added!`); // If no issue, console log added department 
            menu() // Call back main menu inquirer prompt 
            }
        );
    });
}
function addRole() {
    db.query("SELECT * FROM department", function (err, answer) { // Select all departments in department table 
        inquirer.prompt([ // inquirer to present user with a series of prompts
            {name: "title",
            type: "input",
            message: "What is the title for the new role?",
            },
            {name: "salary",
            type: "input",
            message: "What is this new role's salary",
            },
            {name: "department",
            type: "rawlist",
                choices: function () {
                    let choiceArray = []; // Push the user choices into an array
                    for (let i = 0; i < answer.length; i++) {
                        choiceArray.push(answer[i].name);
                    }
                    return choiceArray; // returns array of user choices 
                },
                message: "What department is this new role under?",
            }
        ]).then(response=> {
            let selectedDepartment; 
            for (let i = 0; i < answer.length; i++) {
                if (answer[i].name === response.department) { // if users answer is the same as department in table
                    selectedDepartment = answer[i]; // Added value to varible 
                }
            }
            db.query("INSERT INTO role SET ?",  // define which table to insert data - SET used as advised by BCS
                {title: response.title, salary: response.salary, department_id: selectedDepartment.id}, // Define what to add to table and where
                (err) => {// if error throw error
                    if (err) throw err;
                    console.log(`New role ${response.title} has been added!`); // if all good console log the action has been successful
                    menu();
                }
            )
        });
    });
};

const addEmployee = async () => {  // changed to async function to utilize 'await'
    db.query('Select * FROM role', async (err, roles) => { // databse query to select all roles in table
        if (err) throw err; 
    db.query('Select * FROM employee WHERE manager_id IS NULL', async (err, managers) => {
        if (err) throw err; 
        managers = managers.map(manager => ({ //map to loop through listed manangers in database 
            name:manager.first_name + " " + manager.last_name, value: manager.id
        }));
        managers.push({name:"None"});

 const responses = await inquirer // wait until prompt is complete before assigning user selection to variable
        .prompt([
          { type: "input",
            message: "What is the employee's first name? ",
            name: "first_name"
          },
          { type: "input",
            message: "What is the employee's last name? ",
            name: "last_name"
          },
          { type: "list",
            message: "What is the employee's role? ",
            choices: roles.map(role => ({ // map selection of roles
                name:role.title, value: role.id
            })),
            name: "role_id"
          },
          { type: "list",
            message: "Who is the employee's manager? ",
            choices: managers,
            name: "manager_id"
          }
        ]) 
     db.query('INSERT INTO employee SET ?', // define which table to insert data - SET used as advised by BCS
        { first_name: responses.first_name, last_name: responses.last_name, role_id: responses.role_id, manager_id: responses.manager_id
        },
        (err, res) => { // if error throw error 
          if (err) throw err;
          console.log("New employee added!");// if all good console log the action has been successful
          menu();
        })
    })
})
}; 


const update = async () => { // changed to async function to utilize 'await'
  
    db.query('Select * FROM employee', async (err, employees) => {  // databse query to select all employees in table
      if (err) throw err;

      const employeeSelected = await // wait until prompt is complete before assigning user selection to variable 
      inquirer.prompt([
        {name: 'employee_id',
        type: 'list',
        choices: employees.map(employee => ({name:employee.first_name + " " + employee.last_name, value: employee.id})),// map through list of current employees
        message: 'Which employee would you like to update? ',
          }
        ])
      db.query('Select * FROM role', async (err, roles) => { // databse query to select all roles in table
        if (err) throw err;
  
        const roleSelected = await // wait until prompt is complete before assigning user selection to variable 
        inquirer.prompt([
            {name: 'role_id',
            type: 'list',
            choices: roles.map(role => ({name:role.title, value: role.id})),// map through list of current roles
             message: 'What is their new role? ',
            }
          ])
  
        db.query('UPDATE employee_tracker_db.employee SET ? WHERE ?',  // define which table to UPDATE data - SET used as advised by BCS
          [
            {role_id: roleSelected.role_id, // Values in varibale to be added to role_id key in employee table 
            },
            {id: employeeSelected.employee_id, // Values in varibale to be added to employee_id key in employee table 
            }],
          (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!')// if all good console log the action has been successful
            menu();
          }
        )
      })
    })
  }

menu();