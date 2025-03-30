import { Chip, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from "react-router";

function getChipColor(status) {
  const colors = {
    "UH": "success",
    "UTS": "secondary",
    "UAS": "warning",
    "TO": "error",
  };

  return (
    <Chip
      variant='outlined'
      label={status}
      color={colors[status] || "default"}
      sx={{ px: 2, py: 1.6, width: '8rem' }}
    />
  );
}

export const columns = [
  { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
  { field: "namaUjian", headerName: "NAMA UJIAN", flex: 1, minWidth: 120 },
  { field: "mataPelajaran", headerName: "NAMA MATA PELAJARAN", flex: 1, minWidth: 150 },
  { field: "kelas", headerName: "KELAS", flex: 1, minWidth: 120 },
  { field: "durasi", headerName: "DURASI (Menit)", flex: 1, minWidth: 120 },
  {
    field: "jenisUjian",
    headerName: "JENIS UJIAN",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => getChipColor(params.value),
  },
  { field: "jumlahSoal", headerName: "JUMLAH SOAL", flex: 1, minWidth: 120 },
  {
    field: "aksi",
    headerName: "AKSI",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      const navigate = useNavigate();
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
            onClick={() => navigate(`/superadmin/ujian/settings/${params.row.id}`)}
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
            onClick={() => navigate(`/superadmin/ujian/edit/${params.row.id}`)}
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
            onClick={() => navigate(`/superadmin/ujian/delete/${params.row.id}`)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );
    },
  },
];

export const rows = [
  {
    id: 1,
    no: 1,
    namaUjian: "00002335459",
    mataPelajaran: "Khalih Warna, S.Pd",
    kelas: 'laki - laki',
    durasi: '90',
    jenisUjian: 'UTS',
    jumlahSoal: '7',
    totalNilai: '100'
  },
  {
    id: 2,
    no: 2,
    namaUjian: "00012345678",
    mataPelajaran: "Budi Santoso, M.Pd",
    kelas: 'laki - laki',
    durasi: '90',
    jenisUjian: 'UH',
    jumlahSoal: '7',
    totalNilai: '100'
  },
  {
    id: 3,
    no: 3,
    namaUjian: "00087654321",
    mataPelajaran: "Siti Aminah, S.Pd",
    kelas: 'laki - laki',
    durasi: '90',
    jenisUjian: 'UAS',
    jumlahSoal: '7',
    totalNilai: '100'
  },
  {
    id: 4,
    no: 4,
    namaUjian: "00087654321",
    mataPelajaran: "Siti Aminah, S.Pd",
    kelas: 'laki - laki',
    durasi: '90',
    jenisUjian: 'TO',
    jumlahSoal: '7',
    totalNilai: '100'
  },
];
