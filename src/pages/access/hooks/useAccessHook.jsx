import { useState } from "react";
import { useSelector } from "react-redux";
import { Chip, IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";

export function useAccessHook() {
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [isRefreshList, setRefreshList] = useState(false)

  function getHakAksesColor(status) {
    const colors = {
      "Admin": "primary",
      "Guru": "success",
    };

    return (
      <Chip
        variant='outlined'
        label={status}
        color={colors[status] || "default"}
        size="small"
      />
    );
  }

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "nuptk", headerName: "NUPTK", flex: 1, minWidth: 120 },
    { field: "name", headerName: "NAMA GURU", flex: 1.5, minWidth: 150 },
    { field: "username", headerName: "USERNAME", flex: 1, minWidth: 120, renderCell: (row) => row.detail_user?.username || '-' },
    { field: "password", headerName: "PASSWORD", flex: 1, minWidth: 120, renderCell: () => '*****' },
    {
      field: "hakAkses",
      headerName: "HAK AKSES",
      flex: 0.5,
      minWidth: 120,
      renderCell: (row) => getHakAksesColor(row.detail_user?.role.name),
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
    navigate(`/${userRole}/akses-system/${id}/update`)
  };

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'center' }}>
          Apakah kamu yakin ingin melanjutkan proses hapus <strong>Data Akses</strong> ini?
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

  return {
    search,
    setSearch,
    userRole,
    isRefreshList,
    columns
  }

}