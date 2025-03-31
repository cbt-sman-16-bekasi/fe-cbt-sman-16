import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_SCHOOL_INFO: 'RECEIVE_SCHOOL_INFO',
  UPDATE_SCHOOL: 'UPDATE_SCHOOL',
  SET_ERROR: 'SET_ERROR',
};

// 🔹 Action Creators
function receiveSchoolInfoActionCreator(schoolInfo) {
  return {
    type: ActionType.RECEIVE_SCHOOL_INFO,
    payload: { schoolInfo },
  };
}

function updateSchoolActionCreator(updatedSchool) {
  return {
    type: ActionType.UPDATE_SCHOOL,
    payload: { updatedSchool },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: { error },
  };
}

// 🔹 Async Functions
function asyncGetSchoolInfo(schoolCode) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const schoolInfo = await api.getSchoolInfo(schoolCode);
      dispatch(receiveSchoolInfoActionCreator(schoolInfo));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateSchool(schoolData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedSchool = await api.updateSchool(schoolData);
      dispatch(updateSchoolActionCreator(updatedSchool));
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
  receiveSchoolInfoActionCreator,
  updateSchoolActionCreator,
  setErrorActionCreator,
  asyncGetSchoolInfo,
  asyncUpdateSchool,
};
