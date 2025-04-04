import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_CLASS_CODES: 'RECEIVE_CLASS_CODES',
  RECEIVE_DASHBOARD_DATA: 'RECEIVE_DASHBOARD_DATA',
  RECEIVE_SUBJECTS: 'RECEIVE_SUBJECTS',
  RECEIVE_USER_ROLES: 'RECEIVE_USER_ROLES',
  SET_ERROR: 'SET_ERROR',
};

function receiveClassCodeActionCreator(classCodes) {
  return {
    type: ActionType.RECEIVE_CLASS_CODES,
    payload: { classCodes },
  };
}

function receiveDashboardDataActionCreator(dashboardData) {
  return {
    type: ActionType.RECEIVE_DASHBOARD_DATA,
    payload: { dashboardData },
  };
}

function receiveSubjectsActionCreator(subjects) {
  return {
    type: ActionType.RECEIVE_SUBJECTS,
    payload: { subjects },
  };
}

function receiveUserRolesActionCreator(userRoles) {
  return {
    type: ActionType.RECEIVE_USER_ROLES,
    payload: { userRoles },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: { error },
  };
}

function asyncGetClassCode() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const classCodes = await api.getClassCode();
      dispatch(receiveClassCodeActionCreator(classCodes));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetDashboardData() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const dashboardData = await api.getDashboardData();
      dispatch(receiveDashboardDataActionCreator(dashboardData));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetSubjects() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const subjects = await api.getSubjects();
      dispatch(receiveSubjectsActionCreator(subjects));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetUserRoles() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const userRoles = await api.getUserRoles();
      dispatch(receiveUserRolesActionCreator(userRoles));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveClassCodeActionCreator,
  receiveDashboardDataActionCreator,
  receiveSubjectsActionCreator,
  receiveUserRolesActionCreator,
  setErrorActionCreator,
  asyncGetClassCode,
  asyncGetDashboardData,
  asyncGetSubjects,
  asyncGetUserRoles,
};
