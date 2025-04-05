import { Chip } from "@mui/material";

function getChipColor(status) {
  const colors = {
    "ADMIN": "primary",
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

export const formatRows = (typeExam = []) =>
  Array.isArray(typeExam)
    ? typeExam.map((type, index) => ({
      id: type.ID,
      no: index + 1,
      jenisUjian: type.name,
      kodeUjian: type.code,
      hakAkses: type.detail_role.code,
    }))
    : [];