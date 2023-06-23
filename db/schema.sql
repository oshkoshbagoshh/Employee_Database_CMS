-- Create the schema for the employee database
DROP DATABASE IF EXISTS employee_db;

-- create db
CREATE DATABASE employee_db;

-- use the database
USE employee_db;

-- Create the departments table
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

-- Create the roles table
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES departments(id)

);

-- Create the employees table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT ,
    manager_id INT,
    FOREIGN KEY (role_id) 
    REFERENCES roles (id),
    FOREIGN KEY (manager_id) 
    REFERENCES employees(id)
    ON DELETE SET NULL
    --  NULL if the employee has no manager


);