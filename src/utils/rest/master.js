import useApi from './api.js';

const useMasterController = (() => {
  const getAllTypeExam = async ({
    page = 1,
    size = 10,
    searchKey,
    searchValue,
    filter,
  } = {}) => {
    return await useApi.fetchPagination(`/academic/exam/type-exam/all`, {
      page,
      size,
      searchKey,
      searchValue,
      filter,
    });
  };

  const getAllSubject = async () => {
    return await useApi.fetch(`/academic/subjects`, {
      method: 'GET',
    });
  };

  const getAllClassCode = async () => {
    return await useApi.fetch(`/academic/class-code`, {
      method: 'GET',
    });
  };

  const getAllClassSubject = async ({
    page = 0,
    size = 10,
    searchKey,
    searchValue,
    filter,
  } = {}) => {
    return await useApi.fetchPagination(`/academic/class/subject/all`, {
      page,
      size,
      searchKey,
      searchValue,
      filter,
    });
  };

  const getUserRoles = async () => {
    return await useApi.fetch(`/academic/user/roles`, {
      method: 'GET',
    });
  };

  return {
    allTypeExam: getAllTypeExam,
    allSubject: getAllSubject,
    allClassSubject: getAllClassSubject,
    allClassCode: getAllClassCode,
    allUserRole: getUserRoles,
  };
})();

export default useMasterController;
