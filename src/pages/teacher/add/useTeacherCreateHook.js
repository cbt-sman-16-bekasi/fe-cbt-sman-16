import { useEffect, useState } from 'react';
import useMasterController from '../../../utils/rest/master.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useNavigate, useParams } from 'react-router';
import useTeacherApi from '../../../utils/rest/teacher.js';
import useClassesApi from '../../../utils/rest/classes.js';
import useApi from '../../../utils/rest/api.js';

export function useTeacherCreateHook({ updatePage = false }) {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [nuptk, setNuptk] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Laki-laki');
  const [access, setAccess] = useState(false);
  const [subject, setSubject] = useState('');
  const [classData, setClassData] = useState([]);
  const [optionsSubject, setOptionsSubject] = useState([]);
  const [optionClass, setOptionClass] = useState([]);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [isRefreshList, setIsRefreshList] = useState(false);
  const { showConfirm } = useModal();
  const optionsGender = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' },
  ];
  const optionsEnableAccess = [
    { label: 'Ya', value: true },
    { label: 'Tidak', value: false },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      showLoading();
      if (updatePage) {
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

        try {
          const { data: classes } = await useClassesApi.allClasses({
            size: 1000,
            page: 0,
          });
          setOptionClass(
            classes?.records?.map((s) => ({
              label: s.className,
              value: s.ID,
            }))
          );
        } catch (error) {
          console.error('Failed to fetch subjects:', error);
        }

        const { data: detailTeacher } = await useTeacherApi.detailTeacher({
          id: id,
        });
        setNuptk(detailTeacher.nuptk);
        setName(detailTeacher.name);
        setGender(detailTeacher.gender);
        setAccess(detailTeacher.isAccess);
      }
      hideLoading();
    }
    fetchData();
  }, [id]);

  const handleSubmitCreate = () => {
    if (!nuptk || !name || !gender || !access) {
      showModal('Semua Data Harus Diisi', 'warning');
      return;
    }

    const body = {
      nuptk: nuptk,
      name: name,
      gender: gender,
      isAccess: access,
    };

    showLoading();
    useTeacherApi
      .modifyTeacher({ body: body, id: id, isCreate: !updatePage })
      .then((r) => {
        const { message, status } = r;
        setTimeout(() => {
          hideLoading();
          showModal(message, status);
          if (status === 'success' && !updatePage) {
            resetForm();
            navigate(-1);
          }
        }, 1500);
      })
      .catch((e) => {
        console.log(e.data);
        hideLoading();
        showModal('Failed save changes teacher. Please try again!', 'error');
      });
  };

  const resetForm = () => {
    setNuptk('');
    setName('');
    setGender('');
    setAccess(false);
  };

  const columns = [
    { field: 'no', headerName: 'NO', flex: 0.1, minWidth: 50 },
    {
      field: 'subject',
      headerName: 'MATA PELAJARAN',
      flex: 1,
      minWidth: 120,
      renderCell: (row) => row.subject.subject ?? '-',
    },
    {
      field: 'class',
      headerName: 'KELAS',
      flex: 1.5,
      minWidth: 150,
      renderCell: (row) => row.class.className ?? '-',
    },
  ];

  const handleSubmitTeacherClassSubject = () => {
    if (!id || !classData || !subject) {
      showModal('Semua Data Harus Diisi', 'warning');
      return;
    }

    const body = {
      teacherId: parseInt(id),
      classId: classData,
      subjectId: subject,
    };

    showLoading();
    useTeacherApi
      .modifyClassSubject({ body: body, id: id, isCreate: true })
      .then((r) => {
        const { message, status } = r;
        setTimeout(() => {
          hideLoading();
          showModal(message, status);
          if (status === 'success') {
            setShowAddSubject(false);
            setIsRefreshList(true);
          }
        }, 1500);
      })
      .catch((e) => {
        hideLoading();
        showModal(
          'Failed save changes Class Subject teacher. Please try again!',
          'error'
        );
      });
  };

  const handleDelete = (id) => {
    showConfirm('Apakah anda yakin menghapus data ini ?', async () => {
      showLoading();
      await useApi.delete({
        url: `/academic/teacher/class-subject/delete/${id}`,
      });
      setIsRefreshList(!isRefreshList);
      hideLoading();
    });
  };

  return {
    name,
    setName,
    nuptk,
    setNuptk,
    gender,
    setGender,
    access,
    setAccess,
    optionsGender,
    optionsEnableAccess,
    handleSubmitCreate,
    resetForm,
    classData,
    optionClass,
    optionsSubject,
    setSubject,
    setClassData,
    subject,
    columns,
    showAddSubject,
    setShowAddSubject,
    isRefreshList,
    handleSubmitTeacherClassSubject,
    id,
    handleDelete,
  };
}
