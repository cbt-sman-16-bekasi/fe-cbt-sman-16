import { Chip } from "@mui/material";

function getChipColor(status) {
  const colors = {
    "Super Admin": "primary",
    "Guru": "success",
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
  { field: "jenisUjian", headerName: "NAMA MATA PELAJARAN", flex: 1, minWidth: 120 },
  {
    field: "kodeUjian",
    headerName: "KODE UJIAN",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => getChipColor(params.value),
  },
  {
    field: "hakAkses",
    headerName: "HAK AKSES",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => getChipColor(params.value),
  },
];

export const rows = [
  {
    id: 1,
    no: 1,
    jenisUjian: "00002335459",
    kodeUjian: 'UH',
    hakAkses: "Super Admin",
  },
  {
    id: 2,
    no: 2,
    jenisUjian: "00012345678",
    kodeUjian: 'UAS',
    hakAkses: "Super Admin",
  },
  {
    id: 3,
    no: 3,
    jenisUjian: "00087654321",
    kodeUjian: 'UTS',
    hakAkses: "Super Admin",
  },
  {
    id: 4,
    no: 4,
    jenisUjian: "00087654321",
    kodeUjian: 'TO',
    hakAkses: "Guru",
  },
];
