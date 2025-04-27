import useApi from './api.js';

const useTeacherApi = (() => {
  const getAllTeacher = async ({
    page = 1,
    size = 10,
    searchKey,
    searchValue,
    filter,
  } = {}) => {
    return await useApi.fetchPagination(`/academic/teacher/all`, {
      page,
      size,
      searchKey,
      searchValue,
      filter,
    });
  };

  const modifyTeacher = async ({ body, id = null, isCreate = false }) => {
    return await useApi.fetch(
      isCreate ? '/academic/teacher/create' : `/academic/teacher/update/${id}`,
      {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  };

  const getDetail = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/teacher/detail/${id}`, {
      method: 'GET',
    });
  };

  const modifyTeacherSubject = async ({ body, id = null, isCreate = false }) => {
    return await useApi.fetch(
      isCreate ? '/academic/teacher/class-subject/create' : `/academic/teacher/class-subject/update/${id}`,
      {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  };

  const getDetailClassSubject = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/teacher/class-subject/detail/${id}`, {
      method: 'GET',
    });
  };

  const getDetailClassSubjectList = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/teacher/${id}/class-subject/all`, {
      method: 'GET',
    });
  };

  return {
    allTeacher: getAllTeacher,
    modifyTeacher: modifyTeacher,
    detailTeacher: getDetail,
    modifyClassSubject: modifyTeacherSubject,
    detailTeacherClassSubject: getDetailClassSubject,
    allTeacherClassSubject: getDetailClassSubjectList,
  };
})();

export default useTeacherApi;
