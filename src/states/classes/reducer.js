import { ActionType } from './action';

const initialState = {
  classes: [],
  classDetail: null,
  error: null,
  loading: false,
};

function classesReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_CLASSES:
      return {
        ...state,
        classes: action.payload.classes,
        error: null,
      };

    case ActionType.RECEIVE_CLASS_DETAIL:
      return {
        ...state,
        classDetail: action.payload.classDetail,
        error: null,
      };

    case ActionType.CREATE_CLASS:
      return {
        ...state,
        classes: [...state.classes, action.payload.newClass],
        error: null,
      };

    case ActionType.UPDATE_CLASS:
      return {
        ...state,
        classes: state.classes.map((cls) =>
          cls.id === action.payload.updatedClass.id
            ? action.payload.updatedClass
            : cls
        ),
        error: null,
      };

    case ActionType.DELETE_CLASS:
      return {
        ...state,
        classes: state.classes.filter((cls) => cls.id !== action.payload.id),
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

export default classesReducer;
