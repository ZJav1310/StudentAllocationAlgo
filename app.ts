import AssignmentService from "./lib/services/assignment.service";
import { students, projects } from "./lib/data/test.data";

console.log("Welcome to the assignment service!");

const a = new AssignmentService(students, projects);

/**
 * Assign students to projects
 */
a.assign();

/**
 * Log the state of the service
 */
a.logState();
