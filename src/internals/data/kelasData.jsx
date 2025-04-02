import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const columns = ({ handleDelete, navigate, role }) => [
  { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
  { field: "kodeKelas", headerName: "KODE KELAS", flex: 1, minWidth: 120 },
  { field: "namaKelas", headerName: "NAMA KELAS", flex: 1.5, minWidth: 150 },
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
          onClick={() => navigate(`/${role}/kelas/edit/${params.row.id}`)}
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

export const formatRows = (classes = []) =>
  Array.isArray(classes)
    ? classes.map((kelas, index) => ({
      id: kelas.ID,
      no: index + 1,
      kodeKelas: kelas.classCode,
      namaKelas: kelas.className,
    }))
    : [];

