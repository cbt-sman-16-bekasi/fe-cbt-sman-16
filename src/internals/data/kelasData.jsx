import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const columns = [
  { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
  { field: "kodeKelas", headerName: "KODE KELAS", flex: 1, minWidth: 120 },
  { field: "namaKelas", headerName: "NAMA KELAS", flex: 1.5, minWidth: 150 },
  { field: "jumlahSiswa", headerName: "JUMLAH SISWA", flex: 1, minWidth: 120 },
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
    kodeKelas: "00002335459",
    namaKelas: "Khalih Warna, S.Pd",
    jumlahSiswa: "khaliwarna",
  },
  {
    id: 2,
    no: 2,
    kodeKelas: "00012345678",
    namaKelas: "Budi Santoso, M.Pd",
    jumlahSiswa: "budisantoso",
  },
  {
    id: 3,
    no: 3,
    kodeKelas: "00087654321",
    namaKelas: "Siti Aminah, S.Pd",
    jumlahSiswa: "sitiaminah",
  },
];
