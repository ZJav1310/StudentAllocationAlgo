type TUser = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

enum ServiceState {
  READY,
  ASSIGNING,
  ERROR,
  DONE,
}

type TAssigned = {
  student: TStudent;
  project: TProject;
};

type TStudent = {
  id: number;
  name: string;
  applied: number[];
  state: string;
};

type TProject = {
  id: number;
  title: string;
  capacity: number;
  approved_courses: number[];
};

export { ServiceState, TAssigned, TStudent, TProject };
