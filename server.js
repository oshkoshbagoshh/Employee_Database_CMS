/*
 * @Author: AJ Javadi
 * @Email:
 * @Date: 2023-06-22 21:12:18 
 * @Last Modified by: Someone
 * @Last Modified time: yyyy-06-dd 22:16:55
 * @Description: // creating the initial connection via mysql2
 */



// requirements

const mysql = require('mysql2');
const inquirer = require('inquirer');
// const { Connection } = require('mysql2/typings/mysql/lib/Connection');
const cTable = require('console.table');
//console table

// Connect to database
const db = mysql.createConnection(
 {
host: 'localhost',
// MySQL username,
user: 'root',
password: 'Killbill202!', //INSERT PASSWORD HERE 
database: 'employee_db'
});


// test the connection 
db.connect(function (err) {
    if(err) throw err;
    startProgram ();
});



// testing queries 


//simple query 
// db.query(
//     'SELECT * FROM employees',
//     function(err, results,fields) {
//         console.log(results);// results contain rows
//         // console.log(fields);// fields contain extra meta data 
//     }
// );

// // with placeholder
// db.query(
//     'SELECT * FROM roles WHERE salary >  ?',[50000.00],
//     function(err,results) {
//         console.log(results);
//     }
// );



//  set up inquirer to ask the questions


function startProgram () {
inquirer
    .prompt({
        name: "action",
        type:"list",
        message: "Welcome!...Please select an action",
        choices: [
            "View All departments", new inquirer.Separator(),
            "View all roles", new inquirer.Separator(),
            "View all employees", new inquirer.Separator(),
            "Add a department",new inquirer.Separator(),
            "Add a role",new inquirer.Separator(),
            "Add an employee",new inquirer.Separator(),
            "Update an employee role",new inquirer.Separator(),
            // Update employee manager
            "Update an employee's manager", new inquirer.Separator(),
            "Exit"
            /* BONUS HERE: TODO:
                    Update employee managers.
                      View employees by manager.
                         View employees by department.
                        Delete departments, roles, and employees.
                        View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

                        ]
                })
                }

                */
            ]
            // use a switch statement to call the functions
        })
        .then (function (answer) {
            switch (answer.action) {
                case "View All departments":
                    viewAllDepartments();
                    break;
                case "View All roles":
                    viewAllRoles();
                    break;

                    case "View all employees":
                        viewAllEmployees();
                        break;
                    case "Add a department":
                        addDepartment();
                        break;
                    case "Add a role":
                        addRole();
                        break;
                    case "Add an employee":
                        addEmployee();
                        break;
                    case "Update an employee role":
                        updateEmployeeRole();
                        break;
                    case "View Salaries by Department":
                        viewSalariesbyDepartment();
                        break;
                    // case "Update an employee's manager":
                    //     updateEmployeeManager();
                    //     break;
                    case "Exit":
                        db.end();
                        break;
            }
        });

    }

    
        // create the functions here 



function viewAllDepartments() {
    db.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        startProgram();
    });
}

function viewAllRoles() {
    db.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        startProgram();
    });
}

function viewAllEmployees() {
    db.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        startProgram();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Please enter the name of the department you would like to add."
        })
        .then(function (answer) {
            db.query("INSERT INTO departments SET ?", { name: answer.department }, function (err, res) {
                if (err) throw err;
                console.log("Department added successfully!");
                startProgram();
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Please enter the title of the role you would like to add."
            },
            {
                name: "salary",
                type: "input",
                message: "Please enter the salary for the role."
            },
            {
                name: "department_id",
                type: "input",
                message: "Please enter the department ID the role belongs to."
            }
        ])
        .then(function (answer) {
            db.query("INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Role added successfully!");
                    startProgram();
                }
            );
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "Please enter the first name of the employee you would like to add."
            },
            {
                name: "last_name",
                type: "input",
                message: "Please enter the last name of the employee you would like to add."
            },
            {
                name: "role_id",
                type: "input",
                message: "Please enter the role ID for the employee."
            },
            {
                name: "manager_id",
                type: "input",
                message: "Please enter the manager ID for the employee."
            }
        ])
        .then(function (answer) {
            db.query("INSERT INTO employees SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    startProgram();
                }
            );
        });
}

function updateEmployeeRole() {
    db.query("SELECT * FROM employees", function (err, employees) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'employeeId',
                type: 'list',
                message: 'Which employee\'s role do you want to update?',
                choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
            },
            {
                name: 'roleId',
                type: 'input',
                message: 'Which role ID do you want to assign to the selected employee?'
            }
        ])
            .then(function (answer) {
                db.query('UPDATE employees SET ? WHERE ?', [{ role_id: answer.roleId }, { id: answer.employeeId }], function (err) {
                    if (err) throw err;
                    console.log('Updated employee\'s role successfully!');
                    startProgram();
                });
            });
    });
}

// function updateEmployeeManager() {
//     db.query('SELECT * FROM employees;',function(err,employees)  {
//         if(err) throw err;
        

//     inquirer.prompt({
//         name:"role_id ",
//         type:"list",
//         message: 'Which employee\'s manager do you want to update?',
//         choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))

//     },
//     {
//         name: 'manager_id',
//         type: 'list',
//         message: 'Who would you like to assign as their manager?',
//         choices
        
//     });
// })
// }

// function viewSalariesbyDepartment(){
//     db.query('SELECT ')
// }


/*
TODO: Bonus

Try to add some additional functionality to your application, such as the ability to do the following:

[] Update employee managers.

[] View employees by manager.

[] View employees by department.

[] Delete departments, roles, and employees.

[] View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.


*/