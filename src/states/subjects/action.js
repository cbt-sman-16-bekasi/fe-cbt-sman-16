import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_SUBJECTS: 'RECEIVE_SUBJECTS',
  CREATE_SUBJECT: 'CREATE_SUBJECT',
  DELETE_SUBJECT: 'DELETE_SUBJECT',
  UPDATE_SUBJECT: 'UPDATE_SUBJECT',
  RECEIVE_SUBJECT_DETAIL: 'RECEIVE_SUBJECT_DETAIL',
  SET_ERROR: 'SET_ERROR',
};

// Action Creators
function receiveSubjectsActionCreator(subjects) {
  return {
    type: ActionType.RECEIVE_SUBJECTS,
    payload: { subjects },
  };
}

function createSubjectActionCreator(newSubject) {
  return {
    type: ActionType.CREATE_SUBJECT,
    payload: { newSubject },
  };
}

function deleteSubjectActionCreator(id) {
  return {
    type: ActionType.DELETE_SUBJECT,
    payload: { id },
  };
}

function updateSubjectActionCreator(updatedSubject) {
  return {
    type: ActionType.UPDATE_SUBJECT,
    payload: { updatedSubject },
  };
}

function receiveSubjectDetailActionCreator(subjectDetail) {
  return {
    type: ActionType.RECEIVE_SUBJECT_DETAIL,
    payload: { subjectDetail },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: { error },
  };
}

// 🔹 Async Functions
function asyncReceiveSubjects({
  page = 1,
  size = 10,
  searchKey,
  searchValue,
  filter,
} = {}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const subjects = await api.getAllClassSubjects(
        { page, size, searchKey, searchValue, filter },
        dispatch
      );
      dispatch(receiveSubjectsActionCreator(subjects));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateSubject(subjectData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const newSubject = await api.createClassSubject(subjectData);
      dispatch(createSubjectActionCreator(newSubject));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteSubject(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteClassSubject(id);
      dispatch(deleteSubjectActionCreator(id));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(asyncReceiveSubjects());
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateSubject({ id, class_code, subject_code }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedSubject = await api.updateClassSubject({
        id,
        class_code,
        subject_code,
      });
      dispatch(updateSubjectActionCreator(updatedSubject));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetSubjectDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const subjectDetail = await api.getClassSubjectDetail(id);
      dispatch(receiveSubjectDetailActionCreator(subjectDetail));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveSubjectsActionCreator,
  createSubjectActionCreator,
  deleteSubjectActionCreator,
  updateSubjectActionCreator,
  receiveSubjectDetailActionCreator,
  setErrorActionCreator,
  asyncReceiveSubjects,
  asyncCreateSubject,
  asyncDeleteSubject,
  asyncUpdateSubject,
  asyncGetSubjectDetail,
};
