
CREATE DATABASE employee_managementDB;

USE employee_managementDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Administration");

INSERT INTO department (name)
VALUES ("Instruction");

INSERT INTO department (name)
VALUES ("Cafeteria");

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10, 2),
department_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department (id)
);


INSERT INTO role (title, salary, department_id)
VALUES ("Principal", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Assistant Principal", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Counselor", 70000, 1);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role (id),
FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Austin", "Baxley", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sherri", "Jackson", 2, 1),("Toni", "Perez", 3, 1);