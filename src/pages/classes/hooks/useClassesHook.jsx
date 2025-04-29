import { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";
import { IconButton } from "@mui/material";

export function useClassesHook() {
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [isRefreshList, setRefreshList] = useState(false)

  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [classId, setClassId] = useState(null);
  const [openModalMember, setOpenModalMember] = useState(false);

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "classCode", headerName: "KODE KELAS", flex: 1, minWidth: 120 },
    { field: "className", headerName: "NAMA KELAS", flex: 1.5, minWidth: 150 },
    { field: "total_student", headerName: "JUMLAH SISWA", flex: 1.5, minWidth: 150 },
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
              bgcolor: "green",
              color: "white",
              "&:hover": { bgcolor: "yellowgreen" },
            }}
            onClick={() => onOpenMemberModal(row.class_id)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: "purple",
              color: "white",
              "&:hover": { bgcolor: "purple" },
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
        </div >
      ),
    },
  ];

  const onOpenMemberModal = (id) => {
    setOpenModalMember(true)
    setClassId(id)
  };

  const handleEdit = (id) => {
    navigate(`/${userRole}/kelas/${id}/update`)
  };

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'left' }}>
          Apakah kamu yakin ingin melanjutkan proses hapus <strong>Data Kelas</strong> ini?
        </p>
      </div>
    )
  }

  const handleDelete = (id) => {
    showConfirm(messageDelete(), async () => {
      showLoading()
      await useApi.delete({ url: `/academic/class/delete/${id}` })
      setRefreshList(!isRefreshList)
      hideLoading()
    });
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const searchOptions = columns.slice(1, -2).map((col) => ({
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
    classId, setClassId,
    openModalMember, setOpenModalMember
  }

}