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

  // Bank question
  const getDetailMasterBank = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/bank/detail/${id}`, {
      method: 'GET'
    })
  }

  const createMasterBank = async ({body, id = null, isCreate = false}) => {
    return await useApi.createOrModify({
      url: isCreate ? '/academic/bank/create' : `/academic/bank/update/${id}`,
      method: isCreate ? 'POST' : 'PUT',
      body: body
    })
  }

  const createBankQuestion = async ({body, id = null, isCreate = false}) => {
    return await useApi.createOrModify({
      url: isCreate ? '/academic/bank/question/create' : `/academic/bank/question/update/${id}`,
      method: isCreate ? 'POST' : 'PUT',
      body: body
    })
  }

  const getDetailBankQuestion = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/bank/question/detail/${id}`, {
      method: 'GET'
    })
  }

  return {
    allExam: getAllExam,
    modifyExam: modifyExam,
    detailExam: getDetail,
    question: getDetailQuestion,
    createQuestion: createQuestion,
    detailMasterBank: getDetailMasterBank,
    createMasterBank: createMasterBank,
    createBankQuestion: createBankQuestion,
    detailBankQuestion: getDetailBankQuestion
  }
})()

export default useExamApi