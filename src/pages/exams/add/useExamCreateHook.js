import {useState} from "react";

export function useExamCreateHook() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [classCode, setClassCode] = useState('');
  const [typeExam, setTypeExam] = useState('');
  const [description, setDescription] = useState('<p>Halo, ini contoh konten awal!</p>');
  const [randomQuestion, setRandomQuestion] = useState(false);
  const [randomAnswer, setRandomAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState('PILIHAN_GANDA');
  const [duration, setDuration] = useState(0);
  const [score, setScore] = useState(0);

  const optionsTrueOrFalse = [{label: 'Ya', value: true},{label: 'Tidak', value: false}]
  const optionsTypeQuestion = [{label: 'Pilihan Ganda', value: 'PILIHAN_GANDA'},{label: 'Essay', value: 'ESSAY'}]

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
    optionsTypeQuestion
  }
}