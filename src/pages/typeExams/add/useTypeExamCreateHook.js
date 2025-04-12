import { useEffect, useState } from 'react';
import useMasterController from '../../../utils/rest/master.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useParams } from 'react-router';
import useClassesApi from '../../../utils/rest/classes.js';
import useExamTypeApi from '../../../utils/rest/examtype.js';
import { cbtColor } from '../../../../shared-theme/themePrimitives.jsx';

export function useTypeExamCreateHook({ updatePage = false }) {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [examName, setExamName] = useState('');
  const [classCode, setClassCode] = useState('');
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
        setClassCode(detailExam.code);
        setExamName(detailExam.name);
        setAccess(detailExam.detail_role.code);
        setSelectedColor(detailExam.color);
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    const body = {
      code_type_exam: 'string',
      color: 'string',
      role: 'string',
      type_exam: 'string',
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
    setExamName('');
    setClassCode('');
    setAccess('');
    setSelectedColor('');
  };

  return {
    examName,
    setExamName,
    classCode,
    setClassCode,
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
