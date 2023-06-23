const { ifError } = require('assert');
const inquirer = require('inquirer');
inquirer
    .prompt([
        // pass questions here 
    ])
    .then((answers) => {
        // Use user feedaback
    })
    .catch((error => {
        if(error.isTtyError) {
            // prompt couldn't be rendered in current env
        } else {
            // something else went wrong
        }
    }))

    // call once somewhere in the beginning of the app
const cTable = require('console.table');
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

// prints
// name  age
// ----  ---
// foo   10
// bar   20