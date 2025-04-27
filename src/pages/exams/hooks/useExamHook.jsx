import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Chip, IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";

export function UseExamHook() {
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [isRefreshList, setRefreshList] = useState(false)

  const getChipColor = (row) => {
    return (
      <Chip
        variant='outlined'
        label={row.type_exam.code}
        color={row.type_exam.color || "default"}
        sx={{ px: 2, py: 1.6, width: '8rem' }}
      />
    );
  }

  const columns = [
    { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
    { field: "name", headerName: "NAMA UJIAN", flex: 1, minWidth: 120 },
    {
      field: "subject",
      headerName: "NAMA MATA PELAJARAN",
      flex: 1,
      minWidth: 150,
      renderCell: (row) => row.subject?.subject || '-'
    },
    {
      field: "member",
      headerName: "KELAS",
      flex: 1,
      minWidth: 120
    },
    { field: "duration", headerName: "DURASI (Menit)", flex: 1, minWidth: 120, renderCell: (row) => row.duration || '0' },
    {
      field: "jenisUjian",
      headerName: "JENIS UJIAN",
      flex: 1,
      minWidth: 120,
      renderCell: (row) => getChipColor(row),
    },
    { field: "total_question", headerName: "JUMLAH SOAL", flex: 1, minWidth: 120 },
    {
      field: "aksi",
      headerName: "AKSI",
      flex: 1,
      minWidth: 150,
      renderCell: (row) => {
        const theme = useTheme();
        const isDarkMode = theme.palette.mode === "dark";

        return (
          <div style={{ display: "flex", gap: "8px", alignItems: "center", height: "100%" }}>
            {/* Tombol Settings */}
            <IconButton
              size="small"
              sx={{
                bgcolor: "yellow",
                color: isDarkMode ? "white" : "black",
                "&:hover": { bgcolor: "gold" },
              }}
              onClick={() => handleSettings(row.id, row.code)}
            >
              <SettingsOutlinedIcon />
            </IconButton>

            {/* Tombol Edit */}
            <IconButton
              size="small"
              sx={{
                bgcolor: "purple",
                color: "white",
                "&:hover": { bgcolor: "darkviolet" },
              }}
              onClick={() => handleEdit(row.id)}
            >
              <EditIcon />
            </IconButton>

            {/* Tombol Delete */}
            <IconButton
              size="small"
              sx={{
                bgcolor: "red",
                color: "white",
                "&:hover": { bgcolor: "darkred" },
              }}
              onClick={() => handleDelete(row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleEdit = (id) => {
    navigate(`/${userRole}/ujian/${id}/update`)
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
      await useApi.delete({ url: `/academic/exam/delete/${id}` })
      setRefreshList(!isRefreshList)
      hideLoading()
    });
  };

  const handleSettings = (id, code) => {
    navigate(`/${userRole}/ujian/${id}/detail?examCode=${code}`)
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const searchOptions = columns.slice(1, -5).map((col) => ({
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
    searchOptions
  }

}