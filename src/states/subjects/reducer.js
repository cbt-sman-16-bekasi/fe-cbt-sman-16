import { ActionType } from './action';

const initialState = {
  subjects: [],
  subjectDetail: null,
  error: null,
  loading: false,
};

function subjectsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_SUBJECTS:
      return {
        ...state,
        subjects: action.payload.subjects,
        error: null,
      };

    case ActionType.CREATE_SUBJECT:
      return {
        ...state,
        subjects: [...state.subjects, action.payload.newSubject],
        error: null,
      };

    case ActionType.DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter(
          (subject) => subject.id !== action.payload.id
        ),
        error: null,
      };

    case ActionType.UPDATE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.map((subject) =>
          subject.id === action.payload.updatedSubject.id
            ? action.payload.updatedSubject
            : subject
        ),
        error: null,
      };

    case ActionType.RECEIVE_SUBJECT_DETAIL:
      return {
        ...state,
        subjectDetail: action.payload.subjectDetail,
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

export default subjectsReducer;
