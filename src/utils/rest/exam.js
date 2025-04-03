import useApi from "./api.js";

const useExamApi = (() => {

  const getAllExam = async ({ page = 1, size = 10, searchKey, searchValue, filter } = {}) => {
    return await useApi.fetchPagination(`/academic/exam/all`, {
      page,
      size, searchKey,searchValue, filter
    })
  }
  return {
    allExam: getAllExam
  }
})()

export default useExamApi