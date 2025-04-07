import {useNavigate, useParams} from "react-router";
import {useLoading} from "../../../components/common/LoadingProvider.jsx";
import {useModal} from "../../../components/common/ModalContext.jsx";
import {useEffect, useState} from "react";
import useMasterController from "../../../utils/rest/master.js";
import useExamApi from "../../../utils/rest/exam.js";

export function useBankQuestionCreateHook({isUpdatePage = false}) {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();
  const [optionsClass, setOptionClass] = useState([]);
  const [optionSubject, setOptionSubject] = useState([]);
  const [subject, setSubject] = useState('');
  const [classCode, setClassCode] = useState('');
  const [typeQuestion, setTypeQuestion] = useState('PILIHAN_GANDA')
  const optionsTypeQuestion = [{label: 'Pilihan Ganda', value: 'PILIHAN_GANDA'},{label: 'Essay', value: 'ESSAY'}]
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      showLoading();
      const {data} = await useMasterController.allSubject();
      setOptionSubject(data.map(s => {
        return {label: s.subject, value: s.code}
      }))

      const {data: classCodeData} = await useMasterController.allClassCode();
      setOptionClass(classCodeData.map(s => {
        return {label: s.name, value: s.code}
      }))

      if (isUpdatePage) {
        const {data: detail} = await useExamApi.detailMasterBank({id})
        setSubject(detail.subject_code)
        setClassCode(detail.class_code)
        setTypeQuestion(detail.type_question)
      }
      hideLoading()
    }
    fetchData()

  }, []);

  const handleSubmitCreate = () => {
    const body = {
      subject_code: subject,
      class_code: classCode,
      type_question: typeQuestion,
    }

    showLoading();
    useExamApi.createMasterBank({body: body, id: id, isCreate: !isUpdatePage}).then(r => {
      const { message, status } = r;
      setTimeout(() => {
        hideLoading()
        showModal(message, status)
        if (!isUpdatePage) {
          navigate(-1)
        }
      }, 1500)
    }).catch(e => {
      console.log(e.data)
      hideLoading()
      showModal('Failed create bank question. Please try again!', 'error')
    })
  }

  const resetForm = () => {
    setSubject('')
    setClassCode('')
  }

  return {
    id,
    showModal,
    optionsClass,
    optionSubject,
    subject, setSubject,
    classCode, setClassCode,
    optionsTypeQuestion,
    typeQuestion, setTypeQuestion,
    handleSubmitCreate,
    resetForm
  }
}