import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const columns = [
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
          onClick={() => handleEdit(params.row.id)}
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

// Fungsi event handler (bisa dipindah ke Redux action nantinya)
const handleEdit = (id) => {
  console.log("Edit kelas dengan ID:", id);
};

const handleDelete = (id) => {
  console.log("Delete kelas dengan ID:", id);
};

// Fungsi untuk mengonversi data Redux menjadi rows
export const formatRows = (students = []) =>
  Array.isArray(students)
    ? students.map((kelas, index) => ({
      id: index + 1,
      no: index + 1,
      nisn: kelas.classCode,
      namaSiswa: kelas.className,
      jenisKelamin: kelas.className,
      kelas: kelas.className,
    }))
    : [];