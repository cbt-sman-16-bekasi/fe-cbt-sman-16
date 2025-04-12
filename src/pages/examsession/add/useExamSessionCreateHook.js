import {useNavigate, useParams} from "react-router";
import {useLoading} from "../../../components/common/LoadingProvider.jsx";
import {useModal} from "../../../components/common/ModalContext.jsx";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import useExamApi from "../../../utils/rest/exam.js";
import useExamSessionController from "../../../utils/rest/examsession.js";

export function useExamSessionCreateHook({isUpdatePage = false}) {
  const [name, setName] = useState('');
  const [examCode, setExamCode] = useState('');
  const [optionExam, setOptionExam] = useState([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {

    dayjs.extend(utc);
    dayjs.extend(timezone);

    async function fetchDataOption() {
      showLoading()
      const { data } = await useExamApi.allExam({size: 100, page: 0});
      setOptionExam(data.records.map(r => { return {label: r.name, value: r.code}}))

      if (isUpdatePage) {
        const { data } = await useExamSessionController.retrieveDetail({ id: id})
        setName(data.name)
        setExamCode(data.exam.code)
        setStartDate(dayjs(new Date(data.start_date)))
        setEndDate(dayjs(new Date(data.end_date)))
      }
      hideLoading()
    }

    fetchDataOption()

  }, []);

  const resetForm = () => {
    setName('');
    setExamCode('');
    setOptionExam([]);
    setStartDate(dayjs());
    setEndDate(dayjs());
  };

  const submitForm = () => {
    const body = {
      "name": name,
      "exam_code": examCode,
      "start_at": dayjs(startDate)
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DDTHH:mm:ssZ'),
      "end_at": dayjs(endDate)
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DDTHH:mm:ssZ')
    }

    showLoading();
    useExamSessionController.modify({body: body, id: id, isCreate: !isUpdatePage}).then(r => {
      const { message, status } = r;
      setTimeout(() => {
        hideLoading()
        showModal(message, status)
        if (status === 'error'){
          return
        }
        resetForm()
        navigate(-1)
      }, 1500)
    }).catch(e => {
      console.log(e.data)
      hideLoading()
      showModal('Failed create exam. Please try again!', 'error')
    })

  }

  return {
    name, setName,
    examCode, setExamCode,
    optionExam, setOptionExam,
    startDate, setStartDate,
    endDate, setEndDate,
    id, showLoading, hideLoading,
    showModal,
    resetForm,
    submitForm
  }
}