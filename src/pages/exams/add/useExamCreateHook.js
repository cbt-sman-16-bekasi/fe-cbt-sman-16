import {useEffect, useState} from "react";
import useMasterController from "../../../utils/rest/master.js";
import useExamApi from "../../../utils/rest/exam.js";
import {useLoading} from "../../../components/common/LoadingProvider.jsx";
import {useModal} from "../../../components/common/ModalContext.jsx";
import {useParams} from "react-router";

export function useExamCreateHook({ updatePage = false}) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [classCode, setClassCode] = useState([]);
  const [typeExam, setTypeExam] = useState('');
  const [description, setDescription] = useState('<p>Halo, ini contoh konten awal!</p>');
  const [randomQuestion, setRandomQuestion] = useState(false);
  const [randomAnswer, setRandomAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState('PILIHAN_GANDA');
  const [duration, setDuration] = useState(0);
  const [score, setScore] = useState(0);
  const [optionsClass, setOptionClass] = useState([]);
  const [optionSubject, setOptionSubject] = useState([]);
  const [optionsTypeExam, setOptionsTypeExam] = useState([]);

  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();
  const optionsTrueOrFalse = [{label: 'Ya', value: true},{label: 'Tidak', value: false}]
  const optionsTypeQuestion = [{label: 'Pilihan Ganda', value: 'PILIHAN_GANDA'},{label: 'Essay', value: 'ESSAY'}]

  useEffect(() => {
    async function fetchData() {
      showLoading();
      const {data} = await useMasterController.allSubject();
      setOptionSubject(data.map(s => {return { label: s.subject, value: s.code }}))

      const {data: dataTypeExam} = await useMasterController.allTypeExam({page: 0, size: 100});
      const { records } = dataTypeExam;
      setOptionsTypeExam(records.map(r => {return {label: `${r.code} - ${r.name}`, value: r.code}}))

      if (updatePage) {
        const { data: detailExam } = await useExamApi.detailExam({id: id})
        setName(detailExam.name);
        setDescription(detailExam.description);
        setRandomQuestion(detailExam.random_question)
        setRandomAnswer(detailExam.random_answer)
        setShowResult(detailExam.show_result)
        setDuration(detailExam.duration)
        setSubject(detailExam.subject_code.code)
        setTypeQuestion(detailExam.type_question)
        setClassCode(detailExam.exam_member.map(a => a.class))
        setTypeExam(detailExam.detail_type_exam.code)
      }
      hideLoading()
    }
    fetchData()
  }, []);

  useEffect(() => {
    setOptionClass([])
    const allClass = useMasterController.allClassSubject({size: 100, filter: {subject_code: subject}})
    allClass.then(c => {
      const { data } = c;
      const { records } = data;
      const members = [];
      records.forEach(r => {
        members.push(...r.DetailClassCode.class_member)
      })
      const uniqueData = members.filter((item, index, self) =>
        index === self.findIndex(t => t.ID === item.ID)
      )
      setOptionClass(uniqueData.map(r => {return {label: `${r.classCode} - ${r.className}`, value: r.ID}}))
    })
  }, [subject]);

  const handleSubmitCreate = () => {
    const body = {
      "class_id": classCode,
      "description": description,
      "duration": duration,
      "name": name,
      "random_answer": randomAnswer,
      "random_question": randomQuestion,
      "show_result": showResult,
      "subject_code": subject,
      "type_exam_id": typeExam
    }

    showLoading();
    useExamApi.modifyExam({body: body, id: id, isCreate: !updatePage}).then(r => {
      const { message, status } = r;
      setTimeout(() => {
        hideLoading()
        showModal(message, status)
        resetForm()
      }, 1500)
    }).catch(e => {
      console.log(e.data)
      hideLoading()
      showModal('Failed create exam. Please try again!', 'error')
    })
  }

  const resetForm = () => {
    setName('');
    setSubject('');
    setClassCode([]);
    setTypeExam('');
    setDescription('<p>Halo, ini contoh konten awal!</p>');
    setRandomQuestion(false);
    setRandomAnswer(false);
    setShowResult(false);
    setTypeQuestion('PILIHAN_GANDA');
    setDuration(0);
    setScore(0);
    setOptionClass([]);
  };

  return {
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
    score, setScore,
    optionsTrueOrFalse,
    optionsTypeQuestion,
    optionSubject,
    optionsClass,
    optionsTypeExam,
    handleSubmitCreate,
    resetForm
  }
}