import { useEffect, useState } from 'react';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useNavigate, useParams } from 'react-router';
import useCurriculumSubjectApi from '../../../utils/rest/csubject.js';

export function useSubjectCreateHook({ updatePage = false }) {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [subject, setSubject] = useState('');
  const [code, setCode] = useState('');
  const [classCode, setClassCode] = useState([]);
  const [optionsClassCode, setOptionsClassCode] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      showLoading();

      const { data: classLevel } = await useCurriculumSubjectApi.getAllClassLevels()
      if (classLevel) {
        setOptionsClassCode(classLevel?.map(c => { return {label: c.name, value: c.code} }));
      }

      if (updatePage) {
        const { data: detailSubject } = await useCurriculumSubjectApi.detail({
          id: id,
        });
        if (detailSubject !== undefined) {
          setCode(detailSubject.code);
          setClassCode(detailSubject?.class_code ? detailSubject?.class_code?.split(',') : []);
          setSubject(detailSubject.subject);
        }
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    if (!classCode || !subject) {
      showModal('Semua Data Harus Diisi', 'warning');
      return;
    }

    const body = {
      code: code,
      name: subject,
      class_code: classCode,
    };

    showLoading();
    useCurriculumSubjectApi
      .modifySubject({ body: body, id: id, isCreate: !updatePage })
      .then((r) => {
        const { message, status } = r;
        setTimeout(() => {
          hideLoading();
          showModal(message, status);
          if (status === 'success') {
            resetForm();
            navigate(-1);
          }
        }, 1500);
      })
      .catch((e) => {
        hideLoading();
        showModal(
          `Failed ${
            !updatePage ? 'create' : 'update'
          } 'Mata Pelajaran'. Please try again!`,
          'error'
        );
      });
  };

  const resetForm = () => {
    setSubject('');
    setClassCode([]);
    setCode('');
  };

  return {
    code, setCode,
    optionsClassCode,
    classCode,
    setClassCode,
    subject,
    setSubject,
    handleSubmitCreate,
    resetForm,
  };
}
