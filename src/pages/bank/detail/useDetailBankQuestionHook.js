import {useNavigate, useParams} from "react-router";
import {useLoading} from "../../../components/common/LoadingProvider.jsx";
import {useEffect, useState} from "react";
import useExamApi from "../../../utils/rest/exam.js";
import useApi from "../../../utils/rest/api.js";
import {useModal} from "../../../components/common/ModalContext.jsx";
import {useSelector} from "react-redux";

export function useDetailBankQuestionHook() {
  const { id } = useParams();
  const {showConfirm, showModal} = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [subject, setSubject] = useState('');
  const [totalQuestion, setTotalQuestion] = useState('');
  const [classCode, setClassCode] = useState('');
  const [typeQuestion, setTypeQuestion] = useState('')
  const [code, setCode] = useState('')
  const [isRefresh, setIsRefresh] = useState(false)
  const navigate = useNavigate()
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [openUpload, setOpenUpload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      showLoading()
      const {data: detail} = await useExamApi.detailMasterBank({id})
      setSubject(detail.detail_subject.subject)
      setClassCode(detail.class_code)
      setTypeQuestion(detail.type_question ? detail.type_question.replaceAll('_', ' ') : '-')
      setCode(detail.code)
      setIsRefresh(!isRefresh)
      setTotalQuestion(detail.total_question)
      hideLoading()
    }
    fetchData()
  }, []);

  const handleUpload = async (file) => {
    try {
      showLoading()
      await useApi.uploadFile({
        url: `/academic/bank/${id}/question/template/upload`,
        file: file,
        fieldName: 'file'
      });

      setIsRefresh(true)
      hideLoading();
      showModal('Success upload question', 'success')
    } catch (err) {
      hideLoading();
      showModal("Failed upload file", "error")
    }
  };

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    ]

  const handleEdit = (idQuestion) => {
    navigate(`/${userRole}/bank-soal/${code}/detail/question/${idQuestion}/edit?&typeQuestion=${typeQuestion.replaceAll(' ', '_')}`)
  };

  const handleDelete = (message, idQuestion) => {
    showConfirm(message, async () => {
      showLoading()
      await useApi.delete({url: `/academic/bank/question/${idQuestion}`})
      setIsRefresh(!isRefresh)
      hideLoading()
    });
  };

  const handleDownloadTemplate = async () => {
    await useApi.download({url: `/academic/exam/${id}/question/template/download?typeQuestion=${typeQuestion.replaceAll(' ', '_')}`})
  };

  return {
    id,
    showLoading,
    hideLoading,
    subject, setSubject,
    classCode, setClassCode,
    typeQuestion, setTypeQuestion,
    code, setCode,
    totalQuestion,
    isRefresh,
    columns,
    userRole,
    handleDownloadTemplate,
    handleEdit,
    handleDelete,
    handleUpload,
    navigate,
    openUpload, setOpenUpload
  }

}