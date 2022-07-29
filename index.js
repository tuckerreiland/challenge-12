const inquirer = require('inquirer');
const mysql = require('mysql2');
const { title } = require('process');
const cTable = require('console.table');

const employeesDB = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

const choices = [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role",
    "Exit"
]

const getAllDepartments = async () => {
    const allDepartmentData = await employeesDB.promise().query('SELECT * FROM department');
    return  allDepartmentData[0].map(({title})=>(title))
}

const getAllRoles = async () => {
    const allRoleData = await employeesDB.promise().query('SELECT * FROM emp_role');
    console.log(allRoleData)
    // return allDepartmentData[0].map(({title})=>title)
}


//mainMenu function
const mainMenu = async () => {
    const input = await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: choices
        }
    ])
    switch (input.choice){
        case 'View all departments': viewAllDepartments();
        break;
        case 'View all roles': viewAllRoles();
        break;
        case 'View all employees': viewAllEmployees();
        break;
        case 'Add a department': addDepartment();
        break;
        case 'Add a role': addRole();
        break;
        case 'Add an employee': addEmployee();
        break;
        case 'Update an employee role': UpdateEmployeeRole();
        break;
        case 'Exit': console.log("Exiting Application.");
        return;
}};

//Functions for viewing departments, roles, and employees
const viewAllDepartments = async () =>{
    employeesDB.query('SELECT * FROM department', (err, data) =>{
        if (err) {
            throw err
        }
    const allDepartments = data.map(({title}) => title)
    console.table(data);
    return data;
    })
    mainMenu();
};

const viewAllRoles = async () =>{
    employeesDB.query('SELECT * FROM emp_role', (err, data) =>{
        if (err) {
            throw err
        }
    const allRoles = data.map(({title}) => title)
    console.table(data)
    })
    mainMenu();
}

const viewAllEmployees = async () =>{
    employeesDB.query('SELECT * FROM employee', (err, data) =>{
        if (err) {
            throw err
        }
    const allRoles = data.map(({title}) => title)
    console.table(data)
    })
    mainMenu();
}

//Functions for adding new departments, roles, and employees
const addDepartment = async () => {
    console.log(`You chose to create a new Department.`)
    const input = await inquirer.prompt([
        {
            type: 'input',
            message: "Enter the new Department's name:",
            name: 'name',
        }
    ])
    employeesDB.query('INSERT INTO department (title) VALUES (?)', input.name, (err, results) => {
        if (err){
            throw err
        }
    });
    console.log(`${input.name} added to list of departments.`)
    mainMenu ();
};

const addRole = async () => {
    await getAllDepartments()
    .then(async (data) => {
        // const allDepartments = data;
        const input = await inquirer.prompt([
            {
                type: 'input',
                message: "Enter the new Role's title:",
                name: 'title',
            },
            {
                type: 'input',
                message: "Enter the new Role's salary:",
                name: 'salary',
            },
            {
                type: 'list',
                message: 'Assign a department for this role:',
                name: 'department',
                choices: data
            }
            
        ])
        return input;
    })
    .then((result) => {
            const newRole = result
            const departmentID = employeesDB.query('SELECT id FROM department WHERE department.title=?', newRole.department)
            employeesDB.query('INSERT INTO emp_role (title,salary,department_id) VALUES (?,?,?)', [newRole.title, newRole.salary, departmentID], (err, results) => {
                if (err){
                    throw err
                }
            });
        return newRole;
    })
    .then(
        getAllRoles()
    )
}
const addEmployee = async () => {
    console.log(`You chose to create a new Employee.`)
    const input = await inquirer.prompt([
        {
            type: 'input',
            message: "Enter the new Employee's first name:",
            name: 'firstName',
        },
        {
            type: 'input',
            message: "Enter the new Employee's last name:",
            name: 'lastName',
        },
        {
            type: 'list',
            message: 'Assign a role for this employee:',
            name: 'role',
            choices: [roles, 'Create and assign a new role']
        }
    ])
    if (input.role === 'Create and assign a new role') {
        addRole();
    }
    //need a function to store and update the db
    console.log(`${input.firstName} ${input.lastName} added to employee database.`)
    mainMenu()
}
addRole();
// mainMenu();