import {
  TStudent,
  TAssigned,
  ServiceState,
  TProject,
} from "../types/schema.type";

class AssignmentService {
  private Students: TStudent[];
  private Projects: TProject[];
  private Assigned: TAssigned[];

  private Error: any;
  private State: ServiceState;

  constructor(students: TStudent[], projects: TProject[]) {
    this.Students = students;
    this.Projects = projects;
    this.Assigned = [] as TAssigned[];
    this.State = ServiceState.READY;
  }

  public assign() {
    const CHOICES = 3;
    /**
     * Iterate through all the choices,
     * TODO: Maybe make this a recursive function?
     */

    for (let i = 0; i < CHOICES; i++) {
      this._assign(i);
    }
  }

  private _assign(step: number) {
    if (this.Projects.length === 0 || this.Students.length === 0) {
      this.Error = "No students or projects to assign.";
      return;
    }

    this.State = ServiceState.ASSIGNING;

    this.Projects.forEach((project) => {
      /**
       * Find all students that have applied to this project
       */
      const filtered_students = this.Students.filter((student) =>
        student.applied.includes(project.id)
      );

      /**
       * If no students have applied to this project, skip it
       */
      if (filtered_students.length === 0) {
        return;
      }

      /**
       * Find all students that have this as their choice at step
       */
      const filter_choice_students = filtered_students.filter(
        (student) => student.applied[step] === project.id
      );

      /**
       * If no students have this as their first choice, skip it
       */
      if (filter_choice_students.length === 0) {
        return;
      }

      /**
       * Check the capacity of the project, if its at max capacity, remove it and skip
       */
      const assigned_students = this.Assigned.filter(
        (assigned) => assigned.project.id === project.id
      );

      if (assigned_students.length >= project.capacity) {
        this._removeProject(project);
        return;
      }

      /**
       * Assign the students who have this as their step number choice,
       * up to the capacity of the projects,
       * and remove them from the list of students
       */
      filter_choice_students.forEach((student) => {
        if (assigned_students.length < project.capacity) {
          this.Assigned.push({
            student: { ...student, state: "ASSIGNED" },
            project,
          });
          this._removeStudent(student);
        }
        return;
      });

      this.State = ServiceState.DONE;
      return;
    });
  }

  private _removeStudent(student: TStudent) {
    const index = this.Students.indexOf(student);
    if (index > -1) {
      this.Students.splice(index, 1);
    }
    return;
  }

  private _removeProject(project: TProject) {
    const index = this.Projects.indexOf(project);
    if (index > -1) {
      this.Projects.splice(index, 1);
    }
    return;
  }

  public logState() {
    console.log("Students not assigned: ", this.Students);
    console.log("Projects with space(s): ", this.Projects);
    console.log("Assigned: ", this.Assigned);
    console.log("Error: ", this.Error);
    console.log("State: ", this.State);
  }
}

export default AssignmentService;
