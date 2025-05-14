import { useSelector } from 'react-redux';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useModal } from '../../../common/ModalContext';
import { useLoading } from '../../../common/LoadingProvider';
import useApi from '../../../../utils/rest/api';

export function useModalMemberClassHook({ classId }) {
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const { showConfirm, showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [isRefreshList, setRefreshList] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const columns = [
    { field: 'no', headerName: 'NO', flex: 0.1, minWidth: 50 },
    {
      field: 'nisn',
      headerName: 'NISN',
      flex: 0.5,
      minWidth: 120,
      renderCell: (row) => row.nisn,
    },
    {
      field: 'name',
      headerName: 'NAMA SISWA',
      flex: 1.5,
      minWidth: 150,
      renderCell: (row) => row.name.toUpperCase(),
    },
    {
      field: 'gender',
      headerName: 'JENIS KELAMIN',
      flex: 1,
      minWidth: 120,
      renderCell: (row) => row.gender.toUpperCase(),
    },
    {
      field: 'class',
      headerName: 'KELAS',
      flex: 1,
      minWidth: 120,
      renderCell: (row) => row.class_name,
    },
    {
      field: 'aksi',
      headerName: 'AKSI',
      flex: 0.5,
      minWidth: 120,
      renderCell: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton
            size="small"
            sx={{
              bgcolor: 'red',
              color: 'white',
              '&:hover': { bgcolor: 'darkred' },
            }}
            onClick={() => handleDelete(row?.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'center' }}>
          Apakah kamu yakin ingin melanjutkan proses hapus{' '}
          <strong>Data Siswa</strong> ini?
        </p>
      </div>
    );
  };

  const handleDelete = (id) => {
    showConfirm(messageDelete(), async () => {
      showLoading();
      await useApi.delete({ url: `/academic/student/delete/${id}` });
      setRefreshList(!isRefreshList);
      hideLoading();
    });
  };

  const handleAddMember = async () => {
    if (!selectedStudents || selectedStudents.length === 0) {
      showModal("Tidak ada siswa yang dipilih", "error");
      return;
    }

    showLoading();
    try {
      // Pastikan semua ID bertipe integer
      const studentIds = selectedStudents.map(student => parseInt(student.value, 10));
      const classIdInt = parseInt(classId, 10);

      const response = await useApi.fetch('/academic/class/member/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          class_id: classIdInt,
          student_id: studentIds,
        }),
      });

      const { message, status } = response;
      showModal(message, status);
      setSelectedStudents([]);
      setRefreshList(!isRefreshList);
    } catch (err) {
      console.error(err);
      showModal(err.message, "error");
    } finally {
      hideLoading();
    }
  };

  const optionSearchStudent = [
    { label: 'Nama Siswa', value: 'name' },
    { label: 'NISN', value: 'nisn' },
  ];

  return {
    userRole,
    search,
    setSearch,
    isRefreshList,
    setRefreshList,
    searchBy,
    setSearchBy,
    columns,
    optionSearchStudent,
    handleAddMember,
    selectedStudents,
    setSelectedStudents,
  };
}
