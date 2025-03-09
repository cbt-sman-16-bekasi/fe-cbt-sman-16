import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const columns = [
  { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
  { field: "namaMapel", headerName: "NAMA MATA PELAJARAN", flex: 1, minWidth: 150 },
  { field: "kodeKelas", headerName: "KODE KELAS", flex: 1, minWidth: 120 },
  { field: "jumlahSoal", headerName: "JUMLAH SOAL", flex: 1, minWidth: 120 },
  {
    field: "aksi",
    headerName: "AKSI",
    flex: 1,
    minWidth: 120,
    renderCell: () => (
      <div style={{ display: "flex", gap: "8px", alignItems: "center", height: '100%' }}>
        <IconButton
          size="small"
          sx={{
            bgcolor: "yellow",
            color: "white",
            "&:hover": { bgcolor: "darkcyan" },
          }}
        >
          <SettingsOutlinedIcon />
        </IconButton>
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
    namaMapel: "Khalih Warna, S.Pd",
    kodeKelas: 'laki - laki',
    jumlahSoal: '7'
  },
  {
    id: 2,
    no: 2,
    namaMapel: "Budi Santoso, M.Pd",
    kodeKelas: 'laki - laki',
    jumlahSoal: '7'
  },
  {
    id: 3,
    no: 3,
    namaMapel: "Siti Aminah, S.Pd",
    kodeKelas: 'laki - laki',
    jumlahSoal: '7'
  },
  {
    id: 4,
    no: 4,
    namaMapel: "Siti Aminah, S.Pd",
    kodeKelas: 'laki - laki',
    jumlahSoal: '7'
  },
];
