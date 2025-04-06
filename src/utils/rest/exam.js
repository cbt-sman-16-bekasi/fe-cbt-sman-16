import useApi from "./api.js";

const useExamApi = (() => {

  const getAllExam = async ({ page = 1, size = 10, searchKey, searchValue, filter } = {}) => {
    return await useApi.fetchPagination(`/academic/exam/all`, {
      page,
      size, searchKey,searchValue, filter
    })
  }

  const modifyExam = async ({body, id = null, isCreate = false}) => {
    return await useApi.fetch(isCreate ? '/academic/exam/create' : `/academic/exam/update/${id}`, {
      method: isCreate ? 'POST' : 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
  }

  const getDetail = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/exam/detail/${id}`, {
      method: 'GET'
    })
  }

  const getDetailQuestion = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/exam/question/detail/${id}`, {
      method: 'GET'
    })
  }

  const createQuestion = async ({body, id = null, isCreate = false}) => {
    return await useApi.createOrModify({
      url: isCreate ? '/academic/exam/question/create' : `/academic/exam/question/update/${id}`,
      method: isCreate ? 'POST' : 'PUT',
      body: body
    })
  }

  return {
    allExam: getAllExam,
    modifyExam: modifyExam,
    detailExam: getDetail,
    question: getDetailQuestion,
    createQuestion: createQuestion
  }
})()

export default useExamApi