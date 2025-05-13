import {useParams, useSearchParams} from "react-router";
import {useModal} from "../../../../../components/common/ModalContext.jsx";
import {useLoading} from "../../../../../components/common/LoadingProvider.jsx";
import {useEffect, useState} from "react";
import useApi from "../../../../../utils/rest/api.js";

export function useExamBankQuestionHook() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { showConfirm, showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [examCode, setExamCode] = useState(searchParams.get('examCode'));
  const [masterBankCode, setMasterBankCode] = useState(searchParams.get('masterBank'));

  const [selected, setSelected] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const [rows, setRows] = useState([])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row?.ID);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((s) => s !== id);
    }

    setSelected(newSelected);
  };

  const handleSave = async () => {
    try {
      showLoading()
      const { message, status } = await useApi.createOrModify(
        {
          url: '/academic/exam/question/bank/add',
          method: 'POST',
          body: {
            exam_code: examCode,
            bank_exam_question: selected
          }
        }
      )
      hideLoading()
      showModal(message, status)
    } catch (e) {
      console.error("Error", e)
      showModal("Failed add question from 'Bank Soal'")
    }
  }

  useEffect(() => {
    async function fetchData() {
      showLoading()
      const { data } = await useApi.fetch('/academic/bank/question/' + masterBankCode, {
        method: 'GET'
      })
      setRows(data)
      hideLoading()
    }
    fetchData()
  }, []);

  return {
    id,
    examCode,
    masterBankCode,
    handleSelectAllClick,
    handleClick,
    isSelected,
    selected, setSelected,
    rows,
    handleSave,
  }
}