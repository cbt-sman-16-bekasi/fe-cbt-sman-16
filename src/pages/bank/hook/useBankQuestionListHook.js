import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useModal } from '../../../components/common/ModalContext.jsx';
import { useLoading } from '../../../components/common/LoadingProvider.jsx';
import useApi from '../../../utils/rest/api.js';

export function useBankQuestionListHook() {
  const navigate = useNavigate();
  const { showConfirm } = useModal();

  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const { showLoading, hideLoading } = useLoading();
  const [isRefreshList, setRefreshList] = useState(false);

  const columns = [
    { field: 'no', headerName: 'NO', flex: 0.1, minWidth: 50 },
    { field: 'bank_name', headerName: 'NAMA BANK SOAL', flex: 0.1, minWidth: 50 },
    {
      field: 'subject',
      headerName: 'MATA PELAJARAN',
      flex: 0.1,
      minWidth: 50,
      renderCell: (row) => row.subject ?? '-',
    },
    { field: 'class_code', headerName: 'KODE KELAS', flex: 0.1, minWidth: 50 },
    { field: 'total', headerName: 'JUMLAH SOAL', flex: 0.1, minWidth: 50 },
    {
      field: 'type_question',
      headerName: 'JENIS SOAL',
      flex: 0.1,
      minWidth: 50,
      renderCell: (row) => row.type_question.replaceAll('_', ' '),
    },
    {
      field: 'name',
      headerName: 'DI BUAT OLEH',
      flex: 0.1,
      minWidth: 50,
      renderCell: (row) => row.name ?? '-',
    },
  ];

  const handleEdit = (id) => {
    navigate(`/${userRole}/bank-soal/${id}/update`);
  };

  const handleDelete = (messageDelete, id) => {
    showConfirm(messageDelete, async () => {
      showLoading();
      await useApi.delete({ url: `/academic/bank/delete/${id}` });
      setRefreshList(!isRefreshList);
      hideLoading();
    });
  };

  const handleSettings = (code) => {
    navigate(`/${userRole}/bank-soal/${code}/detail`);
  };

  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const searchOptions = columns.slice(1, -3).map((col) => ({
    value: col.field,
    label: capitalize(col.headerName),
  }));

  return {
    authUser,
    userRole,
    search,
    setSearch,
    searchBy,
    setSearchBy,
    navigate,
    columns,
    isRefreshList,
    handleEdit,
    handleDelete,
    handleSettings,
    searchOptions,
  };
}
