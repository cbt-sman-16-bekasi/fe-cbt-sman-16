import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
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
  const [isRefreshList, setRefreshList] = useState(false)

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "namaMapel", headerName: "NAMA MATA PELAJARAN", flex: 1, minWidth: 120, renderCell: (row) => row.DetailSubject.subject },
    { field: "kodeKelas", headerName: "KODE KELAS", flex: 1.5, minWidth: 150, renderCell: (row) => row.DetailClassCode.code },
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
    navigate(`/${userRole}/mata-pelajaran/${id}/update`)
  };

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'left' }}>
          Ujian ini memiliki keterkaitan dengan <strong>beberapa data penting</strong>, seperti:
        </p>
        <ul style={{ paddingLeft: 18, marginTop: 4, textAlign: 'left' }}>
          <li>📌 Daftar <strong>Session Ujian</strong></li>
          <li>📌 Data <strong>Laporan Sesi</strong></li>
          <li>📌 Relasi dengan peserta ujian</li>
        </ul>
        <p style={{ marginTop: 12, color: '#b91c1c', textAlign: 'left' }}>
          Menghapus ujian ini akan <strong>menghilangkan semua data yang terkait</strong> secara permanen dan tidak dapat dikembalikan.
        </p>
        <p style={{ marginTop: 8, textAlign: 'left' }}>
          Apakah kamu yakin ingin melanjutkan proses <strong>hapus ujian</strong> ini?
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

  return {
    search,
    setSearch,
    userRole,
    isRefreshList,
    columns
  }

}