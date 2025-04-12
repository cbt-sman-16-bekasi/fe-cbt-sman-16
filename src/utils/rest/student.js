import useApi from './api.js';

const useStudentApi = (() => {
  const getAllStudent = async ({
    page = 1,
    size = 10,
    searchKey,
    searchValue,
    filter,
  } = {}) => {
    return await useApi.fetchPagination(`/academic/student/all`, {
      page,
      size,
      searchKey,
      searchValue,
      filter,
    });
  };

  const modifyStudent = async ({ body, id = null, isCreate = false }) => {
    return await useApi.fetch(
      isCreate ? '/academic/student/create' : `/academic/student/update/${id}`,
      {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  };

  const getDetail = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/student/detail/${id}`, {
      method: 'GET',
    });
  };

  return {
    allStudent: getAllStudent,
    modifyStudent: modifyStudent,
    detailStudent: getDetail,
  };
})();

export default useStudentApi;
