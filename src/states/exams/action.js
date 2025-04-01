import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_TYPE_EXAMS: 'RECEIVE_TYPE_EXAMS',
  CREATE_TYPE_EXAM: 'CREATE_TYPE_EXAM',
  DELETE_TYPE_EXAM: 'DELETE_TYPE_EXAM',
  UPDATE_TYPE_EXAM: 'UPDATE_TYPE_EXAM',
  RECEIVE_TYPE_EXAM_DETAIL: 'RECEIVE_TYPE_EXAM_DETAIL',
  RECEIVE_EXAM_QUESTIONS: 'RECEIVE_EXAM_QUESTIONS',
  SET_ERROR: 'SET_ERROR',
};

// 🔹 Action Creators
function receiveTypeExamsActionCreator(typeExams) {
  return {
    type: ActionType.RECEIVE_TYPE_EXAMS,
    payload: { typeExams },
  };
}

function createTypeExamActionCreator(newTypeExam) {
  return {
    type: ActionType.CREATE_TYPE_EXAM,
    payload: { newTypeExam },
  };
}

function deleteTypeExamActionCreator(id) {
  return {
    type: ActionType.DELETE_TYPE_EXAM,
    payload: { id },
  };
}

function updateTypeExamActionCreator(updatedTypeExam) {
  return {
    type: ActionType.UPDATE_TYPE_EXAM,
    payload: { updatedTypeExam },
  };
}

function receiveTypeExamDetailActionCreator(typeExamDetail) {
  return {
    type: ActionType.RECEIVE_TYPE_EXAM_DETAIL,
    payload: { typeExamDetail },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: { error },
  };
}

function receiveExamQuestionsActionCreator(examQuestions) {
  return {
    type: ActionType.RECEIVE_EXAM_QUESTIONS,
    payload: { examQuestions },
  };
}

// 🔹 Async Functions
function asyncReceiveTypeExams({
  page = 1,
  size = 10,
  searchKey,
  searchValue,
  filter,
} = {}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const typeExams = await api.getTypeExams({
        page,
        size,
        searchKey,
        searchValue,
        filter,
      });
      dispatch(receiveTypeExamsActionCreator(typeExams));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateTypeExam(typeExamData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const newTypeExam = await api.createTypeExam(typeExamData);
      dispatch(createTypeExamActionCreator(newTypeExam));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteTypeExam(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteTypeExam(id);
      dispatch(deleteTypeExamActionCreator(id));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateTypeExam({ id, code_type_exam, color, role, type_exam }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedTypeExam = await api.updateTypeExam({
        id,
        code_type_exam,
        color,
        role,
        type_exam,
      });
      dispatch(updateTypeExamActionCreator(updatedTypeExam));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetTypeExamDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const typeExamDetail = await api.getTypeExamDetail(id);
      dispatch(receiveTypeExamDetailActionCreator(typeExamDetail));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetExamQuestions(examId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const examQuestions = await api.getExamQuestions(examId);
      dispatch(receiveExamQuestionsActionCreator(examQuestions));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

// 🔹 Export semua actions & async functions
export {
  ActionType,
  receiveTypeExamsActionCreator,
  createTypeExamActionCreator,
  deleteTypeExamActionCreator,
  updateTypeExamActionCreator,
  receiveTypeExamDetailActionCreator,
  receiveExamQuestionsActionCreator,
  setErrorActionCreator,
  asyncReceiveTypeExams,
  asyncCreateTypeExam,
  asyncDeleteTypeExam,
  asyncUpdateTypeExam,
  asyncGetTypeExamDetail,
  asyncGetExamQuestions,
};
