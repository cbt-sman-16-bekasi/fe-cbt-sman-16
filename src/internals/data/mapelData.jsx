import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const columns = [
  { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
  { field: "namaMapel", headerName: "NAMA MATA PELAJARAN", flex: 1, minWidth: 120 },
  { field: "kodeKelas", headerName: "KODE KELAS", flex: 1.5, minWidth: 150 },
  {
    field: "aksi",
    headerName: "AKSI",
    flex: 0.2,
    minWidth: 120,
    renderCell: () => (
      <div style={{ display: "flex", gap: "8px" }}>
        <IconButton
          size="small"
          sx={{
            bgcolor: "purple",
            color: "white",
            "&:hover": { bgcolor: "darkpurple" },
          }}
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
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];

export const rows = [
  {
    id: 1,
    no: 1,
    namaMapel: "00002335459",
    kodeKelas: "Khalih Warna, S.Pd",
  },
  {
    id: 2,
    no: 2,
    namaMapel: "00012345678",
    kodeKelas: "Budi Santoso, M.Pd",
  },
  {
    id: 3,
    no: 3,
    namaMapel: "00087654321",
    kodeKelas: "Siti Aminah, S.Pd",
  },
];
