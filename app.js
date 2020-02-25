const mysql = require('mysql');
const inquirer = require('inquirer');

// Connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "passwordyo",
    database: "business"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    runManager();
  });

  //Menu
  function runManager() {
      inquirer.prompt({
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['View departments', 'View roles', 'View employees', 'Add department', 'Add role', 'Add employee','Update a role', 'Update a department', 'Exit']
      }).then(function(answer){
        //Choice cases
        switch (answer.action) {
        case 'View departments':
            viewDepatments();
            break;
        case 'View roles':
            viewRoles();
            break;
        case 'View employees':
            viewEmployees();
            break;
        case 'Add department':
            addDepartment();
            break;
        case 'Add role':
            addRole();
            break;
        case 'Add employee':
            addEmployee();
            break;
        case 'Update a role':
            updateRole()
            break;
        case 'Update a department':
          updateDepartment()
          break;
        case 'Exit':
            con.end();
            break;
        }
      });
  }

  //Select and log everything from departments table
  function viewDepatments() {
    var query = "SELECT * FROM DEPARTMENTS";
      con.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("\n" + "|| Name: " + res[i].name + "|| ID: " + res[i].id);
      }
      runManager();
    });
  }

  //Select and log everything from roles table
  function viewRoles() {
    var query = "SELECT * FROM ROLES";
      con.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("\n" + "|| Role: " + res[i].title);
      }
      runManager();
    });
  }

  //Select and log everything from employees table
  function viewEmployees() {
    var query = "SELECT CONCAT(employees.first_name, ' ', employees.last_name) as employee_name, roles.title, departments.name, employees.id FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id ";
      con.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("\n" + "|| Employee: " + res[i].employee_name + "|| Title: " + res[i].title + "|| Department: " + res[i].name + "|| ID: " + res[i].id);
      }
      runManager();
    });
  }

  //Insert new department into database
  function addDepartment() {
    inquirer.prompt(
    {
      type: 'input',
      message: 'Enter new department name',
      name: 'department'
    }
    ).then(function(answers){
      con.query("INSERT INTO departments (name) VALUES (?)", [answers.department], function(err, data) {
        if (err) throw err
        console.log("\n" + "New Departmant added: " + answers.department);
        runManager();
      });
    });
  }

  //Insert new role into database
  function addRole() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'Enter new role name',
        name: 'role'
      },
      {
        type: 'input',
        message: 'Enter new role salary',
        name: 'salary'
      },
      {
        type: 'input',
        message: 'enter new role department id',
        name: 'department_id'
      },
      ]).then(function(answers){
        con.query("INSERT INTO roles set ?", {title: answers.role, salary: answers.salary, department_id: answers.department_id}, function(err, data) {
          if (err) throw err
          console.log("\n" + "New role added: " + answers.role);
          runManager();
        });
      });
  }

  //Insert new employee into database
  function addEmployee() {
    inquirer.prompt([{
      type: 'inut',
      message: 'Enter first name',
      name: 'firstName'
    },
    {
      type: 'input',
      message: 'Enter last name',
      name: 'lastName'
    },
    {
      type: 'input',
      message: 'Enter role id',
      name: 'roleId'
    },
    {
      type: 'input',
      message: 'Enter manager id',
      name: 'managerId'
    }
  ]).then(function(answers){
    con.query("INSERT INTO employees set ?", {first_name: answers.firstName, last_name: answers.lastName, role_id: answers.roleId, manager_id: answers.managerId}, function(err, data) {
      if (err) throw err;
      console.log("\n" + "New employee added: " + answers.firstName + " " + answers.lastName + "\n");
      runManager();
    });
  })
  }

  //List departments as choices, and use choice to update department
  function updateDepartment() {
    con.query("SELECT * FROM  departments", function(err, data) {
      if (err) throw err;
      let choices = [];
      for (i = 0; i < data.length; i++) {
        choices.push({name: `${data[i].name}`, value: `${data[i].name}`});
      }
      inquirer.prompt(
        [
        {
          type: 'list',
          message: 'Select department to update',
          choices: choices,
          name: 'department'
        }
        ]
        ).then(function(answer){
         var departmentToUpdate = answer.department;
         inquirer.prompt(
            {
              type: 'input',
              message: 'Enter updated department name',
              name: 'newName'
            }
         ).then(function(answer) {
          var newName = answer.newName;
          con.query("UPDATE departments SET ? WHERE ?",
            [
              {
                name: newName
              },
              {
                name: departmentToUpdate
              }
            ]
          );
          console.log("\n" + "Department updated to " + newName + "\n");
          runManager();
         });
        });
    });
  }

  //Find and display all roles from database as choices, and change selected role information
  function updateRole() {
    con.query("SELECT * FROM roles", function(err, data) {
      if (err) throw err;
      let choices = [];
      for (i = 0; i < data.length; i ++) {
        choices.push({name: `${data[i].title}`, value: data[i].title});
      }
      inquirer.prompt({
        type: 'list',
        message: 'Which role would you like to update?',
        choices: choices,
        name: 'role'
      }).then(function(answer){
        choices = [];
        var roleToUpdate = answer.role;
        inquirer.prompt(
        [{
          type: 'input',
          message: 'Enter updated role title',
          name: 'title'
        },
        {
          type: 'input',
          message: 'Enter updated salary',
          name: 'salary'
        }
      ])
        .then(function(answers) {
          var newTitle = answers.title;
          var newSalary = answers.salary
          con.query("UPDATE roles SET ? WHERE ?", 
          [
            {
              title: newTitle,
              salary: newSalary
            },
            {
              title: roleToUpdate
            }
          ]
          );
          console.log('\n'+'Role updated to ' + roleToUpdate + '\n');
          runManager();
          });
      });
    });
  }

