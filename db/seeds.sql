-- use the database
USE employee_db;


-- insert data departments
INSERT INTO departments 
VALUES 
    (01, "C-Suite"),
    (02,"Finance"),
    (03, "Legal"),
    (04, "Human Resources"),
    (05, "IT"),
    (06, "Sales"),
    (07,"Marketing"),
    (08, "Intern"),
    (09, "Temp"),
    (10, "Management");

-- Select the data to test it 
SELECT * FROM departments;

-- insert data into roles
INSERT INTO roles (title,salary,department_id)
VALUES 
    ("Accountant",900000.00,(SELECT id FROM departments WHERE name ='Finance')),
    ("Lawyer",80000.00,(SELECT id FROM departments WHERE name ='Legal')),
    ("Recruiter",50000.00,(SELECT id FROM departments WHERE name ='Human Resources')),
    ("Software Engineer",75000.00,(SELECT id FROM departments WHERE name ='IT')),
    ("Web Developer",75000.00,(SELECT id FROM departments WHERE name ='IT')),
    ("Account Manager",50000.00,(SELECT id FROM departments WHERE name ='Sales')),
    ("Advertising Strategist",400000.00,(SELECT id FROM departments WHERE name ='Marketing')),
    ("Data Entry",20000.00,(SELECT id FROM departments WHERE name ='Intern')),
    ("Temp",40000,(SELECT id FROM departments WHERE name ='Temp')),
    ("Regional Manager",80000.00,(SELECT id FROM departments WHERE name ='Management'));

-- select the data
SELECT * FROM roles;


-- insert data into employees
INSERT INTO employees (first_name,last_name,role_id)
VALUES
    ('Ethan', 'James', (SELECT id FROM roles WHERE title = "CEO")),
    ('Sam', 'Crowley', (SELECT id FROM roles WHERE title = "Lawyer")),
    ('Oscar', 'Nunez', (SELECT id FROM roles WHERE title = "Accountant")),
    ('Toby', 'Flenderson', (SELECT id FROM roles WHERE title = "Recruiter")),
    ('Ryan', 'Howard', (SELECT id FROM roles WHERE title = "Temp")),
    ('Dwight', 'Schrute', (SELECT id FROM roles WHERE title = "Account Manager")),
    ('Michael', 'Scott', (SELECT id FROM roles WHERE title = "Regional Manager"));

-- select the data
SELECT * FROM employees;
