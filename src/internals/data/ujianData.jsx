import { Chip, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function getChipColor(row) {
  return (
    <Chip
      variant='outlined'
      label={row.type_exam.code}
      color={row.type_exam.color || "default"}
      sx={{ px: 2, py: 1.6, width: '8rem' }}
    />
  );
}

export const columns = [
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
  { field: "durasi", headerName: "DURASI (Menit)", flex: 1, minWidth: 120 },
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
    renderCell: (params) => {
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
            onClick={() => handleSettings(params.row.id)}
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
            onClick={() => handleEdit(params.row.id)}
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
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );
    },
  },
];

const handleEdit = (id) => {
  console.log("Edit kelas dengan ID:", id);
};

const handleDelete = (id) => {
  console.log("Delete kelas dengan ID:", id);
};

const handleSettings = (id) => {
  console.log("Delete kelas dengan ID:", id);
};

export const formatRows = (exams = []) =>
  Array.isArray(exams)
    ? exams.map((exam, index) => ({
      id: exam.id,
      no: index + 1,
      namaUjian: exam.name,
      mataPelajaran: exam.subject.subject,
      kelas: exam.member ?? '-',
      durasi: exam.code,
      jenisUjian: exam.type_exam.code,
      jumlahSoal: exam.total_question,
      color: exam.type_exam.color
    }))
    : [];

