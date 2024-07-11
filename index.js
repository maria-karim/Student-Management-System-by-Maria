#!/usr/bin/env node
import inquirer from "inquirer";
//project # 6 :        "STUDENT MANAGEMENT SYSTEM"
//ABOUT:This project basically about that how to  students enroll,add or remove on the basis of Their specific ID in any course, this project clear the concepts that how to implement the object-orienting-programming system.
// define the student class
class Student {
    //when we want to assign same or common  values for all classes or method then we make static variables
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    //for assigning different values to all of our properties we make constructer objects  
    constructor(name) {
        this.id = Student.counter++; //for accses any students properties we used "this" keywords & ++ used to add 1 no to counter
        this.name = name;
        this.courses = []; //initialize an empty array for courses
        this.balance = 100;
    }
    // method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    //Method to view a student balance
    veiw_balance() {
        console.log(`Balance for ${this.name}:$${this.balance}`);
    }
    //Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount}Fees paid successfully for ${this.name}`);
        console.log(`Remaining BAlance:$${this.balance}`);
    }
    //Method to display student status
    show_status() {
        console.log(`id:${this.id}`);
        console.log(`name:${this.name}`);
        console.log(`courses:${this.courses}`);
        console.log(`Balance${this.balance}`);
    }
} //Defining a student manager class to manage students:
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new students:
    //inheritance means in new (sub/child)class we used previous class(super /parent) properties & methods:
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student :${name}added sucessfully.Student ID: ${student.id}`);
    }
    //Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name}enrolled in ${course} successfully`);
        }
    }
    //METHOD to view student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.veiw_balance();
        }
        else {
            console.log("student not found . please enter a correct student Id");
        }
    }
    //method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("student not found. please enter a correct student id");
        }
    }
    //method to display student status;
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //method to find a student by student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//main function to run the program;
async function main() {
    console.log("welcome to codeWithMaria - student Management system");
    console.log("-".repeat(50));
    let student_manager = new Student_manager();
    //while loop to keep program runing;
    while (true) {
        let choice = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "view Student balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        //using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "view Student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    },
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Existing...");
                process.exit();
        }
    }
}
//calling a main function
main();
