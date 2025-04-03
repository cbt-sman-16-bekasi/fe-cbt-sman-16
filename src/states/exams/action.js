import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import useExamApi from "../../utils/rest/exam.js";

const ActionType = {
  RECEIVE_EXAMS: 'RECEIVE_EXAMS',
  CREATE_EXAM: 'CREATE_EXAM',
  DELETE_EXAM: 'DELETE_EXAM',
  UPDATE_EXAM: 'UPDATE_EXAM',
  RECEIVE_EXAM_DETAIL: 'RECEIVE_EXAM_DETAIL',
  RECEIVE_EXAM_QUESTIONS: 'RECEIVE_EXAM_QUESTIONS',
  SET_ERROR: 'SET_ERROR',
};

// 🔹 Action Creators
function receiveExamsActionCreator(exams) {
  return {
    type: ActionType.RECEIVE_EXAMS,
    payload: { exams },
  };
}

function createExamActionCreator(newExam) {
  return {
    type: ActionType.CREATE_EXAM,
    payload: { newExam },
  };
}

function deleteExamActionCreator(id) {
  return {
    type: ActionType.DELETE_EXAM,
    payload: { id },
  };
}

function updateExamActionCreator(updatedExam) {
  return {
    type: ActionType.UPDATE_EXAM,
    payload: { updatedExam },
  };
}

function receiveExamDetailActionCreator(ExamDetail) {
  return {
    type: ActionType.RECEIVE_EXAM_DETAIL,
    payload: { ExamDetail },
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
function asyncReceiveExams({
  page = 1,
  size = 10,
  searchKey,
  searchValue,
  filter,
} = {}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const exams = await useExamApi.allExam({
        page,
        size,
        searchKey,
        searchValue,
        filter,
      });
      dispatch(receiveExamsActionCreator(exams));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateExam(ExamData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const newExam = await api.createExam(ExamData);
      dispatch(createExamActionCreator(newExam));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteExam(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteTypeExam(id);
      dispatch(deleteExamActionCreator(id));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateExam({ id, code_exam, color, role, type_exam }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedExam = await api.updateTypeExam({
        id,
        code_exam,
        color,
        role,
        type_exam,
      });
      dispatch(updateExamActionCreator(updatedExam));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetExamDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const ExamDetail = await api.getExamDetail(id);
      dispatch(receiveExamDetailActionCreator(ExamDetail));
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
  receiveExamsActionCreator,
  createExamActionCreator,
  deleteExamActionCreator,
  updateExamActionCreator,
  receiveExamDetailActionCreator,
  receiveExamQuestionsActionCreator,
  setErrorActionCreator,
  asyncReceiveExams,
  asyncCreateExam,
  asyncDeleteExam,
  asyncUpdateExam,
  asyncGetExamDetail,
  asyncGetExamQuestions,
};
