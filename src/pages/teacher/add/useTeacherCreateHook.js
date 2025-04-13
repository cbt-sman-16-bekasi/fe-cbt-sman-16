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
  const [subject, setSubject] = useState([]);
  const [access, setAccess] = useState('');
  const [isEnable, setIsEnable] = useState('');
  const [optionsSubject, setOptionsSubject] = useState([]);
  const [optionsAccess, setoptionsAccess] = useState('');
  const optionsGender = [
    { label: 'Laki-laki', value: 'laki-laki' },
    { label: 'Perempuan', value: 'perempuan' },
  ];
  const optionsEnableAccess = [
    { label: 'Ya', value: true },
    { label: 'Tidak', value: false },
  ];

  useEffect(() => {
    async function fetchData() {
      showLoading();

      try {
        const { data: subjects } = await useMasterController.allSubject();
        setOptionsSubject(
          subjects?.map((s) => ({
            label: s.subject,
            value: s.code,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      }

      const { data: roles } = await useMasterController.allUserRole();
      setoptionsAccess(
        roles
          ?.filter((role) => role.code !== 'STUDENT')
          .map((r) => {
            return {
              label: r.name,
              value: r.code,
            };
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
  }, [id]);

  const handleSubmitCreate = () => {
    const body = {
      nuptk: nuptk,
      name: name,
      gender: gender,
      role: access,
      subject: subject,
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
    setAccess('');
    setSubject([]);
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
    isEnable,
    setIsEnable,
    optionsEnableAccess,
    optionsSubject,
    optionsAccess,
    optionsGender,
    handleSubmitCreate,
    resetForm,
  };
}
