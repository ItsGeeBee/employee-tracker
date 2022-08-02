DROP DATABASE IF EXISTS employee_tracker_db; --Prevent an error from occurring if the database does not exist
CREATE DATABASE employee_tracker_db; -- Create database under this name 

USE employee_tracker_db; -- use this data base 

-- Create table for each department
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id) -- Set primary key 
);
-- Create table for each role
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) -- used to link 2 tables together 
    REFERENCES department(id) -- Referencing 'department' table 
);