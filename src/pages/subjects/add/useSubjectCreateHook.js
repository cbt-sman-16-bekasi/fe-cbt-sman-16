import { useEffect, useState } from 'react';
import useMasterController from '../../../utils/rest/master.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useParams } from 'react-router';
import useClassesApi from '../../../utils/rest/classes.js';
import useSubjectApi from '../../../utils/rest/subject.js';

export function useSubjectCreateHook({ updatePage = false }) {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [subject, setSubject] = useState('');
  const [classCode, setClassCode] = useState('');
  const [optionsSubjects, setoptionsSubjects] = useState('');
  const [optionsClassCode, setoptionsClassCode] = useState('');

  useEffect(() => {
    async function fetchData() {
      showLoading();
      const { data: classCodes } = await useMasterController.allClassCode();
      const { data: subjectNames } = await useMasterController.allSubject();

      setoptionsClassCode(
        classCodes.map((s) => {
          return { label: s.name, value: s.code };
        })
      );

      setoptionsSubjects(
        subjectNames.map((s) => {
          return { label: s.subject, value: s.code };
        })
      );

      if (updatePage) {
        const { data: detailSubject } = await useSubjectApi.detailSubject({
          id: id,
        });
        setClassCode(detailSubject.class_code.label);
        setSubject(detailSubject.subject.key);
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    const body = {
      class_code: classCode,
      subject_code: subject,
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
    setClassCode('');
  };

  return {
    classCode,
    setClassCode,
    subject,
    setSubject,
    optionsSubjects,
    optionsClassCode,
    handleSubmitCreate,
    resetForm,
  };
}
