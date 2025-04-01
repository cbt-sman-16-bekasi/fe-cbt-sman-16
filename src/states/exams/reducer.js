import { ActionType } from './action';

const initialState = {
  typeExams: [],
  typeExamDetail: null,
  error: null,
  loading: false,
};

// 🔹 Reducer Function
function examsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_TYPE_EXAMS:
      return {
        ...state,
        typeExams: action.payload.typeExams,
        loading: false,
      };

    case ActionType.CREATE_TYPE_EXAM:
      return {
        ...state,
        typeExams: [...state.typeExams, action.payload.newTypeExam],
        loading: false,
      };

    case ActionType.DELETE_TYPE_EXAM:
      return {
        ...state,
        typeExams: state.typeExams.filter(
          (exam) => exam.id !== action.payload.id
        ),
        loading: false,
      };

    case ActionType.UPDATE_TYPE_EXAM:
      return {
        ...state,
        typeExams: state.typeExams.map((exam) =>
          exam.id === action.payload.updatedTypeExam.id
            ? action.payload.updatedTypeExam
            : exam
        ),
        loading: false,
      };

    case ActionType.RECEIVE_TYPE_EXAM_DETAIL:
      return {
        ...state,
        typeExamDetail: action.payload.typeExamDetail,
        loading: false,
      };

    case ActionType.RECEIVE_EXAM_QUESTIONS:
      return {
        ...state,
        examQuestions: action.payload.examQuestions,
        loading: false,
      };

    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    default:
      return state;
  }
}

export default examsReducer;
