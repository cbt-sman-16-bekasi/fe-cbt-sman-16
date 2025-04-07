import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const columns = ({ handleDelete, navigate, role }) => [
  { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
  { field: "nisn", headerName: "NISN", flex: 0.5, minWidth: 120 },
  { field: "namaSiswa", headerName: "NAMA SISWA", flex: 1.5, minWidth: 150 },
  { field: "jenisKelamin", headerName: "JENIS KELAMIN", flex: 1, minWidth: 120 },
  { field: "kelas", headerName: "KELAS", flex: 1, minWidth: 120 },
  {
    field: "aksi",
    headerName: "AKSI",
    flex: 0.5,
    minWidth: 120,
    renderCell: (params) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <IconButton
          size="small"
          sx={{
            bgcolor: "purple",
            color: "white",
            "&:hover": { bgcolor: "darkpurple" },
          }}
          onClick={() => navigate(`/${role}/data-siswa/edit/${params.row.id}`)}
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
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];

export const formatRows = (students = []) =>
  Array.isArray(students)
    ? students.map((student, index) => ({
      id: student.ID,
      no: index + 1,
      nisn: student.detail_student.nisn,
      namaSiswa: student.detail_student.name,
      jenisKelamin: student.detail_student.gender,
      kelas: student.class_id,
    }))
    : [];
