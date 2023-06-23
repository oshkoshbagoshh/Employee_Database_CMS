use employee_db;

-- queries 
SELECT * FROM departments;

SELECT * FROM roles;

SELECT * FROM employees;

-- Update statement 
UPDATE employees 
SET manager_id = 1
WHERE id = 2;


-- Delete Statement
DELETE FROM employes 
WHERE  id = ?; -- enter ID HERE 

-- SELECT 
-- e.first_name, e.last_name, e.role_id,
-- r.title,
-- r.salary,
-- r.department_id
-- FROM employees e
-- LEFT JOIN roles r ON roles.role_id = employees.role_id
-- GROUP BY r.department_id
