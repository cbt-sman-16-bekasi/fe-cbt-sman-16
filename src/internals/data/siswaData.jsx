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
    nisn: "00002335459",
    namaSiswa: "Khalih Warna, S.Pd",
    jenisKelamin: 'laki - laki',
    kelas: "khaliwarna",
  },
  {
    id: 2,
    no: 2,
    nisn: "00012345678",
    namaSiswa: "Budi Santoso, M.Pd",
    jenisKelamin: 'laki - laki',
    kelas: "budisantoso",
  },
  {
    id: 3,
    no: 3,
    nisn: "00087654321",
    namaSiswa: "Siti Aminah, S.Pd",
    jenisKelamin: 'laki - laki',
    kelas: "sitiaminah",
  },
];
