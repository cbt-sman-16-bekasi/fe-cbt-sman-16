import {useState} from "react";

export function useExamCreateHook() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [classCode, setClassCode] = useState('');
  const [typeExam, setTypeExam] = useState('');
  const [description, setDescription] = useState('');
  const [randomQuestion, setRandomQuestion] = useState(false);
  const [randomAnswer, setRandomAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState('PILIHAN_GANDA');
  const [duration, setDuration] = useState(0);
  return {
    name, setName
  }
}