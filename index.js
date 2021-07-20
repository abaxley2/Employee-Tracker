const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Tuba1234',
  database: 'employee_managementDB',
});


// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    beginning();
  });

  function directory() {
      inquirer
      .prompt ({
          name: "direction",
          type: "list",
          message: "What would you like to do?",
          choices: ["View Departments", "View Roles", "View Employees", "Add Departments", "Add Roles", "Add Employees", "Update Employee Roles", "EXIT"]
      })
      .then((response) => {
        if(response.direction === "View Departments") {
            console.log("You chose to View Department...\n");
            viewDepartment();
        } else if (response.direction === "EXIT") {
            console.log("You chose to EXIT...\n");
            connection.end();
        } else if (response.direction === "Add Employees") {
            console.log("You chose to Add Employee...\n");
            addEmployee();
        } else if (response.direction === "Add Roles") {
            console.log("You chose to Add Roles...\n");
            addRole();
        } else if (response.direction === "View Roles") {
            console.log("You chose to View Roles...\n");
            viewRoles();
        } else if (response.direction === "View Employees") {
            console.log("You chose to View Employees...\n");
            viewEmployees();
        } else if (response.direction === "Add Departments") {
            console.log("You chose to Add Departments...\n");
            addDepartment();
        } else if (response.direction === "Update Employee Roles") {
            console.log("You chose to Update Employee Roles...\n");
            // updateRole();
        }
      })
  };

function beginning() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if(err) throw err;
        console.table(data);
        directory();
    })
};

function viewDepartment() {
    console.log("View Department initialized");
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data);
        directory();
    })
};

function viewEmployees() {
    console.log("View Employees initialized");
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.table(data);
        directory();
    })
};

function viewRoles() {
    console.log("View Roles initialized");
    connection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.table(data);
        directory();
    })
};

function addEmployee() {
    console.log("Add Employee initialized");
    inquirer
        .prompt([
            {
                name: "roleID",
                type: "list",
                message: "What is the employees' role id?",
                choices: ["2", "3", "4", "5"],
            },
            {
                name: "employeeFirst",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "employeeLast",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "employeeManager",
                type: "list",
                message: "What is the ID of the employee's manager? (1 for Principal, 2 for Assistant Principal)",
                choices: ["1", "2"],
            }
        ])
        .then((answer) => {
            connection.query(
              'INSERT INTO employee SET ?',
              {
                first_name: answer.employeeFirst,
                last_name: answer.employeeLast,
                role_id: answer.roleID,
                manager_id: answer.employeeManager,
              },
              (err) => {
                if (err) throw err;
                console.log('Your employee was created successfully!...\n');
                beginning();
              }
            );
          });
};

function addRole() {
    console.log("Add Role initialized");
    inquirer
        .prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What is the title of the role you would like to add?",
            },
            {
                name: "roleSalary",
                type: "input",
                message: "What is the salary of the role you are adding?"
            },
            {
                name: "departmentID",
                type: "list",
                message: "Which department does this role belong?",
                choices: ["Administration", "Instruction", "Cafeteria"]
            }
        ])
        .then((answer) => {
            connection.query(
              'INSERT INTO role SET ?',
              {
                title: answer.roleTitle,
                salary: answer.roleSalary,
                department_id: answer.departmentID,
              },
              (err) => {
                if (err) throw err;
                console.log('Your role was created successfully!...\n');
                beginning();
              }
            );
          });
};

function addDepartment() {
    console.log("Add Department initialized");
    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the name of the department you are adding?",
            }
        ])
        .then((answer) => {
            connection.query(
              'INSERT INTO department SET ?',
              {
                name: answer.departmentName,
              },
              (err) => {
                if (err) throw err;
                console.log('Your department was created successfully!...\n');
                beginning();
              }
            );
          });
};

function updateRole() {
    console.log("Update Role initialized");
    inquirer
        .prompt([
            {
                name: "roleDecision",
                type: "list",
                message: "What would you like to update?",
            }
        ])
        .then((answer) => {
            connection.query(
              'INSERT INTO department SET ?',
              {
                name: answer.departmentName,
              },
              (err) => {
                if (err) throw err;
                console.log('Your department was created successfully!...\n');
                beginning();
              }
            );
          });
};