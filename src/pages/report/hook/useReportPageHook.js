import useDate from "../../../hooks/useDate.js";
import {useEffect, useState} from "react";
import {useLoading} from "../../../components/common/LoadingProvider.jsx";
import useExamApi from "../../../utils/rest/exam.js";

import useExamSessionController from "../../../utils/rest/examsession.js";

export function useReportPageHook() {
  const dateHelper = useDate();
  const [examSession, setExamSession] = useState('');
  const [examCode, setExamCode] = useState('');
  const [optionExam, setOptionExam] = useState([]);
  const [optionExamSession, setOptionExamSession] = useState([]);
  const [isRefreshList, setIsRefreshList] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    async function fetchData() {
      showLoading()
      const { data } = await useExamApi.allExam({page: 0, size: 100})
      const { records } = data;
      setOptionExam(records.map(r => { return {label: r.name, value: r.code}}))
      if (optionExam.length > 0) {
        setExamCode(optionExam[0].value)
      }
      hideLoading()
    }

    fetchData()
  }, []);

  useEffect(() => {
    async function fetchData() {
      showLoading()
      setIsRefreshList(!isRefreshList)
      const { data: dataSession } = await useExamSessionController.allExamSession({page: 0, size: 100, filter: {'exam_code': examCode}})
      const { records: recordsSession } = dataSession;
      setOptionExamSession(recordsSession.map(r => { return {label: r.session_name, value: r.session_id	}}))
      setExamSession('')
      hideLoading()
    }
    fetchData()
  }, [examCode]);

  useEffect(() => {
    setIsRefreshList(!isRefreshList)
  }, [examCode, examSession]);

  const columns = [
    { field: "no", headerName: "NO", flex: 0.2, minWidth: 50 },
    { field: "exam_name", headerName: "NAMA UJIAN", flex: 0.2, minWidth: 50 },
    { field: "session_name", headerName: "NAMA SESI UJIAN", flex: 0.2, minWidth: 50 },
    { field: "total", headerName: "TOTAL SISWA", flex: 0.2, minWidth: 50 },
  ]

  const handleDownload = async (url) => {
    window.open(url, '_blank')
  };
  return {
    columns,
    dateHelper,
    handleDownload,
    examCode, setExamCode,
    optionExam, setOptionExam,
    examSession, setExamSession,
    optionExamSession, setOptionExamSession,
    isRefreshList, setIsRefreshList
  }
}