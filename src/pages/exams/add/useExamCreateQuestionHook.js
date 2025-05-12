import { useEffect, useState } from 'react';
import useExamApi from '../../../utils/rest/exam.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export function useExamCreateQuestionHook({ updatePage = false }) {
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [optionE, setOptionE] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const { questionId: id } = useParams();
  const [searchParams] = useSearchParams();
  const examCode = searchParams.get('examCode');
  const typeQuestion = searchParams.get('typeQuestion');
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();
  const [optionAnswer, setOptionAnswer] = useState([
    {
      label: 'A',
      value: 'A',
    },
    {
      label: 'B',
      value: 'B',
    },
    {
      label: 'C',
      value: 'C',
    },
    {
      label: 'D',
      value: 'D',
    },
    {
      label: 'E',
      value: 'E',
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      showLoading();
      if (updatePage) {
        const { data: detailQuestion } = await useExamApi.question({ id: id });
        console.log(detailQuestion);
        setQuestion(detailQuestion.question);
        setOptionA(detailQuestion.option_a);
        setOptionB(detailQuestion.option_b);
        setOptionC(detailQuestion.option_c);
        setOptionD(detailQuestion.option_d);
        setOptionE(detailQuestion.option_e);
        setAnswer(detailQuestion.answer);
        setScore(detailQuestion.score);
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    if (
      !answer ||
      !examCode ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !optionE ||
      !question ||
      !score
    ) {
      showModal('Semua Data Harus Diisi', 'warning');
      return;
    }

    const body = {
      answer: answer,
      exam_code: examCode,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      option_e: optionE,
      question: question,
      score: score,
    };

    showLoading();
    useExamApi
      .createQuestion({ body: body, id: id, isCreate: !updatePage })
      .then((r) => {
        const { message, status } = r;
        setTimeout(() => {
          hideLoading();
          showModal(message, status);
          if (status === 'success') {
            navigate(-1);
          }
        }, 1500);
      })
      .catch((e) => {
        console.log(e.data);
        hideLoading();
        showModal(
          `Failed ${
            !updatePage ? 'create' : 'update'
          } 'Soal Ujian'. Please try again!`,
          'error'
        );
      });
  };

  return {
    score,
    setScore,
    question,
    setQuestion,
    answer,
    setAnswer,
    optionA,
    setOptionA,
    optionB,
    setOptionB,
    optionC,
    setOptionC,
    optionD,
    setOptionD,
    optionE,
    setOptionE,
    optionAnswer,
    typeQuestion,
    handleSubmitCreate,
  };
}
