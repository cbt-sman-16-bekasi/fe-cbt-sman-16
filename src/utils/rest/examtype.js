import useApi from './api.js';

const useExamTypeApi = (() => {
  const getAllExamType = async ({
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

  const modifyExamType = async ({ body, id = null, isCreate = false }) => {
    return await useApi.fetch(
      isCreate
        ? '/academic/exam/type-exam/create'
        : `/academic/exam/type-exam/update/${id}`,
      {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  };

  const getDetail = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/exam/type-exam/detail/${id}`, {
      method: 'GET',
    });
  };

  return {
    allExamType: getAllExamType,
    modifyExamType: modifyExamType,
    detailExamType: getDetail,
  };
})();

export default useExamTypeApi;
