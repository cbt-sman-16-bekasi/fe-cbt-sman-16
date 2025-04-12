import { useEffect, useState } from 'react';
import useMasterController from '../../../utils/rest/master.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useParams } from 'react-router';
import useTeacherApi from '../../../utils/rest/teacher.js';

export function useTeacherCreateHook({ updatePage = false }) {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [nuptk, setNuptk] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [subject, setSubject] = useState('');
  const [access, setAccess] = useState('');
  const [optionsAccess, setoptionsAccess] = useState('');
  const optionsGender = [
    { label: 'Laki-laki', value: 'laki-laki' },
    { label: 'Perempuan', value: 'perempuan' },
  ];

  useEffect(() => {
    async function fetchData() {
      showLoading();
      const { data } = await useMasterController.allUserRole();
      setoptionsAccess(
        data
          ?.filter((data) => data.code !== 'STUDENT')
          .map((s) => {
            return { label: s.name, value: s.code };
          })
      );

      if (updatePage) {
        const { data: detailExam } = await useTeacherApi.detailTeacher({
          id: id,
        });
        setNuptk(detailExam.nuptk);
        setName(detailExam.name);
        setGender(detailExam.gender || 'laki-laki');
        setSubject(detailExam.subject || '-');
        setAccess(detailExam.role.key);
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    const body = {
      nuptk: nuptk,
      name: name,
      gender: gender,
      subject: subject,
      role: access,
    };

    showLoading();
    useTeacherApi
      .modifyAccess({ body: body, id: id, isCreate: !updatePage })
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
    setNuptk('');
    setName('');
    setGender('');
    setSubject('');
    setAccess('');
  };

  return {
    name,
    setName,
    nuptk,
    setNuptk,
    gender,
    setGender,
    subject,
    setSubject,
    access,
    setAccess,
    optionsAccess,
    optionsGender,
    handleSubmitCreate,
    resetForm,
  };
}
