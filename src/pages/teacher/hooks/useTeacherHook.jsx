import { useState } from "react";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export function useTeacherHook() {
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [isRefreshList, setRefreshList] = useState(false)
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "nuptk", headerName: "NUPTK", flex: 1, minWidth: 120 },
    { field: "name", headerName: "NAMA GURU", flex: 1.5, minWidth: 150 },
    { field: "gender", headerName: "JENIS KELAMIN", flex: 1, minWidth: 120, renderCell: (row) => row.gender || '-' },
    {
      field: "subject", headerName: "MATA PELAJARAN", flex: 1, minWidth: 120, renderCell: (row) => {
        if (row.teacherClassSubject !== null) {
          return row.teacherClassSubject.map(r => r.subject.subject).join(', ')
        }
        return '-'
      }
    },
    {
      field: "class", headerName: "KELAS", flex: 1, minWidth: 120, renderCell: (row) => {
        if (row.teacherClassSubject !== null) {
          return row.teacherClassSubject.map(r => r.class.className).join(', ')
        }
        return '-'
      }
    },
    {
      field: "akses",
      headerName: "AKSES",
      flex: 0.5,
      minWidth: 120,
      renderCell: () => <CheckRoundedIcon color="primary" />,
    },
    {
      field: "aksi",
      headerName: "AKSI",
      flex: 0.5,
      minWidth: 120,
      renderCell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton
            size="small"
            sx={{
              bgcolor: "purple",
              color: "white",
              "&:hover": { bgcolor: "darkpurple" },
            }}
            onClick={() => handleEdit(row.ID)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: "red",
              color: "white",
              "&:hover": { bgcolor: "darkred" },
            }}
            onClick={() => handleDelete(row.ID)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`/${userRole}/guru/${id}/update`)
  };

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'center' }}>
          Apakah kamu yakin ingin melanjutkan proses hapus <strong>Data Guru</strong> ini?
        </p>
      </div>
    )
  }

  const handleDelete = (id) => {
    showConfirm(messageDelete(), async () => {
      showLoading()
      await useApi.delete({ url: `/academic/teacher/delete/${id}` })
      setRefreshList(!isRefreshList)
      hideLoading()
    });
  };

  const searchOptions = [
    {label: 'NUPTK', value: 'nuptk'},
    {label: 'Nama Guru', value: 'name'},
  ]

  return {
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    isRefreshList,
    columns,
    searchOptions
  }

}