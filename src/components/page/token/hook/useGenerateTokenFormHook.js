import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useLoading} from "../../../common/LoadingProvider.jsx";
import {useModal} from "../../../common/ModalContext.jsx";
import useExamSessionController from "../../../../utils/rest/examsession.js";
import useExamApi from "../../../../utils/rest/exam.js";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function useGenerateTokenFormHook({onChangeGenerate}) {
  const [examSession, setExamSession] = useState('');
  const [examCode, setExamCode] = useState('');
  const [optionExam, setOptionExam] = useState([]);
  const [optionExamSession, setOptionExamSession] = useState([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  useEffect(() => {
    async function fetchData() {
      showLoading()
      const { data } = await useExamApi.allExam({page: 0, size: 100})
      const { records } = data;
      setOptionExam(records.map(r => { return {label: r.name, value: r.code}}))
      hideLoading()
    }

    fetchData()
  }, []);

  useEffect(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    async function fetchData() {
      showLoading()
      const { data: dataSession } = await useExamSessionController.allExamSession({page: 0, size: 100})
      const { records: recordsSession } = dataSession;
      setOptionExamSession(recordsSession.map(r => { return {label: r.name, value: r.session_id	}}))
      hideLoading()
    }
    fetchData()
  }, [optionExam]);

  const handleGenerate = () => {
    const body = {
      "exam_session_id": examSession,
      "exam_code": examCode,
      "start_at": dayjs(startDate)
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DDTHH:mm:ssZ'),
      "end_at": dayjs(endDate)
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DDTHH:mm:ssZ')
    }

    showLoading();
    useExamSessionController.generateToken({body: body}).then(r => {
      const { message, status, data } = r;
      setTimeout(() => {
        hideLoading()
        showModal(message, status)
        onChangeGenerate(data.token)
      }, 1500)
    }).catch(e => {
      console.log(e.data)
      hideLoading()
      showModal('Failed Generate Token. Please try again!', 'error')
    })
  }


  return {
    examCode, setExamCode,
    optionExam, setOptionExam,
    startDate, setStartDate,
    endDate, setEndDate,
    examSession, setExamSession,
    optionExamSession, setOptionExamSession,
    handleGenerate
  }
}