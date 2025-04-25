import { useEffect, useState } from 'react';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import {useNavigate, useParams} from 'react-router';
import useCurriculumSubjectApi from "../../../utils/rest/csubject.js";

export function useSubjectCreateHook({ updatePage = false }) {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [subject, setSubject] = useState('');
  const [classCode, setClassCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      showLoading();

      if (updatePage) {
        const { data: detailSubject } = await useCurriculumSubjectApi.detail({
          id: id,
        });
        if (detailSubject !== undefined) {
          setClassCode(detailSubject.code);
          setSubject(detailSubject.subject);
        }
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    const body = {
      code: classCode,
      name: subject,
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
            navigate(-1)
          }
        }, 1500);
      })
      .catch((e) => {
        hideLoading();
        showModal(`Failed ${!updatePage ? 'create' : 'update'} 'Mata Pelajaran'. Please try again!`, 'error');
      });
  };

  const resetForm = () => {
    setSubject('');
    setClassCode('');
  };

  return {
    classCode,
    setClassCode,
    subject,
    setSubject,
    handleSubmitCreate,
    resetForm,
  };
}
