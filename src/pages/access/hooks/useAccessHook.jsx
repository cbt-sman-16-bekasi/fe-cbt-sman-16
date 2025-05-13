import { useState } from "react";
import { useSelector } from "react-redux";
import {Chip, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";
import useDate from "../../../hooks/useDate.js";
import {LockOutlined, PasswordOutlined} from "@mui/icons-material";

export function useAccessHook() {
  const navigate = useNavigate();
  const { showConfirm, showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [isRefreshList, setRefreshList] = useState(false)
  const {formattedWithTime} = useDate()

  const statusChip = ( {isActive} ) => {
    return (
      <Chip
        label={isActive ? "Aktif" : "Tidak Aktif"}
        color={isActive ? "success" : "default"}
        variant={isActive ? "filled" : "outlined"}
      />
    );
  }

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "username", headerName: "USERNAME", flex: 1, minWidth: 120 },
    { field: "name", headerName: "NAMA USER", flex: 1.5, minWidth: 150, renderCell: (row) => !row?.name ? '-' : row?.name?.toUpperCase() },
    { field: "role_name", headerName: "ROLE", flex: 1, minWidth: 150, renderCell: (row) => row?.role_name ? row.role_name : '-' },
    { field: "status", headerName: "STATUS ACCOUNT", flex: 1, minWidth: 150, renderCell: (row) => statusChip({isActive: row?.status || 0}) },
    { field: "last_update", headerName: "LAST UPDATE", flex: 1, minWidth: 150, renderCell: (row) => formattedWithTime(row?.last_update) },
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
            onClick={() => handleEdit(row.id)}
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
            onClick={() => handleResetPassword(row.id)}
          >
            <LockOutlined />
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
          Apakah kamu yakin ingin melanjutkan proses <br/><strong>RESET PASSWORD</strong> pada akun ini?
        </p>
      </div>
    )
  }

  const handleResetPassword = (id) => {
    showConfirm(messageDelete(), async () => {
      showLoading()
      const {status, message} = await useApi.createOrModify({
        url: `/academic/user/${id}/reset-password`,
        method: 'POST'
      })
      setRefreshList(!isRefreshList)
      hideLoading()
      showModal(message, status)
    }, 'Ya, Reset Password');
  };

  const searchOptions = [
    {
      label: 'Nama User',
      value: 'name'
    },
    {
      label: 'Username',
      value: 'username'
    }
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