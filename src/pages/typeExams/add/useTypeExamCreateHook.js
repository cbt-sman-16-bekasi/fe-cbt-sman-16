import { useEffect, useState } from 'react';
import useMasterController from '../../../utils/rest/master.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useNavigate, useParams } from 'react-router';
import useClassesApi from '../../../utils/rest/classes.js';
import useExamTypeApi from '../../../utils/rest/examtype.js';
import { cbtColor } from '../../../../shared-theme/themePrimitives.jsx';

export function useTypeExamCreateHook({ updatePage = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [examCode, setExamCode] = useState('');
  const [examTypeCode, setExamTypeCode] = useState('');
  const [access, setAccess] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [optionsUserRoles, setoptionsUserRoles] = useState('');
  const optionsColor = Object.values(cbtColor.accents).slice(0, -2);

  useEffect(() => {
    async function fetchData() {
      showLoading();
      const { data: userRoles } = await useMasterController.allUserRole();
      setoptionsUserRoles(
        userRoles
          .filter((u) => u.code !== 'STUDENT')
          .map((s) => {
            return { label: s.name, value: s.code };
          })
      );

      if (updatePage) {
        const { data: detailExam } = await useExamTypeApi.detailExamType({
          id: id,
        });
        setExamTypeCode(detailExam.code);
        setExamCode(detailExam.name);
        setAccess(detailExam.detail_role.code);
        setSelectedColor(detailExam.color);
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    const body = {
      code_type_exam: examTypeCode,
      color: selectedColor,
      role: access,
      type_exam: examCode,
    };

    showLoading();
    useExamTypeApi
      .modifyExamType({ body: body, id: id, isCreate: !updatePage })
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
          } 'Kode Jenis Ujian'. Please try again!`,
          'error'
        );
      });
  };

  const resetForm = () => {
    setExamCode('');
    setExamTypeCode('');
    setAccess('');
    setSelectedColor('');
  };

  return {
    examCode,
    setExamCode,
    examTypeCode,
    setExamTypeCode,
    access,
    setAccess,
    selectedColor,
    setSelectedColor,
    optionsColor,
    optionsUserRoles,
    handleSubmitCreate,
    resetForm,
  };
}
