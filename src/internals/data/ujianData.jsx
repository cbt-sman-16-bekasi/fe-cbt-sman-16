import { Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

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
  { field: "namaMapel", headerName: "NAMA MATA PELAJARAN", flex: 1, minWidth: 150 },
  { field: "kelas", headerName: "KELAS", flex: 1, minWidth: 120 },
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
    namaUjian: "00002335459",
    namaMapel: "Khalih Warna, S.Pd",
    kelas: 'laki - laki',
    jenisUjian: 'UTS',
    jumlahSoal: '7'
  },
  {
    id: 2,
    no: 2,
    namaUjian: "00012345678",
    namaMapel: "Budi Santoso, M.Pd",
    kelas: 'laki - laki',
    jenisUjian: 'UH',
    jumlahSoal: '7'
  },
  {
    id: 3,
    no: 3,
    namaUjian: "00087654321",
    namaMapel: "Siti Aminah, S.Pd",
    kelas: 'laki - laki',
    jenisUjian: 'UAS',
    jumlahSoal: '7'
  },
  {
    id: 4,
    no: 4,
    namaUjian: "00087654321",
    namaMapel: "Siti Aminah, S.Pd",
    kelas: 'laki - laki',
    jenisUjian: 'TO',
    jumlahSoal: '7'
  },
];
