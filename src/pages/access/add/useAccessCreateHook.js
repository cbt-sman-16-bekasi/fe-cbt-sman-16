import { useEffect, useState } from 'react';
import useMasterController from '../../../utils/rest/master.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useParams } from 'react-router';
import useAccessApi from '../../../utils/rest/access.js';

export function useAccessCreateHook({ updatePage = false }) {
  const [nuptk, setNuptk] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [access, setAccess] = useState('');
  const [optionsAccess, setoptionsAccess] = useState('');

  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

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
        const { data: detailExam } = await useAccessApi.detailAccess({
          id: id,
        });
        setNuptk(detailExam.nuptk);
        setName(detailExam.name);
        setUsername(detailExam.username);
        setPassword('****');
        setAccess(detailExam.role.key);
      }
      hideLoading();
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    const body = {
      name: name,
      nuptk: nuptk,
      password: password,
      role: access,
      username: username,
    };

    showLoading();
    useAccessApi
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
    setUsername('');
    setPassword('');
    setAccess('');
  };

  return {
    name,
    setName,
    nuptk,
    setNuptk,
    username,
    setUsername,
    password,
    setPassword,
    access,
    setAccess,
    optionsAccess,
    handleSubmitCreate,
    resetForm,
  };
}
