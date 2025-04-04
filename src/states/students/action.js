import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_STUDENTS: 'RECEIVE_STUDENTS',
  CREATE_STUDENT: 'CREATE_STUDENT',
  DELETE_STUDENT: 'DELETE_STUDENT',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  RECEIVE_STUDENT_DETAIL: 'RECEIVE_STUDENT_DETAIL',
  SET_ERROR: 'SET_ERROR',
};

// 🔹 Action Creators
function receiveStudentsActionCreator(students) {
  return {
    type: ActionType.RECEIVE_STUDENTS,
    payload: { students },
  };
}

function createStudentActionCreator(newStudent) {
  return {
    type: ActionType.CREATE_STUDENT,
    payload: { newStudent },
  };
}

function deleteStudentActionCreator(id) {
  return {
    type: ActionType.DELETE_STUDENT,
    payload: { id },
  };
}

function updateStudentActionCreator(updatedStudent) {
  return {
    type: ActionType.UPDATE_STUDENT,
    payload: { updatedStudent },
  };
}

function receiveStudentDetailActionCreator(studentDetail) {
  return {
    type: ActionType.RECEIVE_STUDENT_DETAIL,
    payload: { studentDetail },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: { error },
  };
}

// 🔹 Async Functions
function asyncReceiveStudents({
  page = 1,
  size = 10,
  searchKey,
  searchValue,
  filter,
} = {}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const students = await api.getAllStudents({
        page,
        size,
        searchKey,
        searchValue,
        filter,
      });
      dispatch(receiveStudentsActionCreator(students));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateStudent(studentData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const newStudent = await api.createStudent(studentData);
      console.log(newStudent);
      dispatch(createStudentActionCreator(newStudent));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteStudent(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteStudent(id);
      dispatch(deleteStudentActionCreator(id));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(asyncReceiveStudents());
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateStudent({ id, class_id, gender, name, nisn }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedStudent = await api.updateStudent({
        id,
        class_id,
        gender,
        name,
        nisn,
      });
      console.log(updatedStudent);
      dispatch(updateStudentActionCreator(updatedStudent));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetStudentDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const studentDetail = await api.getStudentDetail(id);
      dispatch(receiveStudentDetailActionCreator(studentDetail));
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
  receiveStudentsActionCreator,
  createStudentActionCreator,
  deleteStudentActionCreator,
  updateStudentActionCreator,
  receiveStudentDetailActionCreator,
  setErrorActionCreator,
  asyncReceiveStudents,
  asyncCreateStudent,
  asyncDeleteStudent,
  asyncUpdateStudent,
  asyncGetStudentDetail,
};
