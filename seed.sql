DROP DATABASE IF EXISTS business;
CREATE database business;

USE business;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30)  
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  depatment_id INT  
);

CREATE TABLE employee (
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT DEFAULT NULL 
);

SELECT * FROM business;