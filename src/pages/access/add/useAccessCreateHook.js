import { useEffect, useState } from 'react';
import useMasterController from '../../../utils/rest/master.js';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useNavigate, useParams } from 'react-router';
import useAccessApi from '../../../utils/rest/access.js';

export function useAccessCreateHook({ updatePage = false }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState(1)

  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const statusOption = [
    {
      label: 'Aktif',
      value: 1
    },
    {
      label: 'Tidak Aktif',
      value: 0
    }
  ]

  useEffect(() => {
    async function fetchData() {
      if (updatePage) {
        showLoading();
        const { data: detailUser } = await useAccessApi.detailAccess({
          id: id,
        });
        setName(detailUser.name);
        setUsername(detailUser.username);
        setStatus(detailUser.status)
        hideLoading();
      }
    }
    fetchData();
  }, []);

  const handleSubmitCreate = () => {
    if (!name || !username) {
      showModal('Semua Data Harus Diisi', 'warning');
      return;
    }

    let body = {
      name: name,
      username: username,
      status: status
    };

    if (!updatePage) {
      body['role'] = 2
    }

    showLoading();
    useAccessApi
      .modifyAccess({ body: body, id: id, isCreate: !updatePage })
      .then((r) => {
        const { message, status } = r;
        hideLoading();
        showModal(message, status);
        if (status === 'success') {
          resetForm();
          navigate(-1);
        }
      })
      .catch((e) => {
        console.log(e.data);
        hideLoading();
        showModal(
          `Failed ${
            !updatePage ? 'create' : 'update'
          } 'Akses'. Please try again!`,
          'error'
        );
      });
  };

  const resetForm = () => {
    setName('');
    setUsername('');
  };

  return {
    name,
    setName,
    username,
    setUsername,
    handleSubmitCreate,
    resetForm,
    status, setStatus,
    statusOption
  };
}
