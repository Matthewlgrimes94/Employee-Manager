DROP DATABASE IF EXISTS business;
CREATE database business;

USE business;

CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(30)  
);

CREATE TABLE roles (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT  
);

CREATE TABLE employees (
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT DEFAULT NULL 
);

INSERT INTO departments (id,name)
VALUES ('1', 'IT'), ('2', 'Marketing');

INSERT INTO roles (id, title, salary, department_id)
VALUES ('1', 'Publisher', '80.000', '2'), ('2', 'Admin', '75.000', '1');

INSERT INTO employees (id, first_name, Last_name, role_id, manager_id)
VALUES ('1', 'Matthew', 'Grimes', '2', '3'), ('2', 'Jeff', 'Smith', '1', '4');
