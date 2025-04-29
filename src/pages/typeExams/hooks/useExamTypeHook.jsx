import { alpha } from '@mui/material/styles';
import { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";
import { Chip, IconButton } from "@mui/material";

export function useExamTypeHook() {
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [isRefreshList, setRefreshList] = useState(false)

  function getChipColor(code, name) {
    const colors = {
      "ADMIN": "primary",
      "TEACHER": "success",
    };

    return (
      <Chip
        variant='outlined'
        label={name}
        color={colors[code] || "default"}
        sx={{ px: 2, py: 1.6, width: '8rem' }}
      />
    );
  }

  function getExamCodeColor({ label, color }) {
    return (
      <Chip
        variant="outlined"
        label={label}
        sx={{
          px: 2,
          py: 1.6,
          width: '8rem',
          borderColor: (color !== '' ? color : '#9e9e9e'),
          backgroundColor: (color !== '' ? alpha(color, 0.2) : alpha('#9e9e9e', 0.2)),
          color: color,
        }}
      />

    );
  }

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "name", headerName: "JENIS UJIAN", flex: 1, minWidth: 120 },
    {
      field: "code",
      headerName: "KODE UJIAN",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => getExamCodeColor({ label: params.code, color: params.color }),
    },
    {
      field: "role",
      headerName: "AKSES",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => getChipColor(params.detail_role.code, params.detail_role.name),
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
    navigate(`/${userRole}/kode-jenis-ujian/${id}/update`)
  };

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'center' }}>
          Apakah kamu yakin ingin melanjutkan proses hapus <strong>Data Kode Ujian</strong> ini?
        </p>
      </div>
    )
  }

  const handleDelete = (id) => {
    showConfirm(messageDelete(), async () => {
      showLoading()
      await useApi.delete({ url: `/academic/exam/type-exam/${id}` })
      setRefreshList(!isRefreshList)
      hideLoading()
    });
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const searchOptions = columns.slice(1, -1).map((col) => ({
    value: col.field,
    label: capitalize(col.headerName),
  }));

  return {
    search,
    setSearch,
    searchBy,
    setSearchBy,
    userRole,
    isRefreshList,
    columns,
    searchOptions,
  }

}