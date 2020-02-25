DROP DATABASE IF EXISTS business;
CREATE database business;

USE business;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id)
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT DEFAULT NULL,
PRIMARY KEY(id)
);

INSERT INTO departments (id,name)
VALUES ('1', 'IT'), ('2', 'Marketing');

INSERT INTO roles (id, title, salary, department_id)
VALUES ('1', 'Publisher', '80.000', '2'), ('2', 'Admin', '75.000', '1');

INSERT INTO employees (id, first_name, Last_name, role_id, manager_id)
VALUES ('1', 'Matthew', 'Grimes', '2', '3'), ('2', 'Jeff', 'Smith', '1', '4');
