import { useEffect, useState } from 'react';
import useMasterController from '../../../utils/rest/master.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useParams } from 'react-router';
import useClassesApi from '../../../utils/rest/classes.js';

export function useSubjectCreateHook({ updatePage = false }) {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [subject, setSubject] = useState('');
  const [className, setClassName] = useState('');
  const [optionsClassCode, setoptionsClassCode] = useState('');

  useEffect(() => {
    async function fetchData() {
      showLoading();
      const { data } = await useMasterController.allClassCode();
      setoptionsClassCode(
        data.map((s) => {
          return { label: s.name, value: s.code };
        })
      );

      if (updatePage) {
        const { data: detailExam } = await useClassesApi.detailClasses({
          id: id,
        });
        setClassCode(detailExam.class_code.label);
        setClassName(detailExam.class_name);
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    const body = {
      class_name: className,
      class_code: classCode,
    };

    showLoading();
    useClassesApi
      .modifyClasses({ body: body, id: id, isCreate: !updatePage })
      .then((r) => {
        const { message, status } = r;
        setTimeout(() => {
          hideLoading();
          showModal(message, status);
          resetForm();
        }, 1500);
      })
      .catch((e) => {
        console.log(e.data);
        hideLoading();
        showModal('Failed create exam. Please try again!', 'error');
      });
  };

  const resetForm = () => {
    setClassCode('');
    setClassName('');
  };

  return {
    classCode,
    setClassCode,
    className,
    setClassName,
    optionsClassCode,
    handleSubmitCreate,
    resetForm,
  };
}
