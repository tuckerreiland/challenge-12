const inquirer = require('inquirer');

const choices = [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role"
]

const departments = []
const roles = []

const newDepartment = []
const newRole = []
const newEmployee = []

//fetch requests here
    //fetch to retrieve department and role info from the db
    //fetch to post to push newDepartment, newRole, newEmployee to employees_db

const mainMenu = async () => {
    console.log("Welcome!")
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
}};

//Functions for viewing departments, roles, and employees
const viewAllDepartments = async () =>{

}

const viewAllRoles = async () =>{

}

const viewAllEmployees = async () =>{

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
}

const addRole = async () => {
    console.log(`You chose to create a new Role.`)
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
            choices: [departments, 'Create and assign a new department']
        }
    ])
    if (input.department === 'Create and assign a new department') {
        addDepartment();
    }
    //need a function to store and update the db
    console.log(`${input.title} role created.`)
    mainMenu()
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