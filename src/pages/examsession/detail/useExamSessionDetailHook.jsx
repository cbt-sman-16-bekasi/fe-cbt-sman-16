import {useNavigate, useParams, useSearchParams} from "react-router";
import {useLoading} from "../../../components/common/LoadingProvider.jsx";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Button, IconButton} from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import useExamSessionController from "../../../utils/rest/examsession.js";
import useDate from "../../../hooks/useDate.js";
import useApi from "../../../utils/rest/api.js";
import {useModal} from "../../../components/common/ModalContext.jsx";

export function useExamSessionDetailHook() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const { showLoading, hideLoading } = useLoading();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [classCode, setClassCode] = useState('');
  const [typeExam, setTypeExam] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const [typeQuestion, setTypeQuestion] = useState('PILIHAN_GANDA');
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const dateHelper = useDate();
  const {showModal} = useModal();
  const [optionExamMember, setOptionExamMember] = useState([])
  const [classIdSelected, setClassIdSelected] = useState(null)
  const [isRefreshTable, setIsRefreshTable] = useState(false)
  const [detailExamSession, setDetailExamSession] = useState({})
  const [correctionQuestion, setCorrectionQuestion] = useState(false)
  const [correctionRowStudent, setCorrectionRowStudent] = useState({})

  useEffect(() => {

    dayjs.extend(utc);
    dayjs.extend(timezone);

    async function fetchData() {
      showLoading()
      const { data } = await useExamSessionController.retrieveDetail({ id: id})
      const detailExam = data.detail_exam
      setName(detailExam.name);
      setSubject(detailExam.subject_code.subject)
      setClassCode(data.exam_member.map(a => a.detail_class.className).join(", "))
      setTypeExam(detailExam.detail_type_exam.code)
      setTypeQuestion(detailExam.type_question)
      setSessionName(data.name)
      setStartDate(dateHelper.formattedWithTime(data.start_date))
      setEndDate(dateHelper.formattedWithTime(data.end_date))
      setDetailExamSession(data)

      const { data: dataClass } = await useExamSessionController.examSessionMember({sessionId: sessionId})
      setOptionExamMember(dataClass.map(r => { return {label: r.detail_class.className, value: r.detail_class.ID}}))
      hideLoading()
    }

    fetchData()
  }, []);

  useEffect(() => {
    if (optionExamMember.length > 0) {
      setClassIdSelected(optionExamMember[0].value)
    }
  }, [optionExamMember]);

  useEffect(() => {
    setIsRefreshTable(!isRefreshTable)
  }, [classIdSelected]);

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "nisn", headerName: "NISN", flex: 0.1, minWidth: 50},
    { field: "name", headerName: "NAMA SISWA", flex: 0.1, minWidth: 50},
    { field: "class", headerName: "KELAS", flex: 0.1, minWidth: 50},
    { field: "start_at", headerName: "WAKTU LOGIN", flex: 0.1, minWidth: 50, renderCell: (row) => dateHelper.formattedWithTime(row.start_at) },
    { field: "end_at", headerName: "WAKTU LOGOUT", flex: 0.1, minWidth: 50, renderCell: (row) => row.start_at.slice(0,2) === '00' || row.end_at === null ? '' : dateHelper.formattedWithTime(row.end_at) },
    { field: "score", headerName: "NILAI", flex: 0.1, minWidth: 50 },
    { field: "status", headerName: "STATUS", flex: 0.1, minWidth: 50},
  ];

  if (typeQuestion === 'ESSAY') {
    columns.push({
      field: "aksi",
      headerName: "AKSI",
      flex: 1,
      minWidth: 150,
      renderCell: (row) => {
        if (row.need_correction) {
          return (<div style={{ display: "flex", gap: "8px", alignItems: "center", height: "100%" }}>
            {/* Tombol Delete */}
            <Button
              size="small"
              sx={{
                bgcolor: "green",
                color: "white",
                "&:hover": { bgcolor: "darkred" },
              }}
              onClick={() => handleCorrection(row)}
            >
              Koreksi
            </Button>
          </div>)
        }
        return (<></>)
      },
    },)
  }

  const handleCorrection = (row) => {
    setCorrectionQuestion(true)
    setCorrectionRowStudent(row)
  };

  const handleDownload = async () => {
    try {
      showLoading()
      await useApi.download({
        url: `/academic/exam/session/attendance/download?exam_session_id=${sessionId}&class_id=${classIdSelected}`
      })

      hideLoading()
    } catch (e) {
      showModal("Failed download report", "error")
    }
  }

  return {
    showLoading,
    id, hideLoading,
    name, setName,
    subject, setSubject,
    classCode, setClassCode,
    typeExam, setTypeExam,
    typeQuestion, setTypeQuestion,
    columns,
    navigate,
    userRole,
    startDate,
    endDate,
    sessionId,
    sessionName,
    handleDownload,
    optionExamMember,
    setOptionExamMember,
    classIdSelected, setClassIdSelected,
    isRefreshTable, setIsRefreshTable,
    detailExamSession,correctionQuestion, setCorrectionQuestion,
    correctionRowStudent, setCorrectionRowStudent
  }
}