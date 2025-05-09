import { useEffect, useState } from 'react';
import useExamApi from '../../../utils/rest/exam.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export function useBankCreateQuestionHook({ updatePage = false }) {
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [optionE, setOptionE] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();
  const { bankMasterCode: examCode } = useParams();
  const [searchParams] = useSearchParams();
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
        const { data: detailQuestion } = await useExamApi.detailBankQuestion({
          id: id,
        });
        setQuestion(detailQuestion.question);
        detailQuestion.question_option.forEach((r, i) => {
          if (i === 0) {
            setOptionA(r.option);
          }
          if (i === 1) {
            setOptionB(r.option);
          }
          if (i === 2) {
            setOptionC(r.option);
          }
          if (i === 3) {
            setOptionD(r.option);
          }
          if (i === 4) {
            setOptionE(r.option);
          }
        });
        setAnswer(detailQuestion.answer_single);
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
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
      .createBankQuestion({ body: body, id: id, isCreate: !updatePage })
      .then((r) => {
        const { message, status } = r;
        showModal(message, status);
        setTimeout(() => {
          hideLoading();
          navigate(-1);
        }, 1500);
      })
      .catch((e) => {
        console.log(e.data);
        hideLoading();
        showModal('Failed create Question. Please try again!', 'error');
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
    setOptionAnswer,
    typeQuestion,
    handleSubmitCreate,
  };
}
