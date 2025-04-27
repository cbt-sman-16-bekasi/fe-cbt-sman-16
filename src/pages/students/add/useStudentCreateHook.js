import { useEffect, useState } from 'react';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useLocation, useParams } from 'react-router';
import useStudentApi from '../../../utils/rest/student.js';
import useMasterController from '../../../utils/rest/master.js';

export function useStudentCreateHook({ updatePage = false }) {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classIdParam = searchParams.get('class');
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [nisn, setNisn] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [classCode, setClassCode] = useState(classIdParam || '');

  const [optionsClass, setOptionClass] = useState([]);
  const optionsGender = [
    { label: 'Laki-laki', value: 'laki-laki' },
    { label: 'Perempuan', value: 'perempuan' },
  ];

  useEffect(() => {
    async function fetchData() {
      showLoading();

      if (updatePage) {
        const { data: detailStudent } = await useStudentApi.detailStudent({
          id: id,
        });
        setNisn(detailStudent.nisn);
        setName(detailStudent.name);
        setGender(detailStudent.gender);
        setClassCode(detailStudent.class.key);
      }
      hideLoading();
    }
    fetchData();
  }, []);

  useEffect(() => {
    setOptionClass([]);
    const allClass = useMasterController.allClassSubject({
      size: 100,
    });
    allClass.then((c) => {
      const { data } = c;
      const { records } = data;
      const members = [];
      records.forEach((r) => {
        members.push(...r.DetailClassCode.class_member);
      });
      const uniqueData = members.filter(
        (item, index, self) => index === self.findIndex((t) => t.ID === item.ID)
      );
      setOptionClass(
        uniqueData.map((r) => {
          return { label: `${r.className}`, value: r.ID };
        })
      );
    });
  }, []);

  const handleSubmitCreate = () => {
    const body = {
      class_id: classCode,
      gender: gender,
      name: name,
      nisn: nisn,
    };

    showLoading();
    useStudentApi
      .modifyStudent({ body: body, id: id, isCreate: !updatePage })
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
    setNisn('');
    setName('');
    setGender([]);
    setClassCode('');
    setOptionClass([]);
  };

  return {
    nisn,
    setNisn,
    name,
    setName,
    gender,
    setGender,
    classCode,
    setClassCode,
    optionsClass,
    setOptionClass,
    optionsGender,
    handleSubmitCreate,
    resetForm,
    classIdParam,
  };
}
