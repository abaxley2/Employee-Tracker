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
            console.log("You chose to View Department.../n");
            viewDepartment();
        } else if (response.direction === "EXIT") {
            console.log("You chose to EXIT.../n");
            connection.end();
        } else if (response.direction === "Add Employees") {
            console.log("You chose to Add Employee.../n");
            addEmployee();
        } else if (response.direction === "View Roles") {
            console.log("You chose to View Roles...\n");
            viewRoles();
        } else if (response.direction === "View Employees") {
            console.log("You chose to View Employees...\n");
            viewEmployees();
        } else if (response.direction === "Add Departments") {
            console.log("You chose to Add Departments...\n");
            addDepartment();
        } else if (response.direction === "Add Roles") {
            console.log("You chose to Add Roles...\n");
            addRole();
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

  function addEmployee() {
      console.log("Add Employee initialized");
      connection.query("SELECT * FROM roles", (err, data) => {
        if (err) throw err;
        const roleChoices = data.map((role) => {
            return {
            name: role.title,
            value: role.id,
            }
        })
      }
      
      )
  };