const mysql = require('mysql');
const inquirer = require('enquirer');

var con = mysql.createConnection({
    host: "localhost",
    user: "Matt",
    password: "passwordyo"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  function start() {
      inquirer.prompt({
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['View departments', 'View roles', 'View employees', 'Add department', 'Add role', 'Add employee']
      }).then(function(answer){
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
        }
      });
  }

  function viewDepatments() {

  }

  function viewRoles() {

  }

  function viewEmployees() {

  }

  function addDepartment() {

  }

  function addRole() {

  }

  function addEmployee() {
      
  }