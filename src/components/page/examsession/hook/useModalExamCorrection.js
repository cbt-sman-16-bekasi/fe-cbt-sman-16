import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useApi from "../../../../utils/rest/api.js";
import {useDebounce} from "../../../../hooks/useDebounce.js";
import {useLoading} from "../../../common/LoadingProvider.jsx";
import {useModal} from "../../../common/ModalContext.jsx";

export function useModalExamCorrection({row, dataSession, setRefreshData, setHide, isRefreshTable}) {

  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [answerStudent, setAnswerStudent] = useState([]);
  const [scoreStudent, setScoreStudent] = useState([]);
  const [finalScore, setFinalScore] = useState(0)
  const answerStudentDebounce = useDebounce(answerStudent, 1000)
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  useEffect(() => {
    useApi.fetch(`/academic/exam/session/answer/student?exam_code=${dataSession?.exam?.code}&student_id=${row?.student_id}&session_id=${dataSession?.session_id}`).then(r => {
      if (r !== null) {
        const dataAnswer = r.data || [];

        const dataScore = dataAnswer.map(a => a.score === null ? 0 : a.score);

        setAnswerStudent(dataAnswer);
        setScoreStudent(dataScore);
      }
    })
  }, [row]);

  const submitCorrectionScore = async () => {
    showLoading()
    const {message, status } = await useApi.createOrModify({
      url: '/academic/exam/session/correction/answer/student',
      method: 'POST',
      body: {
        exam_code: dataSession?.exam?.code,
        student_id: row?.student_id,
        session_id: dataSession?.session_id,
        answer_result: answerStudent,
      }
    })
    hideLoading()
    showModal(message, status)
    setRefreshData(!isRefreshTable)
    setHide(false)
  }

  const setScore = (val, i) => {
    if (val === null) {
      val = 0
    }
    if (parseInt(val) > dataSession?.exam?.total_score) {
      val = dataSession?.exam?.total_score;
    }
    val = parseInt(val)
    // Buat salinan dari answerStudent
    const updatedAnswerStudent = [...answerStudent];

    // Perbarui nilai score di item ke-i
    updatedAnswerStudent[i] = {
      ...updatedAnswerStudent[i],
      score: val,
    };

    // Update state
    setAnswerStudent(updatedAnswerStudent);

    // Kalau scoreStudent juga ingin diperbarui:
    const updatedScoreStudent = [...scoreStudent];
    updatedScoreStudent[i] = val;
    setScoreStudent(updatedScoreStudent);
  }

  const calculateFinalScore = () => {
    let totalScore = 0;
    answerStudent
      .forEach(a => {
        const score = a.score || 0;
        totalScore += score;
      })
    console.log("TOTAL", totalScore);
    const averageScore = answerStudent.length > 0
      ? totalScore / (answerStudent.length * dataSession?.exam?.total_score)
      : 0;

    setFinalScore(Math.ceil(averageScore * 100))
  }

  useEffect(() => {
    calculateFinalScore()
  }, [answerStudentDebounce]);

  return {
    userRole,
    answerStudent,
    setScore,
    finalScore,
    submitCorrectionScore
  }
}