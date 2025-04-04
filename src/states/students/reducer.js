import { ActionType } from './action';

const initialState = {
  students: {
    records: [],
  },
  studentDetail: null,
  error: null,
  loading: false,
};

function studentsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_STUDENTS:
      return {
        ...state,
        students: action.payload.students,
        error: null,
      };

    case ActionType.CREATE_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload.newStudent],
        error: null,
      };

    case ActionType.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student.ID !== action.payload.id
        ),
        error: null,
      };

    case ActionType.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.updatedStudent.id
            ? action.payload.updatedStudent
            : student
        ),
        error: null,
      };

    case ActionType.RECEIVE_STUDENT_DETAIL:
      return {
        ...state,
        studentDetail: action.payload.studentDetail,
        error: null,
      };

    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
}

export default studentsReducer;
