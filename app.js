const mysql = require('mysql');
const inquirer = require('inquirer');

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

  function runManager() {
      inquirer.prompt({
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['View departments', 'View roles', 'View employees', 'Add department', 'Add role', 'Add employee','Exit']
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
        case 'Exit':
            con.end();
            break;
        }
      });
  }

  function viewDepatments() {
    var query = "SELECT * FROM DEPARTMENTs";
      con.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].id + " || Name: " + res[i].name);
      }
      runManager();
    });
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