import { ActionType } from './action';

const initialState = {
  teachers: [],
  teacherDetail: null,
  error: null,
  loading: false,
};

function teachersReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_TEACHERS:
      return {
        ...state,
        teachers: action.payload.teachers,
        error: null,
      };

    case ActionType.CREATE_TEACHER:
      return {
        ...state,
        teachers: [...state.teachers, action.payload.newTeacher],
        error: null,
      };

    case ActionType.DELETE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.filter(
          (teacher) => teacher.id !== action.payload.id
        ),
        error: null,
      };

    case ActionType.UPDATE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.map((teacher) =>
          teacher.id === action.payload.updatedTeacher.id
            ? action.payload.updatedTeacher
            : teacher
        ),
        error: null,
      };

    case ActionType.RECEIVE_TEACHER_DETAIL:
      return {
        ...state,
        teacherDetail: action.payload.teacherDetail,
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

export default teachersReducer;
