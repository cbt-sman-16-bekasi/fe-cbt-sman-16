import { IconButton, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const columns = [
  { field: "no", headerName: "NO", flex: 0.2, minWidth: 50 },
  {
    field: "detailUjian",
    headerName: "DETAIL UJIAN",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => (
      <Box>
        <Typography fontWeight="bold">{params.row.detailUjian}</Typography>
        <Typography fontSize={12} color="gray">Detail</Typography>
        <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "gray" }}>
          <li>Kelas: <strong>{params.row.kelas}</strong></li>
          <li>Pelajaran: <strong>{params.row.pelajaran}</strong></li>
        </ul>
      </Box>
    ),
  },
  { field: "namaSesiUjian", headerName: "NAMA SESI UJIAN", flex: 1, minWidth: 150 },
  { field: "jumlahSiswa", headerName: "JUMLAH SISWA", flex: 0.7, minWidth: 100 },
  { field: "mulai", headerName: "MULAI", flex: 1, minWidth: 150 },
  { field: "selesai", headerName: "SELESAI", flex: 1, minWidth: 150 },
  {
    field: "aksi",
    headerName: "AKSI",
    flex: 0.8,
    minWidth: 120,
    renderCell: () => (
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <IconButton
          size="small"
          sx={{
            bgcolor: "yellow",
            color: "white",
            "&:hover": { bgcolor: "gold" },
          }}
        >
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            bgcolor: "purple",
            color: "white",
            "&:hover": { bgcolor: "darkviolet" },
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
      </Box>
    ),
  },
];

export const rows = [
  {
    id: 1,
    no: 1,
    detailUjian: "UH Bahasa Inggris 20 Februari",
    kelas: "12 IPA 1",
    pelajaran: "Bahasa Inggris",
    namaSesiUjian: "UH BAB-1 INGGRIS",
    jumlahSiswa: 32,
    mulai: "2025-02-19 10:30:00",
    selesai: "2025-02-20 10:30:00",
  },
];
