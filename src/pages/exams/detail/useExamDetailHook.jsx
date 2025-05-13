import { useNavigate, useParams, useSearchParams } from "react-router";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import { useEffect, useState } from "react";
import useExamApi from "../../../utils/rest/exam.js";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useApi from "../../../utils/rest/api.js";
import { useModal } from "../../../components/common/ModalContext.jsx";

export function useExamDetailHook() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { showConfirm, showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [classCode, setClassCode] = useState([]);
  const [examCode, setExamCode] = useState(searchParams.get('examCode'));
  const [typeExam, setTypeExam] = useState('');
  const [description, setDescription] = useState('<p>Halo, ini contoh konten awal!</p>');
  const [randomQuestion, setRandomQuestion] = useState(false);
  const [randomAnswer, setRandomAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState('PILIHAN_GANDA');
  const [duration, setDuration] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [isRefreshList, setRefreshList] = useState(false)
  const [openUpload, setOpenUpload] = useState(false);
  const [masterBankData, setMasterBankData] = useState({})
  const [detailExamData, setDetailExamData] = useState({})

  const handleUpload = async (file) => {
    try {
      showLoading()
      const { status, message } = await useApi.uploadFile({
        url: `/academic/exam/${id}/question/template/upload`,
        file: file,
        fieldName: 'file'
      });

      setRefreshList(true)
      hideLoading();
      showModal(message, status)
    } catch (err) {
      console.log(err)
      hideLoading();
      showModal("Failed upload file", "error")
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await useApi.fetch(`/academic/bank/detail/bank/subject?subject_code=${detailExamData?.subject_code?.code}&class_code=${detailExamData?.exam_member[0]?.detail_class?.classCode}&type_question=${detailExamData.type_question}`, {
        method: 'GET'
      })
      setMasterBankData(data)
    }
    fetchData()
  }, [detailExamData]);


  useEffect(() => {
    async function fetchData() {
      showLoading()
      const { data: detailExam } = await useExamApi.detailExam({ id: id })
      setName(detailExam.name);
      setExamCode(detailExam.code)
      setDescription(detailExam.description);
      setRandomQuestion(detailExam.random_question)
      setRandomAnswer(detailExam.random_answer)
      setShowResult(detailExam.show_result)
      setDuration(detailExam.duration)
      setSubject(detailExam.subject_code.subject)
      setTypeQuestion(detailExam.type_question)
      setTotalQuestion(detailExam.total_question)
      setTotalScore(detailExam.total_score)
      setClassCode(detailExam.exam_member.map(a => a.detail_class.className).join(", "))
      setTypeExam(detailExam.detail_type_exam.code)

      setDetailExamData(detailExam)
      hideLoading()
    }

    fetchData()
  }, [isRefreshList]);

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "question", headerName: "SOAL", flex: 0.1, minWidth: 50, renderCell: (row) => (<div dangerouslySetInnerHTML={{ __html: row.question }} />) },
    { field: "score", headerName: "BOBOT SOAL", flex: 0.1, minWidth: 50, renderCell: (row) => detailExamData?.score_question },
    {
      field: "answer_single", headerName: "JAWABAN BENAR", flex: 0.1, minWidth: 50, renderCell: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.answer_single }} />
      )
    },
    {
      field: "aksi",
      headerName: "AKSI",
      flex: 1,
      minWidth: 150,
      renderCell: (row) => {
        return (
          <div style={{ display: "flex", gap: "8px", alignItems: "center", height: "100%" }}>
            {/* Tombol Edit */}
            <IconButton
              size="small"
              sx={{
                bgcolor: "purple",
                color: "white",
                "&:hover": { bgcolor: "darkviolet" },
              }}
              onClick={() => handleEdit(row.ID, examCode)}
            >
              <EditIcon />
            </IconButton>

            {/* Tombol Delete */}
            <IconButton
              size="small"
              sx={{
                bgcolor: "red",
                color: "white",
                "&:hover": { bgcolor: "darkred" },
              }}
              onClick={() => handleDelete(row.ID)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleEdit = (idExam, code) => {
    navigate(`/${userRole}/ujian/${id}/detail/question/${idExam}/edit?examCode=${code}&typeQuestion=${typeQuestion}`)
  };

  const handleDelete = (id) => {
    showConfirm((<>
      <strong>Apakah anda yakin ingin menghapus soal ini ?</strong>
      <p>Soal akan terhapus di Ujian ini, tapi tidak di Bank Soal</p>
    </>), async () => {
      showLoading()
      await useApi.delete({ url: `/academic/exam/question/delete/${id}` })
      setRefreshList(!isRefreshList)
      hideLoading()
    });
  };

  const handleDownloadTemplate = async () => {
    await useApi.download({ url: `/academic/exam/${id}/question/template/download?typeQuestion=${typeQuestion}` })
  };

  return {
    showLoading,
    id, hideLoading,
    name, setName,
    subject, setSubject,
    classCode, setClassCode,
    typeExam, setTypeExam,
    description, setDescription,
    randomQuestion, setRandomQuestion,
    randomAnswer, setRandomAnswer,
    showResult, setShowResult,
    typeQuestion, setTypeQuestion,
    duration, setDuration,
    totalQuestion, totalScore,
    examCode,
    isRefreshList,
    columns,
    navigate,
    userRole,
    handleDownloadTemplate,
    handleUpload,
    setOpenUpload,
    openUpload,
    masterBankData, setMasterBankData,
    detailExamData
  }
}