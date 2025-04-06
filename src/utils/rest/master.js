import useApi from "./api.js";

const useMasterController = (() => {

  const getAllTypeExam = async ({ page = 1, size = 10, searchKey, searchValue, filter } = {}) => {
    return await useApi.fetchPagination(`/academic/exam/type-exam/all`, {
      page,
      size, searchKey,searchValue, filter
    })
  }

  const getAllSubject = async () => {
    return await useApi.fetch(`/academic/subjects`, {
      method: 'GET'
    })
  }

  const getAllClassSubject = async ({ page = 0, size = 10, searchKey, searchValue, filter } = {}) => {
    return await useApi.fetchPagination(`/academic/class/subject/all`, {
      page,
      size, searchKey,searchValue, filter
    })
  }

  return {
    allTypeExam: getAllTypeExam,
    allSubject: getAllSubject,
    allClassSubject: getAllClassSubject
  }
})()

export default useMasterController