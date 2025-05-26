import { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";
import { IconButton } from "@mui/material";

export function useSubjectHook() {
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [isRefreshList, setRefreshList] = useState(false);
  const [searchBy, setSearchBy] = useState('');

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "code", headerName: "KODE", flex: 1.5, minWidth: 150 },
    { field: "subject", headerName: "NAMA MATA PELAJARAN", flex: 1, minWidth: 120 },
    { field: "class_code", headerName: "TINGKAT KELAS", flex: 1.5, minWidth: 150 },
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
            onClick={() => handleDelete(row)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`/${userRole}/mata-pelajaran/${id}/update`)
  };

  const messageDelete = (data) => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'center' }}>
          Apakah kamu yakin ingin melanjutkan proses hapus <br /><strong>{data}</strong> ?
        </p>
      </div>
    )
  }

  const handleDelete = ({ ID, subject }) => {
    showConfirm(messageDelete(subject), async () => {
      showLoading()
      await useApi.delete({ url: `/academic/curriculum/subject/delete/${ID}` })
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