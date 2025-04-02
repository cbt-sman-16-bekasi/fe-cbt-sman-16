import { asyncUnsetAuthUser } from '../states/authUser/action';

const api = (() => {
  const BASE_URL = import.meta.env.VITE_BASE_API;

  // auth
  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function removeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  async function _fetchWithAuth(url, options = {}, dispatch) {
    const fullUrl = `${BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (response.status === 401) {
      if (dispatch) {
        dispatch(asyncUnsetAuthUser());
      }
      removeAccessToken();
      window.location.href = '/login';
    }

    return response;
  }

  async function login({ password, username }) {
    try {
      const response = await fetch(`${BASE_URL}/academic/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, username }),
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || 'Login gagal!');
      }

      const { data } = responseJson;

      return data;
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
    }
  }

  async function logout() {
    removeAccessToken();
    window.location.href = '/login';
  }

  // school
  async function getSchoolInfo(schoolCode) {
    const response = await _fetchWithAuth(
      `/academic/school?schoolCode=${schoolCode}`
    );
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function updateSchool({
    address,
    banner,
    email,
    level_of_education,
    logo,
    npsn,
    nss,
    phone,
    school_name,
  }) {
    const response = await _fetchWithAuth('/academic/school/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address,
        banner,
        email,
        level_of_education,
        logo,
        npsn,
        nss,
        phone,
        school_name,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  // common
  async function getClassCode() {
    const response = await _fetchWithAuth(`/academic/class-code`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getDashboardData() {
    const response = await _fetchWithAuth(`/academic/dashboard`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getSubjects() {
    const response = await _fetchWithAuth(`/academic/subjects`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getUserRoles() {
    const response = await _fetchWithAuth(`/academic/user/roles`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  // class
  async function getAllClasses(
    { page = 1, size = 10, searchKey, searchValue, filter } = {},
    dispatch
  ) {
    const params = new URLSearchParams({ page, size });

    if (searchKey && searchValue) {
      params.append('search.key', searchKey);
      params.append('search.value', searchValue);
    }

    if (filter) {
      Object.keys(filter).forEach((key) =>
        params.append(`filter[${key}]`, filter[key])
      );
    }

    const response = await _fetchWithAuth(
      `/academic/class/all?${params.toString()}`,
      {},
      dispatch
    );
    const responseJson = await response.json();
    return responseJson.data;
  }

  async function createClass({ class_code, class_name }) {
    const response = await _fetchWithAuth('/academic/class/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ class_code, class_name }),
    });

    const responseJson = await response.json();
    console.log(responseJson);
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteClass(id) {
    const response = await _fetchWithAuth(`/academic/class/delete/${id}`, {
      method: 'DELETE',
    });

    const responseJson = await response.json();
    console.log(responseJson);
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data;
  }

  async function getClassDetail(id) {
    const response = await _fetchWithAuth(`/academic/class/detail/${id}`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function updateClass({ id, class_code, class_name }) {
    const response = await _fetchWithAuth(`/academic/class/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ class_code, class_name }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  // class subjects
  async function getAllClassSubjects(
    { page = 1, size = 10, searchKey, searchValue, filter } = {},
    dispatch
  ) {
    const params = new URLSearchParams({ page, size });

    if (searchKey && searchValue) {
      params.append('search.key', searchKey);
      params.append('search.value', searchValue);
    }

    if (filter) {
      Object.keys(filter).forEach((key) =>
        params.append(`filter[${key}]`, filter[key])
      );
    }

    const response = await _fetchWithAuth(
      `/academic/class/subject/all?${params.toString()}`,
      {},
      dispatch
    );
    const responseJson = await response.json();
    return responseJson.data;
  }

  async function createClassSubject({ class_code, subject_code }) {
    const response = await _fetchWithAuth('/academic/class/subject/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        class_code,
        subject_code,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;
    console.log(data);

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getClassSubjectDetail(id) {
    const response = await _fetchWithAuth(
      `/academic/class/subject/detail/${id}`
    );
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function updateClassSubject({ id, class_code, subject_code }) {
    const response = await _fetchWithAuth(
      `/academic/class/subject/update/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_code, subject_code }),
      }
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteClassSubject(id) {
    const response = await _fetchWithAuth(
      `/academic/class/subject/delete/${id}`,
      {
        method: 'DELETE',
      }
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data;
  }

  // students
  async function getAllStudents(
    { page = 1, size = 10, searchKey, searchValue, filter } = {},
    dispatch
  ) {
    const params = new URLSearchParams({ page, size });

    if (searchKey && searchValue) {
      params.append('search.key', searchKey);
      params.append('search.value', searchValue);
    }

    if (filter) {
      Object.keys(filter).forEach((key) =>
        params.append(`filter[${key}]`, filter[key])
      );
    }

    const response = await _fetchWithAuth(
      `/academic/student/all?${params.toString()}`,
      {},
      dispatch
    );
    const responseJson = await response.json();
    return responseJson.data;
  }

  async function createStudent({ class_id, gender, name, nisn }) {
    const response = await _fetchWithAuth('/academic/student/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ class_id, gender, name, nisn }),
    });

    const responseJson = await response.json();
    console.log(responseJson);
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteStudent(id) {
    const response = await _fetchWithAuth(`/academic/student/delete/${id}`, {
      method: 'DELETE',
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data;
  }

  async function getStudentDetail(id) {
    const response = await _fetchWithAuth(`/academic/student/detail/${id}`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function updateStudent({ id, class_id, gender, name, nisn }) {
    const response = await _fetchWithAuth(`/academic/student/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ class_id, gender, name, nisn }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  // teachers
  async function getAllTeachers(
    { page = 1, size = 10, searchKey, searchValue, filter } = {},
    dispatch
  ) {
    const params = new URLSearchParams({ page, size });

    if (searchKey && searchValue) {
      params.append('search.key', searchKey);
      params.append('search.value', searchValue);
    }

    if (filter) {
      Object.keys(filter).forEach((key) =>
        params.append(`filter[${key}]`, filter[key])
      );
    }

    const response = await _fetchWithAuth(
      `/academic/teacher/all?${params.toString()}`,
      {},
      dispatch
    );
    const responseJson = await response.json();
    return responseJson.data;
  }

  async function createTeacher({ name, nuptk, role, username }) {
    const response = await _fetchWithAuth('/academic/teacher/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, nuptk, role, username }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteTeacher(id) {
    const response = await _fetchWithAuth(`/academic/teacher/delete/${id}`, {
      method: 'DELETE',
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data;
  }

  async function getTeacherDetail(id) {
    const response = await _fetchWithAuth(`/academic/teacher/detail/${id}`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function updateTeacher({ id, name, nuptk, role, username }) {
    const response = await _fetchWithAuth(`/academic/teacher/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, nuptk, role, username }),
    });

    const responseJson = await response.json();
    console.log(responseJson);
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  // exams
  async function getTypeExams(
    { page = 1, size = 10, searchKey, searchValue, filter } = {},
    dispatch
  ) {
    const params = new URLSearchParams({ page, size });

    if (searchKey && searchValue) {
      params.append('search.key', searchKey);
      params.append('search.value', searchValue);
    }

    if (filter) {
      Object.keys(filter).forEach((key) =>
        params.append(`filter[${key}]`, filter[key])
      );
    }

    const response = await _fetchWithAuth(
      `/academic/exam/type-exam/all?${params.toString()}`,
      {},
      dispatch
    );
    const responseJson = await response.json();

    const { status, message, data } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function createTypeExam({ code_type_exam, color, role, type_exam }) {
    try {
      const response = await _fetchWithAuth('/academic/exam/type-exam/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code_type_exam, color, role, type_exam }),
      });

      const responseJson = await response.json();

      const { status, message, data } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data;
    } catch (error) {
      console.error('Create Type Exam Error:', error.message);
      throw error;
    }
  }

  async function deleteTypeExam({
    id,
    code_type_exam,
    color,
    role,
    type_exam,
  }) {
    try {
      const response = await _fetchWithAuth(
        `/academic/exam/type-exam/delete/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code_type_exam, color, role, type_exam }),
        }
      );

      const responseJson = await response.json();

      const { status, message, data } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data;
    } catch (error) {
      console.error('Delete Type Exam Error:', error.message);
      throw error;
    }
  }

  async function getTypeExamDetail(id) {
    try {
      const response = await _fetchWithAuth(
        `/academic/exam/type-exam/detail/${id}`
      );

      const responseJson = await response.json();

      const { status, message, data } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data;
    } catch (error) {
      console.error('Get Type Exam Detail Error:', error.message);
      throw error;
    }
  }

  async function updateTypeExam({
    id,
    code_type_exam,
    color,
    role,
    type_exam,
  }) {
    try {
      const response = await _fetchWithAuth(
        `/academic/exam/type-exam/update/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code_type_exam, color, role, type_exam }),
        }
      );

      const responseJson = await response.json();

      const { status, message, data } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data;
    } catch (error) {
      console.error('Update Type Exam Error:', error.message);
      throw error;
    }
  }

  async function getExamQuestions(examId) {
    const response = await _fetchWithAuth(`/academic/exam/${examId}/question`);
    return await response.json();
  }

  return {
    putAccessToken,
    getAccessToken,
    removeAccessToken,
    login,
    logout,

    getSchoolInfo,
    updateSchool,

    getClassCode,
    getDashboardData,
    getSubjects,
    getUserRoles,

    getAllClasses,
    createClass,
    deleteClass,
    getClassDetail,
    updateClass,

    getAllClassSubjects,
    createClassSubject,
    getClassSubjectDetail,
    updateClassSubject,
    deleteClassSubject,

    getAllStudents,
    createStudent,
    deleteStudent,
    getStudentDetail,
    updateStudent,

    getAllTeachers,
    createTeacher,
    deleteTeacher,
    getTeacherDetail,
    updateTeacher,

    getTypeExams,
    createTypeExam,
    deleteTypeExam,
    getTypeExamDetail,
    updateTypeExam,
    getExamQuestions,
  };
})();

export default api;
